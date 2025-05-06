# Work-it Backend API

Base URL:  
**https://lyrical-p6de.onrender.com**

---

## 📌 Authentication Routes

### 🔐 Register User
**POST** `/api/signup`

**Request Body:**
```json
{
  "mail": "user@example.com",
  "password": "yourpassword",
  "confirmPassword": "yourpassword"
}
```

**Response:**
Returns JWT token on success.

---

### 🔐 Login User
**POST** `/api/login`

**Request Body:**
```json
{
  "mail": "user@example.com",
  "password": "yourpassword"
}
```

**Response:**
Returns JWT token on successful login.

---

## 👤 Personal Information

### 📝 Save Personal Information  
**POST** `/api/personalinformation`

**Request Body:**
```json
{
  "email": "user@example.com",
  "firstname": "John",
  "surname": "Doe",
  "number": "1234567890",
  "country": "Nigeria",
  "city": "Lagos",
  "dateOfBirth": "2000-01-01",
  "gender": "Male",
  "address": "123 Street Name",
  "state": "Lagos",
  "localGovernment": "Ikeja"
}
```

---

## 🎓 Education Form

### 📘 Save Education Details  
**POST** `/api/education`

**Request Body:**
```json
{
  "email": "user@example.com",
  "degree": "BSc Computer Engineering",
  "institution": "FUTA",
  "startDate": "2019-01-01",
  "endDate": "2024-01-01",
  "schooling": true,
  "schoolState": "Ondo",
  "schoolCountry": "Nigeria"
}
```

---

## 📧 OTP Verification

### 📤 Send OTP  
**POST** `/api/send-otp`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

---

### ✅ Verify OTP  
**POST** `/api/verify-otp`

**Request Body:**
```json
{
  "email": "user@example.com",
  "otpEntered": "1234"
}
```

---

## 🖼️ Profile Photo Upload

### 📷 Upload Profile Photo  
**POST** `/api/upload-photo`  
**Content-Type:** `multipart/form-data`

**Form Data Fields:**
- `image`: Image file (JPEG, PNG, etc.)
- `userId`: User ID associated with the upload

**Response:**
Returns uploaded image path.

---

## 🌟 Interests

### 📌 Save Interests  
**POST** `/api/save-interests`

**Request Body:**
```json
{
  "email": "user@example.com",
  "interests": ["Web Development", "Machine Learning", "UI/UX Design"]
}
```

---

## ✅ Summary Table

| Endpoint               | Method | Description                        |
|------------------------|--------|------------------------------------|
| `/api/signup`          | POST   | Register new user                  |
| `/api/login`           | POST   | Login existing user                |
| `/api/personalinformation` | POST   | Save personal details              |
| `/api/education`       | POST   | Save education details             |
| `/api/send-otp`        | POST   | Send OTP to email                  |
| `/api/verify-otp`      | POST   | Verify OTP                         |
| `/api/upload-photo`    | POST   | Upload user profile picture        |
| `/api/save-interests`  | POST   | Save user interests                |

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Storage:** Multer for image uploads
- **Cache/OTP:** Redis
- **Mailing:** Nodemailer (Gmail SMTP)

---

## 📂 Folder Structure
Key folders:
- `/controllers` – Logic for all routes
- `/models` – MySQL query functions
- `/routes` – API route definitions
- `/uploads` – Stores uploaded images

---

## 🧪 Testing Tip for Frontend
Use [Postman](https://www.postman.com/) or browser fetch/axios to test each endpoint. Ensure CORS and Content-Type headers are correctly set.
