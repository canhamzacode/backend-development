# 🧠 Personal Journal for Backend Development

Welcome to my personal backend development journal! 🚀
This repository is a collection of mini backend projects, each built with **TypeScript**, **Express**, and other helpful tools like **Zod**, **UUID**, **ts-node**, **Drizzle ORM**, and more.

The purpose of this repo is to **learn**, **practice**, and **document** important backend concepts including:

- Error handling
- Input validation
- CRUD operations
- Middleware
- Authentication & Authorization
- Password reset flows
- Rate limiting & security
- Testing
- Dockerization
- Deployment

Each project is located in its own folder under the `src` directory and includes documentation or comments explaining the thought process and what was learned.

---

## 📁 Projects

### 📦 `error-handling`

> A simple CRUD API for managing books with custom error handling using `Zod` and `Express`.

- Demonstrates:

  - Basic `Express` setup with TypeScript
  - Using `Zod` for input validation
  - UUID generation for IDs
  - Centralized error responses
  - Clean code separation and use of interfaces

**Technologies Used:**

- Node.js, TypeScript, Express, Zod, UUID, TSX

**Steps to Run:**

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run development server:

   ```bash
   npm run dev
   ```

---

### 📦 `authentication`

> A complete authentication system with role-based access, JWT tokens, refresh tokens, and password reset functionality.

- Demonstrates:

  - User registration and login
  - Password hashing with `bcrypt`
  - JWT-based authentication and token refresh
  - Role-based access control (RBAC)
  - Rate limiting for security (login, registration, password reset)
  - Password reset flow (with Postmark email support)
  - Middleware for authentication, authorization, and validation
  - Integration with `Drizzle ORM` and Neon serverless database
  - Logging with `Winston`
  - Validation with `Zod` schemas

**Technologies Used:**

- Node.js
- TypeScript
- Express
- Zod – Schema validation
- JWT – Authentication tokens
- Bcrypt – Password hashing
- Postmark – Email sending
- Express-rate-limit – Security
- Drizzle ORM – Database modeling
- Neon (Postgres serverless)
- Winston – Logging
- TSX / ts-node – For running TypeScript

**Steps to Run:**

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the example environment variables:

   ```bash
   cp .env.example .env
   ```

   Then fill in the values (Neon DB URL, JWT secret, Postmark token, verified From email, APP URL, etc.).

3. Push migrations and generate schema with Drizzle:

   ```bash
   npm run db:push
   npm run db:generate
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

**Learning Milestones Achieved:**

- Implemented secure authentication flow with JWT
- Role-based access control (RBAC)
- Password reset flows with tokens
- Rate limiting for key endpoints
- Centralized error handling
- Integration with serverless database (Neon) and Drizzle ORM
