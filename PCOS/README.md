# PCOS/PCOD Health Platform

A full-stack MERN application to help users detect PCOS risk, track health data, and receive personalized wellness recommendations.

---

## 🌐 Tech Stack

- **Frontend:** React (Vite) + Tailwind CSS v4 (Glassmorphism UI)
- **Backend:** Node.js + Express
- **Database:** MongoDB + Mongoose
- **Auth:** JWT + bcrypt
- **Charts:** Recharts

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/pcos-health-platform.git
cd pcos-health-platform
```

### 2. Setup the Backend
```bash
cd server
npm install
```

Create a `.env` file inside the `server/` folder:
```env
MONGO_URI=mongodb://localhost:27017/pcos_health_platform
JWT_SECRET=your_secret_key_here
PORT=5000
```

Start the server:
```bash
npm run dev
```

### 3. Setup the Frontend
```bash
cd ../client
npm install --legacy-peer-deps
npm run dev
```

Frontend runs at: **http://localhost:5173**  
Backend runs at: **http://localhost:5000**

---

## 🎯 Features

| Feature | Description |
|---------|-------------|
| 🔐 Auth | JWT-based register & login with bcrypt |
| 🩺 Symptom Checker | AI risk prediction (Low/Medium/High) |
| 📊 Dashboard | Weight trends, mood, cycle tracking charts |
| 💊 Health Tracker | Daily log for weight, mood, cycle dates |
| 👤 Profile | Editable user profile |
| 📋 Recommendations | Personalized diet, exercise & lifestyle tips |

---

## 📁 Folder Structure

```
PCOS/
├── client/          # React frontend (Vite)
│   └── src/
│       ├── components/   # Navbar
│       ├── context/      # AuthContext
│       ├── pages/        # Home, Login, Register, Dashboard, etc.
│       └── services/     # Axios API service
└── server/          # Node.js backend
    ├── config/       # MongoDB connection
    ├── controllers/  # Auth, Prediction, Tracker logic
    ├── middleware/   # JWT auth middleware
    ├── models/       # User, Symptom, HealthData schemas
    ├── routes/       # API routes
    └── services/     # Recommendation logic
```

---

## 🌍 Deployment

| Service | Platform |
|---------|----------|
| Frontend | [Vercel](https://vercel.com) |
| Backend | [Render](https://render.com) |
| Database | [MongoDB Atlas](https://cloud.mongodb.com) |

---

## 📬 API Reference (Postman)

Import `PCOS_Health_Platform.postman_collection.json` from the project root into Postman.

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | ❌ | Register a user |
| POST | `/api/auth/login` | ❌ | Login user |
| POST | `/api/predict` | ✅ | Submit symptoms & get risk |
| POST | `/api/tracker` | ✅ | Log health data |
| GET | `/api/tracker` | ✅ | Get health history |

---

## 📝 License
MIT
