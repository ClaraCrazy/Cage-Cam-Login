const fs = require("fs");
const bcrypt = require("bcryptjs");

const users = {
    user1: "password1",
};

const hashedUsers = Object.entries(users).map(([user, password]) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return `${user}:${hash}`;
});

fs.writeFileSync("./htpasswd", hashedUsers.join("\n"));
console.log("htpasswd file updated with hashed passwords.");