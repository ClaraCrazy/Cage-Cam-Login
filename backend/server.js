const http = require("http");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const httpProxy = require("http-proxy");
// load .env file
require("dotenv").config();

// Load environment variables
const htpasswdLocation = process.env.HTPASSWD_LOCATION || "./htpasswd";
const authTarget = process.env.AUTH_TARGET || "http://localhost:8083";

// Function to load users from htpasswd file
function loadHtpasswd(filepath) {
    const lines = fs.readFileSync(filepath, "utf-8").split("\n").filter(Boolean);
    const users = {};
    for (const line of lines) {
        const [user, hash] = line.split(":");
        users[user] = hash;
    }
    return users;
}

function verifyPassword(password, hash) {
    return bcrypt.compareSync(password, hash);
}

const users = loadHtpasswd(htpasswdLocation);
const proxy = httpProxy.createProxyServer({ target: authTarget });

const server = http.createServer((req, res) => {
    try {
        // Centralized CORS handling
        const origin = req.headers.origin || "*"; // Default to wildcard if origin is undefined
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        res.setHeader("Access-Control-Allow-Credentials", "true");

        if (req.method === "OPTIONS") {
            // Handle preflight requests
            res.writeHead(204);
            return res.end();
        }

        if (req.method === "POST" && req.url === "/auth") {
            let body = "";
            req.on("data", (chunk) => (body += chunk));
            req.on("end", () => {
                const { username, password } = JSON.parse(body);
                const hash = users[username];
                if (!hash) {
                    res.writeHead(401);
                    return res.end("User not found");
                }
                if (verifyPassword(password, hash)) {
                    const token = jwt.sign({ username }, "secret_key", { expiresIn: "1h" });
                    res.writeHead(200, {
                        "Content-Type": "application/json",
                        "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict, Secure`,
                    });
                    res.end(JSON.stringify({ message: "login success", token }));
                } else {
                    res.writeHead(401);
                    res.end("Invalid password");
                }
            });
        } else if (req.method === "GET" && req.url.startsWith("/access")) {
            // Validate the token from the cookie
            const cookie = req.headers.cookie;
            if (!cookie || !cookie.includes("token=")) {
                res.writeHead(302, { Location: "/" });
                return res.end();
            }

            const token = cookie.split("token=")[1].split(";")[0];
            try {
                const decoded = jwt.verify(token, "secret_key");
                console.log("Token validated for user:", decoded.username);

                // Proxy the request to the target
                proxy.web(req, res, (err) => {
                    console.error("Proxy error:", err);
                    res.writeHead(500);
                    res.end("Proxy error");
                });
            } catch (err) {
                res.writeHead(302, { Location: "/" });
                res.end();
            }
        }
    } catch (error) {
        console.error("Server error:", error);
        res.writeHead(500);
        res.end("Internal server error");
    }
});

// Handle WebSocket connections
server.on("upgrade", (req, socket, head) => {
    if (req.url.startsWith("/access")) {
        // Validate the token from the cookie
        const cookie = req.headers.cookie;
        if (!cookie || !cookie.includes("token=")) {
            socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
            socket.destroy();
            return;
        }

        const token = cookie.split("token=")[1].split(";")[0];
        try {
            const decoded = jwt.verify(token, "secret_key");
            console.log("WebSocket token validated for user:", decoded.username);

            // Proxy the WebSocket connection to the target
            proxy.ws(req, socket, head, (err) => {
                console.error("WebSocket proxy error:", err);
                socket.destroy();
            });
        } catch (err) {
            socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
            socket.destroy();
        }
    } else {
        socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
        socket.destroy();
    }
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
