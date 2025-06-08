function disableSubmit() {
    document.getElementById("submit").disabled = true;
}

function activateButton(element) {
    if (element.checked) {
        document.getElementById("submit").disabled = false;
    } else {
        document.getElementById("submit").disabled = true;
    }
}

// Get the input field
var input = document.getElementById("password");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("submit").click();
    }
});

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username && password) {
        // Add your login logic here
        console.log('Logging in with:', { username, password });
        fetch("auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
                credentials: "include",
            })
            .then((response) => {
                if (response.ok) {
                    // Redirect on successful login
                    window.location.href = "/stream";
                } else {
                    // Handle login failure
                    alert("Login failed: " + response.status);
                }
            })
            .catch((error) => {
                console.error("Error during login:", error);
                alert("An error occurred during login.");
            });
    } else {
        alert('Please fill out all fields.');
    }

}