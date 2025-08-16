# 📘 Authentication System - Personal Backend Journal

This project is a complete **authentication system** built with **Express.js** and **TypeScript**, part of my backend development learning journey. It demonstrates secure authentication, role-based access control, and password reset flows.

---

### 🚀 Project Purpose

The main goals of this project are to:

- Understand and implement **user authentication** with JWT tokens.
- Learn how to handle **role-based access control (RBAC)** for route protection.
- Implement **secure password storage** using `bcrypt`.
- Build a **password reset system** with token verification.
- Apply **rate limiting** to prevent brute force attacks.
- Practice **Express middleware**, request validation with **Zod**, and error handling.

---

### ✅ Features

- User registration and login
- JWT access and refresh token generation
- Role-based access control for protected routes
- Password reset flow (request reset + submit new password)
- Logout endpoint that invalidates refresh tokens
- Rate limiting for login, registration, and password reset endpoints
- Centralized validation and authentication middlewares
- Admin-only dashboard route example

---

### 🧠 What I’ve Learned So Far

- ✅ Setting up a **secure authentication system** from scratch
- ✅ Using `bcrypt` for password hashing
- ✅ Generating and verifying **JWT tokens**
- ✅ Refresh token flow for longer sessions
- ✅ Protecting routes using authentication and **role-based authorization**
- ✅ Validating request data using **Zod schemas**
- ✅ Implementing **rate limiting** to improve security
- ✅ Handling password reset with temporary codes
- ✅ Structuring a backend project with controllers, routes, and middlewares

---

### 🛠️ Tech Stack

- Node.js
- Express.js
- TypeScript
- Zod – Schema validation
- JWT – Authentication tokens
- Bcrypt – Password hashing
- Postmark – Email sending for password reset
- Express-rate-limit – Security
- Drizzle ORM – Database modeling
- Neon (Postgres serverless)
- Winston – Logging
- TSX / ts-node – For running TypeScript

---

### 📂 File Structure

```bash
.
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── middlewares/
│   ├── db/
│   ├── utils/
│   └── index.ts
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

---

### 🛠️ Running the Project

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in the required values:
   - `DATABASE_URL` – Neon/Postgres connection string
   - `JWT_SECRET` – Secret for signing JWT tokens
   - `POSTMARK_SERVER_TOKEN` – Postmark API token
   - `POSTMARK_FROM_EMAIL` – Verified sender email
   - `APP_URL` – Base URL for password reset links

3. Push migrations and generate schema with Drizzle:

   ```bash
   npm run db:push
   npm run db:generate
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Test the endpoints using Postman or any API client.

---

### 📅 Timeline

Started: `August 13, 2025`
Current Status: `Complete authentication system with role-based access and password reset flow`
