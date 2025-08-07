# 📘 Personal Journal for Backend Development

This project is a simple Express.js server for managing books using in-memory storage. It is part of my learning journey to becoming a senior full stack engineer, with a current focus on backend development.

---

### 🚀 Project Purpose

The main goal of this project is to:

- Practice and understand the **Express.js** framework.
- Learn how to define and validate schemas with **TypeScript**.
- Implement common backend operations such as:

  - Adding a new item (Create)
  - Retrieving all or single items (Read)
  - Updating an item (Update)
  - Removing an item (Delete)

- Handle request parameters and body properly using **Express request typing**.

---

### ✅ Features

- Add a new book
- Retrieve all books
- Retrieve a book by ID
- Update a book by ID
- Delete a book by ID
- All data is stored in a temporary in-memory array

---

### 🧠 What I’ve Learned So Far

- ✅ How to set up a simple Express project with TypeScript
- ✅ Using `Request` and `Response` types from Express for better type safety
- ✅ Creating and using custom types like `CreateBookInput`
- ✅ Handling errors using try/catch blocks and sending proper HTTP responses
- ✅ Understanding route parameters (`req.params`) and request body (`req.body`)
- ✅ Building CRUD endpoints from scratch
- ✅ Using `Partial<Type>` in TypeScript to allow partial updates

---

### 🛠️ Tech Stack

- Node.js
- Express.js
- TypeScript
- Nodemon (for development)

---

### 📂 File Structure

```bash
.
├── src/
│   ├── routes/
│   ├── controllers/
|   ├── middlewares/
│   ├── schema/
│   └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

### 📅 Timeline

Started: `August 7, 2025`
Current Status: `CRUD operations complete with in-memory data`
