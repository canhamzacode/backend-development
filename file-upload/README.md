# File Upload with Multer and Cloudinary

This project demonstrates how to **upload files using Multer** (for handling multipart/form-data in Express) and **Cloudinary** (for cloud-based image storage). It supports image upload via an API endpoint and returns the uploaded file's URL from Cloudinary.

---

## ✅ Features

- Upload images to **Cloudinary**
- Validate file input using **Zod**
- Express.js backend setup with **TypeScript**
- Multer for handling file uploads
- Centralized error handling

---

## 🛠 Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **Multer**
- **Cloudinary SDK**
- **Zod** (for schema validation)

---

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/canhamzacode/backend-development
cd backend-development/file-upload
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` File

Create a `.env` file in the root directory and add the following:

```
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Run the Project

```bash
npm run dev
```

---

## 🔑 API Endpoints

### **GET /**

**Description:** Health check endpoint
**Response:**

```json
{
  "message": "File Upload with Multer and Cloudinary"
}
```

---

### **POST /upload**

**Description:** Upload an image to Cloudinary
**Headers:**

```
Content-Type: multipart/form-data
```

**Form Data:**

- `avatar` (type: file) – The image file to upload

**Response:**

```json
{
  "message": "File uploaded successfully",
  "data": {
    "url": "https://res.cloudinary.com/.../image.jpg",
    "id": "avatars/...."
  }
}
```

---

## ✅ Validation

- The file field (`avatar`) is required.
- Validation handled using **Zod**.

---

## ❌ Possible Errors

- **400 Bad Request** – If no file is provided
- **Validation Error** – If file is missing or invalid
- **Cloudinary Error** – If upload fails

---

## 🧹 Future Enhancements

- ✅ Add **file deletion endpoint** (delete from Cloudinary by public_id)
- ✅ Add **multiple file uploads**
- ✅ Add **file type and size validation**
- ✅ Store file metadata in a database

---

## 🧾 License

This project is licensed under the MIT License.

---
