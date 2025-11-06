# PrimeTrade Backend API

REST API for task management system with JWT authentication.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your settings

# Start MongoDB
mongod

# Run development server
npm run dev

# Run production server
npm start
```

## 📋 Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/primetrade
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
NODE_ENV=development
```

## 🔌 API Endpoints

### Health Check

- `GET /api/health` - Server health status

### Authentication

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `PUT /api/auth/profile` - Update profile (Protected)

### Tasks

- `GET /api/tasks` - Get all user tasks (Protected)
- `GET /api/tasks/stats` - Get task statistics (Protected)
- `GET /api/tasks/:id` - Get single task (Protected)
- `POST /api/tasks` - Create task (Protected)
- `PUT /api/tasks/:id` - Update task (Protected)
- `DELETE /api/tasks/:id` - Delete task (Protected)

## 🔒 Security Features

- Password hashing with bcrypt (10 rounds)
- JWT token authentication
- Protected routes middleware
- Input validation
- Error handling
- CORS enabled

## 📦 Dependencies

```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.0",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "express-validator": "^7.0.1"
}
```

## 🗄️ Database Schema

### User Model

- name (String, required)
- email (String, required, unique)
- password (String, required, hashed)
- bio (String, optional)
- avatar (String, optional)
- createdAt (Date)

### Task Model

- title (String, required)
- description (String, optional)
- status (String: pending/in-progress/completed)
- priority (String: low/medium/high)
- dueDate (Date, optional)
- user (ObjectId, ref: User)
- createdAt (Date)
- updatedAt (Date)

## 🛠️ Development

```bash
# Install nodemon for auto-restart
npm install --save-dev nodemon

# Run in development mode
npm run dev
```

## 📈 Error Handling

All errors return in this format:

```json
{
  "success": false,
  "message": "Error message here"
}
```

## 🧪 Testing

Use the provided Postman collection to test all endpoints.

Import `PrimeTrade_API.postman_collection.json` into Postman.

## 📝 Notes

- All protected routes require `Authorization: Bearer <token>` header
- Tokens expire after 7 days (configurable)
- Password minimum length: 6 characters
- Title max length: 100 characters
- Description max length: 500 characters
