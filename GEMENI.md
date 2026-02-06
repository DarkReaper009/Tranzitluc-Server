# Project Context: Tranzitluc Website Server (Backend)

## Tech Stack

- **Runtime:** Node.js (ES Modules - `type: "module"`)
- **Framework:** Express 5.x
- **Environment Management:** Native Node.js `--env-file=.env` (no `require('dotenv').config()`)
- **Email Service:** Nodemailer
- **Security:** CORS, Express Rate Limit
- **Development:** Nodemon

## Architecture & Coding Rules

- **Entry Point:** `src/server.js`
- **Module System:** Always use ES Modules (`import/export`).
- **Middleware:** Use `cors` for frontend-backend communication and `express-rate-limit` for DDoS/Brute-force protection on sensitive routes (like contact forms).
- **Environment Variables:** Access via `process.env`. The server is started with native env support: `nodemon --env-file=.env src/server.js`.
- **Async Logic:** Prefer `async/await` over callbacks. Express 5 handles rejected promises automatically, so lean into that for cleaner controllers.
- **Email Handling:** Nodemailer is used for the contact form. Ensure SMTP configurations are kept in `.env`.

## Agent Instructions

1. **Explore First:** Before asking for the API logic, look into `src/` to identify route handlers, controllers, and middleware.
2. **Security Focus:** If proposing new routes, always suggest appropriate rate limiting and CORS configurations.
3. **Dependency Management:** If I ask for a new feature, check if existing dependencies (`nodemailer`, etc.) can handle it before suggesting new ones.
4. **Tool Use:** You have permission to use `ls` and `cat` (via your internal tools) to read the server structure.
