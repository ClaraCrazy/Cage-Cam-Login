#!/bin/bash

# Exit on any error
set -e

# Function to detect package manager
detect_package_manager() {
    if command -v apt > /dev/null; then
        echo "apt"
    elif command -v yum > /dev/null; then
        echo "yum"
    else
        echo "Unsupported package manager. Please install Node.js manually."
        exit 1
    fi
}

# Install Node.js
install_node() {
    echo "Installing Node.js..."
    PACKAGE_MANAGER=$(detect_package_manager)

    if [ "$PACKAGE_MANAGER" = "apt" ]; then
        curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
        sudo apt install -y nodejs
    elif [ "$PACKAGE_MANAGER" = "yum" ]; then
        curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
        sudo yum install -y nodejs
    fi

    echo "Node.js installed successfully."
}

# Copy the web folder to /var/www/auth-page
setup_web_folder() {
    echo "Setting up web folder..."
    sudo mkdir -p /var/www/auth-page
    sudo cp -r web/* /var/www/auth-page/
    sudo chown -R www-data:www-data /var/www/auth-page
    echo "Web folder set up at /var/www/auth-page."
}

# Copy the backend folder to /opt/auth-page-backend
setup_backend_folder() {
    echo "Setting up backend folder..."
    sudo mkdir -p /opt/auth-page-backend
    sudo cp -r backend/* /opt/auth-page-backend/
    echo "Backend folder set up at /opt/auth-page-backend."
}

# Install backend dependencies
install_backend_dependencies() {
    echo "Installing backend dependencies..."
    cd /opt/auth-page-backend
    npm install
    echo "Backend dependencies installed."
}

# Set up nginx configuration
setup_nginx_config() {
    echo "Setting up nginx configuration..."
    sudo cp misc/auth-nginx.example /etc/nginx/sites-available/auth-nginx
    sudo ln -sf /etc/nginx/sites-available/auth-nginx /etc/nginx/sites-enabled/auth-nginx
    sudo nginx -t && sudo systemctl reload nginx
    echo "Nginx configuration set up and reloaded."
}

# Main script execution
main() {
    echo "Starting setup process..."

    # Check if Node.js is installed
    if ! command -v node > /dev/null; then
        install_node
    else
        echo "Node.js is already installed."
    fi

    # Set up folders and install dependencies
    setup_web_folder
    setup_backend_folder
    install_backend_dependencies

    # Set up nginx configuration
    setup_nginx_config

    echo "Setup completed successfully."
}

main
