# 🚀 Quick Reference Guide - PrimeTrade

## One-Line Commands

### Setup & Start

```bash
# Complete setup and start
./setup.sh

# OR manually start both:
cd backend && npm run dev & cd ../frontend && npm start
```

### Backend Only

```bash
cd backend && npm run dev
```

### Frontend Only

```bash
cd frontend && npm start
```

## Access URLs

| Service      | URL                              |
| ------------ | -------------------------------- |
| Frontend     | http://localhost:3000            |
| Backend API  | http://localhost:5000            |
| Health Check | http://localhost:5000/api/health |

## Default Credentials

Create your own account via signup, or use these for testing:

- Email: `demo@primetrade.com`
- Password: `demo123`

_(Note: Create this user first by signing up)_

## Key Files

| File                                     | Purpose                         |
| ---------------------------------------- | ------------------------------- |
| `README.md`                              | Complete documentation          |
| `SETUP.md`                               | Setup & troubleshooting guide   |
| `CHECKLIST.md`                           | Assignment completion checklist |
| `PROJECT_SUBMISSION.md`                  | Submission summary              |
| `SCALABILITY.md`                         | Scaling strategy                |
| `PrimeTrade_API.postman_collection.json` | API testing                     |

## Environment Variables

### Backend (.env)

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/primetrade
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Common Commands

### MongoDB

```bash
# macOS
brew services start mongodb-community
brew services stop mongodb-community

# Linux
sudo systemctl start mongod
sudo systemctl stop mongod

# Check status
brew services list | grep mongodb  # macOS
sudo systemctl status mongod       # Linux
```

### npm Commands

```bash
npm install          # Install dependencies
npm start            # Start production server
npm run dev          # Start development server (backend)
npm run build        # Build for production (frontend)
npm test             # Run tests
```

### Port Management

```bash
# Kill process on port
lsof -ti:5000 | xargs kill -9   # Backend
lsof -ti:3000 | xargs kill -9   # Frontend
```

## API Quick Reference

### Authentication

```bash
# Signup
POST /api/auth/signup
Body: { "name": "...", "email": "...", "password": "..." }

# Login
POST /api/auth/login
Body: { "email": "...", "password": "..." }

# Get Profile
GET /api/auth/me
Headers: Authorization: Bearer <token>
```

### Tasks

```bash
# Get All Tasks
GET /api/tasks
Headers: Authorization: Bearer <token>

# Create Task
POST /api/tasks
Headers: Authorization: Bearer <token>
Body: { "title": "...", "status": "pending", "priority": "medium" }

# Update Task
PUT /api/tasks/:id
Headers: Authorization: Bearer <token>
Body: { "title": "...", "status": "completed" }

# Delete Task
DELETE /api/tasks/:id
Headers: Authorization: Bearer <token>
```

## Troubleshooting Quick Fixes

### MongoDB Not Running

```bash
# Start MongoDB
brew services start mongodb-community  # macOS
sudo systemctl start mongod            # Linux

# Use MongoDB Atlas instead
# Update MONGODB_URI in backend/.env
```

### Port Already in Use

```bash
# Change port in .env files
# Backend: PORT=5001
# Frontend: PORT=3001
```

### Dependencies Issues

```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### API Connection Failed

```bash
# 1. Check backend is running
cd backend && npm run dev

# 2. Check API URL in frontend/.env
# Should be: REACT_APP_API_URL=http://localhost:5000/api
```

## Project Structure

```
PrimeTrade/
├── backend/
│   ├── config/          # Database config
│   ├── controllers/     # Route handlers
│   ├── middleware/      # Auth & error handlers
│   ├── models/          # DB schemas
│   ├── routes/          # API routes
│   ├── utils/           # Helper functions
│   └── server.js        # Entry point
│
├── frontend/
│   ├── public/          # Static files
│   └── src/
│       ├── components/  # Reusable UI
│       ├── context/     # State management
│       ├── pages/       # Page components
│       ├── services/    # API calls
│       └── App.js       # Main component
│
├── README.md            # Main docs
├── SETUP.md            # Setup guide
├── SCALABILITY.md      # Scaling guide
└── setup.sh            # Setup script
```

## Tech Stack

### Frontend

- React.js 18
- React Router 6
- TailwindCSS 3
- Axios
- React Toastify

### Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT
- bcryptjs

## Features at a Glance

✅ User Authentication (Signup/Login)
✅ JWT Token Management
✅ Protected Routes
✅ Task CRUD Operations
✅ Search & Filter
✅ Task Statistics
✅ Profile Management
✅ Responsive Design
✅ Error Handling
✅ Input Validation
✅ Toast Notifications
✅ Loading States

## Performance Tips

### Frontend

- Use React.memo for heavy components
- Implement pagination for large lists
- Add lazy loading for routes
- Use React Query for caching

### Backend

- Add database indexes
- Implement Redis caching
- Use connection pooling
- Add rate limiting

## Security Checklist

✅ Passwords hashed (bcrypt)
✅ JWT authentication
✅ Protected routes
✅ Input validation
✅ CORS configured
✅ Environment variables
✅ No secrets in code

## Deployment

### Frontend (Vercel)

```bash
cd frontend
vercel --prod
```

### Backend (Heroku)

```bash
cd backend
heroku create app-name
git push heroku main
```

### Database (MongoDB Atlas)

1. Create cluster at mongodb.com/atlas
2. Get connection string
3. Update MONGODB_URI

## Getting Help

1. Check SETUP.md troubleshooting section
2. Review README.md for detailed info
3. Check console logs for errors
4. Verify environment variables
5. Test with Postman collection

## Important Links

- MongoDB: https://mongodb.com
- React Docs: https://react.dev
- Express Docs: https://expressjs.com
- TailwindCSS: https://tailwindcss.com
- JWT.io: https://jwt.io

## Contact

For questions about this project:

- Email: [your.email@example.com]
- GitHub: [@yourusername]

---

**Need detailed info?** Check README.md
**Having issues?** Check SETUP.md
**Want to scale?** Check SCALABILITY.md

**Quick Start:** `./setup.sh` → Open http://localhost:3000 → Sign up → Start managing tasks! 🚀
