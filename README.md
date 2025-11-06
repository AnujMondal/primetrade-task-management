# PrimeTrade - Task Management System

A modern, scalable web application with JWT-based authentication and task management capabilities. Built with React.js and Node.js/Express.

## 🚀 Features

### ✅ Frontend (React.js)

- **Authentication System**
  - User registration with validation
  - Secure login with JWT tokens
  - Protected routes (login required for dashboard)
  - Persistent authentication across sessions
- **Responsive Design**
  - TailwindCSS for modern, mobile-first UI
  - Fully responsive across all devices
  - Custom animations and transitions
- **Dashboard Features**
  - User profile management
  - Task CRUD operations (Create, Read, Update, Delete)
  - Real-time task statistics
  - Advanced search and filtering
  - Sort by date, priority, status
  - Status tracking (Pending, In Progress, Completed)
  - Priority levels (Low, Medium, High)
  - Due date management with overdue indicators

### ✅ Backend (Node.js/Express)

- **API Endpoints**
  - User signup/login (JWT authentication)
  - Profile fetching/updating
  - Complete task CRUD operations
  - Task statistics and filtering
- **Security Features**
  - Password hashing with bcrypt (10 salt rounds)
  - JWT token-based authentication
  - Protected API routes with middleware
  - Input validation with express-validator
  - CORS enabled for cross-origin requests
  - Error handling middleware
- **Database**
  - MongoDB with Mongoose ODM
  - Structured schemas for Users and Tasks
  - Indexed fields for performance

## 📁 Project Structure

```
PrimeTrade/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   └── taskController.js     # Task CRUD logic
│   ├── middleware/
│   │   ├── auth.js              # JWT verification middleware
│   │   └── errorHandler.js      # Global error handler
│   ├── models/
│   │   ├── User.js              # User schema
│   │   └── Task.js              # Task schema
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   └── taskRoutes.js        # Task endpoints
│   ├── utils/
│   │   └── generateToken.js     # JWT token generator
│   ├── .env                     # Environment variables
│   ├── .env.example            # Environment template
│   ├── package.json            # Dependencies
│   └── server.js               # Entry point
│
└── frontend/
    ├── public/
    │   ├── index.html
    │   └── manifest.json
    ├── src/
    │   ├── components/
    │   │   ├── LoadingSpinner.js
    │   │   ├── Navbar.js
    │   │   ├── ProtectedRoute.js
    │   │   ├── StatsCard.js
    │   │   ├── TaskCard.js
    │   │   └── TaskModal.js
    │   ├── context/
    │   │   └── AuthContext.js      # Auth state management
    │   ├── pages/
    │   │   ├── Dashboard.js
    │   │   ├── Login.js
    │   │   ├── NotFound.js
    │   │   ├── Profile.js
    │   │   └── Signup.js
    │   ├── services/
    │   │   └── taskService.js      # API calls
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    ├── .env
    ├── .env.example
    ├── package.json
    ├── tailwind.config.js
    └── postcss.config.js
```

## 🛠️ Technology Stack

### Frontend

- **React.js 18** - UI framework
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **TailwindCSS** - Utility-first CSS
- **React Toastify** - Toast notifications
- **React Icons** - Icon library

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Token-based authentication
- **bcryptjs** - Password hashing
- **Express Validator** - Input validation
- **CORS** - Cross-origin resource sharing

## 📦 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:
   Create `.env` file with:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/primetrade
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

4. Start MongoDB (if running locally):

```bash
mongod
```

5. Start the backend server:

```bash
npm start         # Production
npm run dev       # Development with nodemon
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:
   Create `.env` file with:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:

```bash
npm start
```

Frontend will run on `http://localhost:3000`

## 🔌 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Authentication Endpoints

#### 1. Sign Up

```http
POST /auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response (201):
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "bio": "",
    "avatar": "avatar_url",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### 2. Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response (200):
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": { ... }
}
```

#### 3. Get Current User

```http
GET /auth/me
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "user": { ... }
}
```

#### 4. Update Profile

```http
PUT /auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Updated",
  "bio": "Software developer",
  "avatar": "https://example.com/avatar.jpg"
}

Response (200):
{
  "success": true,
  "message": "Profile updated successfully",
  "user": { ... }
}
```

### Task Endpoints

#### 1. Get All Tasks

```http
GET /tasks?status=pending&priority=high&search=meeting&sort=newest
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "count": 5,
  "tasks": [...]
}
```

**Query Parameters:**

- `status`: pending | in-progress | completed
- `priority`: low | medium | high
- `search`: Search in title and description
- `sort`: newest | oldest | priority | dueDate

#### 2. Get Single Task

```http
GET /tasks/:id
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "task": { ... }
}
```

#### 3. Create Task

```http
POST /tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the authentication module",
  "status": "pending",
  "priority": "high",
  "dueDate": "2024-12-31"
}

Response (201):
{
  "success": true,
  "message": "Task created successfully",
  "task": { ... }
}
```

#### 4. Update Task

```http
PUT /tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated title",
  "status": "completed"
}

Response (200):
{
  "success": true,
  "message": "Task updated successfully",
  "task": { ... }
}
```

#### 5. Delete Task

```http
DELETE /tasks/:id
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "Task deleted successfully"
}
```

#### 6. Get Task Statistics

```http
GET /tasks/stats
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "stats": {
    "total": 10,
    "pending": 3,
    "inProgress": 4,
    "completed": 3,
    "highPriority": 2,
    "mediumPriority": 5,
    "lowPriority": 3
  }
}
```

## 🔒 Security Implementation

### Password Security

- Passwords hashed using bcrypt with 10 salt rounds
- Passwords never stored in plain text
- Password field excluded from query responses by default

### JWT Authentication

- Tokens signed with secret key
- 7-day expiration by default
- Token required for all protected routes
- Automatic token validation on each request

### Input Validation

- Server-side validation using express-validator
- Client-side validation for better UX
- Sanitization of user inputs
- Error messages don't expose sensitive information

### CORS Configuration

- Configured to allow frontend origin
- Credentials support enabled
- Production-ready CORS settings

## 🚦 Testing the Application

### Using the App

1. **Sign Up**

   - Navigate to `http://localhost:3000/signup`
   - Create a new account

2. **Login**

   - Use your credentials to log in
   - JWT token stored in localStorage

3. **Dashboard**

   - View all your tasks
   - Create, edit, and delete tasks
   - Filter and search tasks
   - View statistics

4. **Profile**
   - Update your profile information
   - Change avatar and bio

### Demo Credentials

```
Email: demo@primetrade.com
Password: demo123
```

_(Create this user first via signup)_

## 📊 Scalability Considerations

### Frontend Scalability

1. **Code Splitting**

   - Implement React.lazy() for route-based code splitting
   - Reduce initial bundle size

   ```javascript
   const Dashboard = lazy(() => import("./pages/Dashboard"));
   ```

2. **State Management**

   - For larger scale, implement Redux or Zustand
   - Centralized state management
   - Better caching and data flow

3. **Performance Optimization**

   - Implement React.memo for expensive components
   - Use useMemo and useCallback hooks
   - Virtual scrolling for large task lists
   - Image lazy loading

4. **API Optimization**

   - Implement request debouncing for search
   - Add pagination for task lists
   - Cache API responses using React Query or SWR
   - Implement optimistic updates

5. **Build Optimization**
   - Production build with minification
   - Tree shaking unused code
   - CDN deployment for static assets
   - Service workers for offline capability

### Backend Scalability

1. **Database Optimization**

   - Add indexes on frequently queried fields

   ```javascript
   userSchema.index({ email: 1 });
   taskSchema.index({ user: 1, status: 1 });
   ```

   - Implement database connection pooling
   - Use MongoDB aggregation for complex queries

2. **Caching Strategy**

   - Redis for session management
   - Cache frequently accessed data
   - Implement cache invalidation strategies

3. **API Performance**

   - Implement pagination and limit results
   - Add request rate limiting
   - Compression middleware (gzip)
   - API response caching

4. **Architecture Evolution**

   - Microservices architecture for larger scale
   - Separate auth and task services
   - Message queue (RabbitMQ/Kafka) for async operations
   - Load balancing with Nginx

5. **Deployment Strategy**

   - Containerization with Docker
   - Kubernetes for orchestration
   - Horizontal scaling with multiple instances
   - Health checks and auto-recovery
   - CI/CD pipeline (GitHub Actions)

6. **Monitoring & Logging**
   - Implement structured logging (Winston/Morgan)
   - Application monitoring (New Relic, DataDog)
   - Error tracking (Sentry)
   - Performance monitoring

### Production Deployment

**Frontend:**

- Build: `npm run build`
- Deploy to: Vercel, Netlify, or AWS S3 + CloudFront
- Environment variables via platform settings

**Backend:**

- Deploy to: AWS EC2, Heroku, DigitalOcean, or Railway
- Use MongoDB Atlas for database
- Environment variables via platform settings
- SSL/TLS certificates (Let's Encrypt)

**Example Docker Setup:**

`Dockerfile` (Backend):

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
```

`docker-compose.yml`:

```yaml
version: "3.8"
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/primetrade
    depends_on:
      - mongo

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

## 🎯 Future Enhancements

1. **Features**

   - Task collaboration and sharing
   - Real-time updates with WebSockets
   - File attachments for tasks
   - Task comments and activity log
   - Email notifications
   - Calendar view
   - Recurring tasks
   - Task templates

2. **Security**

   - Two-factor authentication (2FA)
   - OAuth integration (Google, GitHub)
   - Password reset via email
   - Account recovery options
   - Session management dashboard

3. **Performance**
   - GraphQL API for flexible queries
   - Progressive Web App (PWA)
   - Offline mode support
   - Real-time collaboration
   - Advanced analytics dashboard

## 🤝 Contributing

This project is part of a internship assignment. Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests

## 📝 License

This project is created for educational purposes.

## 👨‍💻 Developer

**Your Name**

- Email: your.email@example.com
- GitHub: @yourusername
- LinkedIn: linkedin.com/in/yourprofile

## 🙏 Acknowledgments

- React.js team for the amazing framework
- TailwindCSS for the utility-first CSS framework
- MongoDB team for the flexible database
- Express.js community

---

**Built with ❤️ for PrimeTrade Internship Assignment**

_Last Updated: November 2025_
