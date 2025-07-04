# 🐾 Simple-NGINX‑Login

![image](https://github.com/user-attachments/assets/9c90840e-704e-407b-9c90-a8f3c1fd699e)

A cozy and secure login page to be used with nginx, in this case for my cage-cam. 


---

## 📦 What’s Inside

* **`backend/`** — Contains the backend code:
  - `server.js` — The main backend server file.
  - `package.json` — Node.js dependencies and scripts.

* **`frontend/`** — Contains the frontend code:
  - `login.html` — The login screen with username/password fields and a ToS checkbox.
  - `login.js` — Handles client-side logic for the login page.
  - `style.css` — Styles for the login page.

* **`misc/`** — Misc scripts and example files:
  - `htpassword-gen.js` — HTPassword script for user generation.
  - `install.sh` — Automatic setup script.
  - `env.example` — Example environment configuration file.
  - `auth-nginx.example` — NGINX Example config
  - `systemd.service.example` — Systemd example service.

* **Root Files**:
  - `README.md` — Project documentation.

<br>

---

## 🛠️ Getting Started

1. **Clone the repo**

   ```bash
   git clone https://github.com/ClaraCrazy/Simple-Nginx-Login.git
   cd Simple-Nginx-Login
   ```

2. **Edit the login page**

   * Open the `frontend/` directory, replace the logo and tweak the text of `login.html` at `L5-7` & `L18`.
   * Adjust `frontend/style.css` for colors and fonts.

<br>


### Option 1: Manual Setup and Run

3. **Set up the backend**

   ```bash
   # Navigate to the `backend/` folder:
   cd backend

   # Install dependencies:
   npm install

   # Configure environment variables in `misc/env.example` and move them to `backend/.env`.
   ```

4. **Run the backend**

   ```bash
   # Start the backend server:
   node server.js
   ```

<br>


### Option 2: Automatic Install

3. **Run the installation script**

   ```bash
   sudo bash install.sh
   ```

<br>

---

## ❤️ Support me

<!--
Pwease support me >.<
-->  

<p>Since I work full-time on open-source projects spread across my organizations, my only source of income is donations from people like you that use & appreciate my stuff. So, if you can spare a dollar or two, I would really appreciate that. All the money goes towards paying rent, essentials like food, drinks etc, and most importantly it will be used to fuel my cookie addiction🍪<br></p>

**Multilink:**
- Blockchain profile: [Claracrazy.eth](https://profile.crazyco.xyz)<br>

**Crypto:**
- **XMR**: `42xc4qPZyfi4wzAkCBXSoMSo3BLDS8946J89JXDqtT5gRj6uYpfhjQF12NLPMxtqGDL2RxoWXjB73iYdBP8DX7SqGvdbdtb`<br>
- **TRON (TRX20 Coins):** `TWg6VDUBase3HDA6RxAwTVjQw4SbxoGyqZ`<br>
- **ETH (ERC20 Coins):** `0x841251438A8Fb2B16298C15B10feA9Fd2cEA3405`<br>
- **Doge:** `DCKAFtgw6686uEMaFzZfCtUajS9VjPJLMm`<br>
- **BTC:** `bc1qje8qy7gpudm8hhyx43n9xndg7d8xj5f7dh6m4p`<br>

**Fiat:**
- **[Patreon](https://patreon.com/crazyco) (Fee: 8%\*)**: ❤️ Account needed, subscription with perks
- **[ko-fi](https://ko-fi.com/crazyco) (Fee: 2%\*)**: No account needed, subscription or one-time donation
- **[Wire-transfer](https://bunq.me/ClaraCrazy) (Fee: 0%\*)**: No account needed, one-time donation
- **[Paypal](https://paypal.me/ClaraCrazy)\*\* (Fee: 2%\*)**: Account needed, one-time donation

\* Fee is calculated by how much I will lose when cashing out<br>
\*\* Please make sure to select *Friends and Family*<br><br>
**Thanks for all your support <3**

