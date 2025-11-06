# System Architecture - PrimeTrade

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                             │
│                     (http://localhost:3000)                      │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               │ HTTP Requests
                               │ (axios)
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    REACT.JS FRONTEND                             │
│                                                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │   Pages     │  │ Components  │  │   Context   │            │
│  │             │  │             │  │             │            │
│  │ • Login     │  │ • Navbar    │  │ • Auth      │            │
│  │ • Signup    │  │ • TaskCard  │  │             │            │
│  │ • Dashboard │  │ • TaskModal │  └─────────────┘            │
│  │ • Profile   │  │ • Spinner   │                              │
│  │             │  │             │                              │
│  └─────────────┘  └─────────────┘                              │
│                                                                   │
│  ┌───────────────────────────────────────────┐                 │
│  │         Services (API Calls)              │                 │
│  │  • taskService.js                         │                 │
│  │  • Authentication via AuthContext         │                 │
│  └───────────────────────────────────────────┘                 │
│                                                                   │
│  Features:                                                       │
│  ✓ JWT Token Management (localStorage)                         │
│  ✓ Protected Routes                                             │
│  ✓ Form Validation                                              │
│  ✓ Responsive Design (TailwindCSS)                             │
│  ✓ Toast Notifications                                          │
│                                                                   │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               │ REST API Calls
                               │ (JSON)
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                  EXPRESS.JS BACKEND API                          │
│                 (http://localhost:5000/api)                      │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    MIDDLEWARE                             │  │
│  │  • CORS                                                   │  │
│  │  • Body Parser                                            │  │
│  │  • Auth Middleware (JWT Verification)                    │  │
│  │  • Error Handler                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                      ROUTES                               │  │
│  │                                                            │  │
│  │  /api/auth                    /api/tasks                  │  │
│  │  • POST /signup               • GET /                     │  │
│  │  • POST /login                • GET /stats                │  │
│  │  • GET /me [Protected]        • GET /:id  [Protected]    │  │
│  │  • PUT /profile [Protected]   • POST /    [Protected]    │  │
│  │                                • PUT /:id  [Protected]    │  │
│  │                                • DELETE /:id [Protected]  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                   CONTROLLERS                             │  │
│  │  • authController.js                                      │  │
│  │  • taskController.js                                      │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│  Security:                                                       │
│  ✓ Password Hashing (bcrypt, 10 rounds)                        │
│  ✓ JWT Token Generation & Verification                         │
│  ✓ Input Validation (express-validator)                        │
│  ✓ Protected Route Middleware                                   │
│  ✓ Error Handling                                               │
│                                                                   │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               │ Mongoose ODM
                               │ (Schema & Models)
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    MONGODB DATABASE                              │
│                 (mongodb://localhost:27017)                      │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                   Collections                             │  │
│  │                                                            │  │
│  │  📄 users                     📄 tasks                    │  │
│  │  {                             {                          │  │
│  │    _id: ObjectId,               _id: ObjectId,           │  │
│  │    name: String,                title: String,           │  │
│  │    email: String (unique),      description: String,     │  │
│  │    password: String (hashed),   status: String,          │  │
│  │    bio: String,                 priority: String,        │  │
│  │    avatar: String,              dueDate: Date,           │  │
│  │    createdAt: Date              user: ObjectId (ref),    │  │
│  │  }                               createdAt: Date,         │  │
│  │                                  updatedAt: Date          │  │
│  │                                }                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│  Features:                                                       │
│  ✓ Indexed fields (email, user)                                │
│  ✓ Schema validation                                            │
│  ✓ Pre-save hooks (password hashing)                           │
│  ✓ Methods (comparePassword)                                    │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow

### Authentication Flow

```
1. User Signup/Login
   ┌──────────┐
   │  User    │ enters credentials
   └────┬─────┘
        │
        ▼
   ┌──────────┐
   │ Frontend │ validates input
   └────┬─────┘
        │ POST /api/auth/signup or /api/auth/login
        │ { email, password, name }
        ▼
   ┌──────────┐
   │ Backend  │ validates data
   └────┬─────┘
        │
        ▼
   ┌──────────┐
   │   DB     │ check/create user
   └────┬─────┘
        │
        ▼
   ┌──────────┐
   │ Backend  │ hash password (bcrypt)
   └────┬─────┘ generate JWT token
        │
        ▼
   ┌──────────┐
   │ Frontend │ store token in localStorage
   └────┬─────┘ update auth context
        │
        ▼
   ┌──────────┐
   │  User    │ redirected to dashboard
   └──────────┘
```

### Task CRUD Flow

```
1. Create Task
   User → Frontend (form) → POST /api/tasks → Backend (validate) →
   DB (save) → Backend (response) → Frontend (update UI) → User

2. Read Tasks
   User → Frontend (load) → GET /api/tasks?filter=... → Backend →
   DB (query) → Backend (response) → Frontend (display) → User

3. Update Task
   User → Frontend (edit) → PUT /api/tasks/:id → Backend (validate) →
   DB (update) → Backend (response) → Frontend (refresh) → User

4. Delete Task
   User → Frontend (confirm) → DELETE /api/tasks/:id → Backend →
   DB (remove) → Backend (response) → Frontend (remove from UI) → User
```

## 🔐 Security Layers

```
┌─────────────────────────────────────────────────────────────┐
│                     SECURITY LAYERS                          │
│                                                               │
│  1. Frontend Validation                                      │
│     ✓ Form validation                                        │
│     ✓ Input sanitization                                     │
│     ✓ Client-side checks                                     │
│                                                               │
│  2. Network Security                                         │
│     ✓ HTTPS (production)                                     │
│     ✓ CORS configuration                                     │
│     ✓ JWT in Authorization header                           │
│                                                               │
│  3. Backend Validation                                       │
│     ✓ express-validator                                      │
│     ✓ JWT verification                                       │
│     ✓ Route protection middleware                           │
│                                                               │
│  4. Database Security                                        │
│     ✓ Password hashing (bcrypt)                             │
│     ✓ User ownership verification                           │
│     ✓ Schema validation                                      │
│                                                               │
│  5. Error Handling                                           │
│     ✓ No sensitive data in errors                           │
│     ✓ Generic error messages                                │
│     ✓ Proper status codes                                    │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## 📊 Component Hierarchy (Frontend)

```
App
├── Router
│   ├── Public Routes
│   │   ├── Login
│   │   └── Signup
│   │
│   └── Protected Routes (with ProtectedRoute wrapper)
│       ├── Dashboard
│       │   ├── Navbar
│       │   ├── StatsCard (x4)
│       │   ├── Search & Filters
│       │   ├── TaskCard (multiple)
│       │   └── TaskModal
│       │
│       └── Profile
│           ├── Navbar
│           └── Profile Form
│
└── AuthContext (wraps entire app)
    ├── User state
    ├── Token management
    └── Auth functions (login, signup, logout)
```

## 🗄️ Database Relationships

```
┌──────────────────┐
│      users       │
│  ──────────────  │
│  _id (PK)        │
│  name            │
│  email (unique)  │
│  password        │
│  bio             │
│  avatar          │
│  createdAt       │
└────────┬─────────┘
         │
         │ One-to-Many
         │ (One user has many tasks)
         │
         ▼
┌──────────────────┐
│      tasks       │
│  ──────────────  │
│  _id (PK)        │
│  title           │
│  description     │
│  status          │
│  priority        │
│  dueDate         │
│  user (FK) ──────┘
│  createdAt       │
│  updatedAt       │
└──────────────────┘
```

## 🔌 API Request/Response Flow

```
Example: Create Task

Frontend                Backend              Database
   │                       │                    │
   │  POST /api/tasks      │                    │
   ├──────────────────────>│                    │
   │  Authorization: Bearer│                    │
   │  {                    │                    │
   │    title: "...",      │                    │
   │    status: "pending"  │                    │
   │  }                    │                    │
   │                       │  Verify JWT        │
   │                       │  Validate Input    │
   │                       │                    │
   │                       │  INSERT task       │
   │                       ├───────────────────>│
   │                       │                    │
   │                       │  Return task       │
   │                       │<───────────────────┤
   │                       │                    │
   │  Response 201         │                    │
   │<──────────────────────┤                    │
   │  {                    │                    │
   │    success: true,     │                    │
   │    task: {...}        │                    │
   │  }                    │                    │
   │                       │                    │
   │  Update UI            │                    │
   │  Show toast           │                    │
   │                       │                    │
```

## 📁 File Organization

```
Backend
├── config/
│   └── db.js              # Database connection
├── controllers/
│   ├── authController.js  # Auth logic
│   └── taskController.js  # Task logic
├── middleware/
│   ├── auth.js           # JWT verification
│   └── errorHandler.js   # Error handling
├── models/
│   ├── User.js           # User schema
│   └── Task.js           # Task schema
├── routes/
│   ├── authRoutes.js     # Auth endpoints
│   └── taskRoutes.js     # Task endpoints
├── utils/
│   └── generateToken.js  # JWT helper
└── server.js             # Entry point

Frontend
├── components/
│   ├── LoadingSpinner.js
│   ├── Navbar.js
│   ├── ProtectedRoute.js
│   ├── StatsCard.js
│   ├── TaskCard.js
│   └── TaskModal.js
├── context/
│   └── AuthContext.js    # Auth state
├── pages/
│   ├── Dashboard.js
│   ├── Login.js
│   ├── NotFound.js
│   ├── Profile.js
│   └── Signup.js
├── services/
│   └── taskService.js    # API calls
└── App.js                # Main component
```

---

This architecture demonstrates:

- ✅ Clear separation of concerns
- ✅ RESTful API design
- ✅ Secure authentication flow
- ✅ Proper error handling
- ✅ Scalable structure
- ✅ Modern best practices
