# Portfolio Backend API

A professional, production-ready Node.js backend for managing a personal portfolio with projects, certifications, and achievements.

## Features

✅ **RESTful APIs** for Projects, Certifications, and Achievements  
✅ **MongoDB & Mongoose** for robust data management  
✅ **JWT Authentication** for secure POST/PUT/DELETE operations  
✅ **Comprehensive Validation** using Joi  
✅ **Error Handling** with global middleware  
✅ **CORS Enabled** for frontend integration  
✅ **Environment Variables** for configuration  
✅ **MVC Architecture** for scalability  
✅ **Mongoose Indexing** for optimized queries  

---

## Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn
- Postman (for API testing)

---

## Installation

### 1. Install Dependencies

```bash
cd Backend
npm install
```

### 2. Configure Environment Variables

Update `.env` file in the `Backend/` directory:

```env
MONGO_URI=mongodb://localhost:27017/portfolio
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_change_in_production
NODE_ENV=development
```

**For MongoDB Atlas**, use:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
```

### 3. Generate JWT Token for Testing

```bash
node src/utils/tokenGenerator.js
```

This will output a JWT token. Copy it for use in Postman.

### 4. Start the Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server will run on: `http://localhost:5000`

---

## API Endpoints

### Base URL: `http://localhost:5000/api`

### **PROJECTS**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--|
| GET | `/projects` | Get all projects (paginated) | ❌ |
| GET | `/projects/:id` | Get single project | ❌ |
| POST | `/projects` | Create new project | ✅ |
| PUT | `/projects/:id` | Update project | ✅ |
| DELETE | `/projects/:id` | Delete project | ✅ |

### **CERTIFICATIONS**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--|
| GET | `/certifications` | Get all certifications | ❌ |
| GET | `/certifications/:id` | Get single certification | ❌ |
| POST | `/certifications` | Create new certification | ✅ |
| PUT | `/certifications/:id` | Update certification | ✅ |
| DELETE | `/certifications/:id` | Delete certification | ✅ |

### **ACHIEVEMENTS**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--|
| GET | `/achievements` | Get all achievements | ❌ |
| GET | `/achievements/:id` | Get single achievement | ❌ |
| POST | `/achievements` | Create new achievement | ✅ |
| PUT | `/achievements/:id` | Update achievement | ✅ |
| DELETE | `/achievements/:id` | Delete achievement | ✅ |

---

## Testing with Postman

### **1. Public GET Request** (No Auth Required)

**Example: Get All Projects**

```
GET http://localhost:5000/api/projects
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "E-Commerce Platform",
      "description": "Full-stack e-commerce application",
      "technologies": ["React", "Node.js", "MongoDB"],
      "link": "https://github.com/example/ecommerce",
      "createdAt": "2026-02-12T10:00:00Z",
      "updatedAt": "2026-02-12T10:00:00Z"
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "pages": 1
  }
}
```

### **2. Protected POST Request** (Auth Required)

**Example: Create a New Project**

```
POST http://localhost:5000/api/projects
```

**Headers:**
```
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Body (JSON):**
```json
{
  "title": "E-Commerce Platform",
  "description": "A full-stack e-commerce application built with React and Node.js",
  "technologies": ["React", "Node.js", "MongoDB", "Express"],
  "link": "https://github.com/example/ecommerce",
  "imageUrl": "https://example.com/images/ecommerce.jpg",
  "startDate": "2023-01-15",
  "endDate": "2023-06-30",
  "featured": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Project created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "E-Commerce Platform",
    "description": "A full-stack e-commerce application built with React and Node.js",
    "technologies": ["React", "Node.js", "MongoDB", "Express"],
    "link": "https://github.com/example/ecommerce",
    "imageUrl": "https://example.com/images/ecommerce.jpg",
    "startDate": "2023-01-15T00:00:00.000Z",
    "endDate": "2023-06-30T00:00:00.000Z",
    "featured": true,
    "createdAt": "2026-02-12T10:30:00Z",
    "updatedAt": "2026-02-12T10:30:00Z"
  }
}
```

### **3. Create Certification Example**

```
POST http://localhost:5000/api/certifications
```

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Body:**
```json
{
  "name": "AWS Certified Solutions Architect",
  "issuer": "Amazon Web Services",
  "dateObtained": "2023-05-20",
  "credentialId": "AWS-12345678",
  "credentialUrl": "https://aws.amazon.com/verify",
  "link": "https://www.credly.com/badges/aws-certified"
}
```

### **4. Create Achievement Example**

```
POST http://localhost:5000/api/achievements
```

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Body:**
```json
{
  "title": "Employee of the Quarter",
  "description": "Recognized for exceptional performance and leadership",
  "date": "2023-03-31",
  "category": "awards",
  "link": "https://example.com/award"
}
```

### **5. Update Project Example**

```
PUT http://localhost:5000/api/projects/507f1f77bcf86cd799439012
```

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Body:** (only fields to update)
```json
{
  "title": "E-Commerce Platform - Updated",
  "featured": false
}
```

### **6. Delete Project Example**

```
DELETE http://localhost:5000/api/projects/507f1f77bcf86cd799439012
```

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## Query Parameters

All GET endpoints support pagination:

```
GET /api/projects?page=1&limit=5&sort=-createdAt
```

**Available parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sort` - Sort field (prefix with `-` for descending)
- `featured` - Filter by featured status (projects only)
- `category` - Filter by category (achievements only)
- `issuer` - Search by issuer name (certifications only)

---

## Error Handling

All errors follow a consistent format:

```json
{
  "success": false,
  "message": "Error description",
  "details": "Additional error details"
}
```

### Common Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Validation failed |
| 401 | Unauthorized - Missing/invalid token |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal error |

---

## Validation Rules

### Project
- `title` - Required, 3-200 characters
- `description` - Required, 10-2000 characters
- `technologies` - Array of strings (optional)
- `link` - Valid URL (optional)
- `imageUrl` - Valid URL (optional)
- `startDate` - Valid date (optional)
- `endDate` - Valid date (optional)
- `featured` - Boolean (default: false)

### Certification
- `name` - Required, 3-200 characters
- `issuer` - Required, 2-200 characters
- `dateObtained` - Required date
- `credentialId` - String (optional)
- `credentialUrl` - Valid URL (optional)
- `link` - Valid URL (optional)
- `expiryDate` - Valid date (optional)

### Achievement
- `title` - Required, 3-200 characters
- `description` - String, 10-2000 characters (optional)
- `date` - Required date
- `category` - One of: `awards`, `publications`, `recognition`, `other`
- `imageUrl` - Valid URL (optional)
- `link` - Valid URL (optional)

---

## Project Structure

```
Backend/
├── .env                          # Environment configuration
├── .gitignore                    # Git ignore file
├── package.json                  # Dependencies
├── app.js                        # Entry point
└── src/
    ├── config/
    │   └── db.js                # MongoDB connection
    ├── models/
    │   ├── projectModel.js       # Project schema
    │   ├── certificationModel.js # Certification schema
    │   └── achievementModel.js   # Achievement schema
    ├── controllers/
    │   ├── projectsController.js       # Project logic
    │   ├── certificationsController.js # Certification logic
    │   └── achievementsController.js   # Achievement logic
    ├── routes/
    │   ├── projectsRoutes.js           # Project routes
    │   ├── certificationsRoutes.js     # Certification routes
    │   └── achievementsRoutes.js       # Achievement routes
    ├── middlewares/
    │   ├── authMiddleware.js    # JWT authentication
    │   └── errorHandler.js      # Global error handler
    └── utils/
        ├── validators.js        # Joi validation schemas
        └── tokenGenerator.js    # JWT token generator
```

---

## Security Best Practices

1. **Change JWT_SECRET** in production
2. **Use HTTPS** in production
3. **Enable CORS** carefully - restrict to known domains
4. **Use MongoDB Atlas** with IP whitelist in production
5. **Implement Rate Limiting** for production
6. **Never commit** `.env` to version control
7. **Use Environment Variables** for sensitive data

---

## Future Enhancements

- [ ] Rate limiting middleware
- [ ] Request logging
- [ ] File upload (image storage)
- [ ] Search functionality
- [ ] Advanced filtering
- [ ] Swagger/OpenAPI documentation
- [ ] Unit and integration tests
- [ ] GitHub Actions CI/CD
- [ ] Docker containerization

---

## Troubleshooting

### MongoDB Connection Error

**Error:** `connect ECONNREFUSED`

**Solution:**
- Ensure MongoDB is running: `mongod`
- Check `MONGO_URI` in `.env`
- For Atlas, verify IP whitelist and credentials

### JWT Token Expired

**Error:** `Token has expired`

**Solution:**
- Generate a new token: `node src/utils/tokenGenerator.js`
- Update the token in Postman headers

### Validation Errors

**Error:** `Validation failed`

**Solution:**
- Check request body against validation rules above
- Ensure all required fields are present
- Verify data types (dates should be ISO format)

---

## Support

For issues or questions, refer to the code comments or create an issue in the repository.

---

## License

MIT License - Feel free to use for personal projects.
