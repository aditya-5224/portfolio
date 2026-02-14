# Quick Start Guide - Portfolio Backend

## 📋 Prerequisites
- Node.js (v14+) installed
- MongoDB running locally OR MongoDB Atlas account
- Postman installed (for API testing)
- Terminal/PowerShell access

---

## 🚀 Quick Setup (3 Steps)

### Step 1: Install Dependencies
```bash
cd Backend
npm install
```

### Step 2: Start MongoDB
**Local MongoDB:**
```bash
mongod
```

**Using MongoDB Atlas:** (Update MONGO_URI in .env with your connection string)

### Step 3: Start the Server
```bash
npm run dev
```

You should see:
```
✓ Server is running on http://localhost:5000
✓ MongoDB connected successfully
```

---

## 🔑 Generate JWT Token

Run this command to generate a token for testing:
```bash
node src/utils/tokenGenerator.js
```

Output:
```
✓ Generated JWT Token (valid for 7 days):
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ...

✓ Use this token in Postman:
Headers: Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Copy this token for use in Postman.

---

## 📬 Test with Postman

### Option 1: Import Collection (Recommended)
1. Open Postman
2. Click **Import** → Select `Postman_Collection.json`
3. Set variable `jwt_token` with your token
4. Start testing!

### Option 2: Manual Testing

**Test GET (No Auth):**
```
GET http://localhost:5000/api/projects
```

**Test POST (With Auth):**
```
POST http://localhost:5000/api/projects

Headers:
  Content-Type: application/json
  Authorization: Bearer YOUR_TOKEN_HERE

Body (raw JSON):
{
  "title": "My First Project",
  "description": "This is a test project for my portfolio",
  "technologies": ["Node.js", "React"],
  "link": "https://github.com/example/project",
  "startDate": "2023-01-01",
  "endDate": "2023-06-30"
}
```

---

## 📁 Folder Structure

```
Backend/
├── app.js                   ← Entry point
├── package.json            ← Dependencies
├── .env                    ← Configuration
├── README.md               ← Full documentation
├── QUICK_START.md          ← This file
├── Postman_Collection.json ← Import to Postman
└── src/
    ├── config/db.js        ← MongoDB connection
    ├── models/             ← Schemas
    ├── controllers/        ← Business logic
    ├── routes/             ← API endpoints
    ├── middlewares/        ← Auth & error handling
    └── utils/              ← Validators & token generator
```

---

## 🔗 All Available Endpoints

**Projects:** `/api/projects` (CRUD operations)  
**Certifications:** `/api/certifications` (CRUD operations)  
**Achievements:** `/api/achievements` (CRUD operations)

All have:
- ✅ GET (all) - public
- ✅ GET (by id) - public
- ✅ POST (create) - requires JWT
- ✅ PUT (update) - requires JWT
- ✅ DELETE - requires JWT

---

## ⚙️ Environment Variables (.env)

```env
MONGO_URI=mongodb://localhost:27017/portfolio
PORT=5000
JWT_SECRET=change_this_in_production
NODE_ENV=development
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| `Cannot connect to MongoDB` | Start mongod or check MONGO_URI in .env |
| `Port 5000 already in use` | Change PORT in .env or kill process using port |
| `JWT token expired` | Generate new token: `node src/utils/tokenGenerator.js` |
| `Authorization header missing` | Add `Authorization: Bearer TOKEN` to headers |

---

## 📚 Next Steps

1. ✅ Explore all endpoints in Postman
2. ✅ Add sample data (projects, certifications, achievements)
3. ✅ Review [README.md](README.md) for detailed documentation
4. ✅ Check validation rules for each model
5. ✅ Set up frontend to consume this API

---

## 💡 Tips

- Use `npm run dev` for development (auto-reload)
- Use `npm start` for production
- Keep MongoDB running in a separate terminal
- Variables in Postman allow easy token swapping
- Check console for detailed error messages

---

**Happy coding! 🎉**
