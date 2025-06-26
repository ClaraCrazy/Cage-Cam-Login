// Disable the submit button initially
function disableSubmit() {
    document.getElementById("submit").disabled = true;
}

// Function to check if all conditions are met
function checkInputs() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const termsChecked = document.getElementById('terms').checked;
    const submitButton = document.getElementById('submit');

    // Enable the button only if both fields are filled and the checkbox is checked
    submitButton.disabled = !(username && password && termsChecked);
}

// Add event listener to toggle the checkbox when "Enter" is pressed
document.getElementById("terms").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        this.checked = !this.checked; // Toggle the checkbox state
        checkInputs(); // Update the submit button state
    }
});

document.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("submit").click();
    }
});

// Login function
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username && password) {
        console.log('Logging in:', { username, password });
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
                mode: "cors", // Enable CORS
            })
            .then((response) => {
                if (response.ok) {
                    window.location.href = "/access";
                } else {
                    response.text().then((text) => {
                        alert("Login failed: " + text);
                    });
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

// Add event listeners to monitor changes in the input fields and checkbox
document.getElementById('username').addEventListener('input', checkInputs);
document.getElementById('password').addEventListener('input', checkInputs);
document.getElementById('terms').addEventListener('change', checkInputs);

// Disable the submit button on page load
document.addEventListener('DOMContentLoaded', disableSubmit);
