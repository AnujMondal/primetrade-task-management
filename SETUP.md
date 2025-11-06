# 🚀 Quick Start Guide - PrimeTrade

## Prerequisites Check

Before you begin, ensure you have:

- ✅ Node.js (v14 or higher) - [Download](https://nodejs.org/)
- ✅ MongoDB (local or Atlas) - [Download](https://www.mongodb.com/try/download/community)
- ✅ npm or yarn package manager
- ✅ Git (optional but recommended)

## ⚡ Quick Setup (5 minutes)

### Option 1: Automated Setup (Recommended)

```bash
# Clone or navigate to project directory
cd PrimeTrade

# Run setup script (macOS/Linux)
chmod +x setup.sh
./setup.sh

# The script will:
# 1. Install all dependencies
# 2. Setup environment files
# 3. Start MongoDB (if installed locally)
# 4. Start both frontend and backend
```

### Option 2: Manual Setup

#### Step 1: Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your settings (or use defaults)
# The defaults are configured for local development

# Start MongoDB (if running locally)
# On macOS:
brew services start mongodb-community
# On Linux:
sudo systemctl start mongod
# On Windows:
# MongoDB should auto-start, or use MongoDB Compass

# Start backend server
npm run dev
```

Backend should now be running on `http://localhost:5000`

#### Step 2: Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# The default API URL is already configured

# Start frontend
npm start
```

Frontend should now be running on `http://localhost:3000`

## 🎯 First Time Usage

### 1. Create Your Account

1. Open browser to `http://localhost:3000`
2. Click "Sign up"
3. Fill in your details:
   - Name: Your Full Name
   - Email: your@email.com
   - Password: (minimum 6 characters)
4. Click "Create account"

### 2. Login

If you already have an account:

1. Go to login page
2. Enter your credentials
3. Click "Sign in"

### 3. Create Your First Task

1. You'll be redirected to the Dashboard
2. Click "New Task" button
3. Fill in task details:
   - Title (required)
   - Description (optional)
   - Status: Pending/In Progress/Completed
   - Priority: Low/Medium/High
   - Due Date (optional)
4. Click "Create Task"

### 4. Manage Tasks

- **View:** All tasks are displayed in cards
- **Search:** Use the search bar to find tasks
- **Filter:** Filter by status or priority
- **Sort:** Sort by date, priority, etc.
- **Edit:** Click "Edit" button on any task card
- **Delete:** Click "Delete" button (with confirmation)

### 5. Update Your Profile

1. Click on "Profile" in the navigation
2. Click "Edit Profile"
3. Update your information:
   - Name
   - Bio
   - Avatar URL
4. Click "Save Changes"

## 🔧 Troubleshooting

### Backend Issues

**Problem:** "MongoDB connection error"

```bash
# Solution 1: Make sure MongoDB is running
# Check status:
brew services list | grep mongodb  # macOS
sudo systemctl status mongod       # Linux

# Start if not running:
brew services start mongodb-community  # macOS
sudo systemctl start mongod            # Linux

# Solution 2: Use MongoDB Atlas (cloud)
# 1. Create free account at mongodb.com/atlas
# 2. Create a cluster
# 3. Get connection string
# 4. Update MONGODB_URI in backend/.env
```

**Problem:** "Port 5000 already in use"

```bash
# Solution: Find and kill the process
lsof -ti:5000 | xargs kill -9

# Or change the port in backend/.env
PORT=5001
```

**Problem:** "JWT_SECRET not defined"

```bash
# Solution: Make sure .env file exists in backend/
cp .env.example .env
# The file has a default JWT_SECRET
```

### Frontend Issues

**Problem:** "API connection failed"

```bash
# Solution 1: Make sure backend is running
cd backend
npm run dev

# Solution 2: Check API URL in frontend/.env
# Should be: REACT_APP_API_URL=http://localhost:5000/api
```

**Problem:** "Port 3000 already in use"

```bash
# Solution: React will prompt to use another port
# Just press 'Y' when asked

# Or manually kill the process:
lsof -ti:3000 | xargs kill -9
```

**Problem:** "Module not found" errors

```bash
# Solution: Reinstall dependencies
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### General Issues

**Problem:** "Cannot find module" after setup

```bash
# Solution: Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Problem:** "CORS error" in browser console

```bash
# Solution: Check backend CORS settings
# backend/server.js should have:
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

## 📱 Using the Application

### Authentication Flow

1. **Sign Up** → JWT token generated → Stored in localStorage → Auto-login
2. **Login** → JWT token generated → Stored in localStorage → Redirect to dashboard
3. **Logout** → Token removed from localStorage → Redirect to login

### API Testing with Postman

1. Import the collection:

   - Open Postman
   - Import → `PrimeTrade_API.postman_collection.json`

2. Set environment variables:

   - Create new environment
   - Add variable: `BASE_URL` = `http://localhost:5000/api`
   - Add variable: `TOKEN` = (will be auto-populated after login)

3. Test endpoints:
   - Start with "Sign Up" or "Login"
   - Token is automatically saved
   - Test other endpoints (they'll use the token)

### Features Overview

**Dashboard:**

- ✅ View all tasks
- ✅ Real-time statistics
- ✅ Search tasks by keyword
- ✅ Filter by status/priority
- ✅ Sort tasks
- ✅ Create/Edit/Delete tasks

**Profile:**

- ✅ View profile information
- ✅ Update name, bio, avatar
- ✅ See account statistics

**Security:**

- ✅ JWT-based authentication
- ✅ Password hashing (bcrypt)
- ✅ Protected routes
- ✅ Input validation
- ✅ Error handling

## 🎨 Customization

### Change Theme Colors

Edit `frontend/tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        600: '#your-color-here',
        // ... other shades
      }
    }
  }
}
```

### Change Port Numbers

**Backend:** Edit `backend/.env`

```env
PORT=5001
```

**Frontend:** Create `frontend/.env.local`

```env
PORT=3001
```

### Change Database Name

Edit `backend/.env`:

```env
MONGODB_URI=mongodb://localhost:27017/your_db_name
```

## 🌐 Production Deployment

### Frontend (Vercel)

```bash
cd frontend
npm run build

# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Backend (Heroku)

```bash
cd backend

# Install Heroku CLI
# Then:
heroku login
heroku create your-app-name
git push heroku main
```

### Database (MongoDB Atlas)

1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create free cluster
3. Get connection string
4. Update `MONGODB_URI` in production environment

## 📊 Performance Tips

1. **Frontend:**

   - Use React.memo for expensive components
   - Implement pagination for large task lists
   - Use React Query for caching

2. **Backend:**

   - Add database indexes
   - Implement Redis caching
   - Use connection pooling

3. **Database:**
   - Create indexes on frequently queried fields
   - Use projection to limit returned fields
   - Implement pagination

## 🔐 Security Best Practices

1. **Never commit .env files** to git
2. **Change JWT_SECRET** in production
3. **Use HTTPS** in production
4. **Set strong passwords**
5. **Enable rate limiting** for APIs
6. **Regular security audits**: `npm audit`

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [TailwindCSS](https://tailwindcss.com)
- [JWT.io](https://jwt.io)

## 🆘 Need Help?

If you encounter any issues:

1. Check this guide's troubleshooting section
2. Review the main README.md
3. Check console logs for errors
4. Verify all environment variables are set
5. Ensure MongoDB is running

## ✅ Checklist

Before deploying to production:

- [ ] All tests passing
- [ ] Environment variables configured
- [ ] JWT_SECRET changed from default
- [ ] Database backed up
- [ ] CORS configured for production domain
- [ ] HTTPS enabled
- [ ] Error monitoring setup (Sentry)
- [ ] Logging configured
- [ ] Rate limiting enabled
- [ ] Security headers added
- [ ] API documentation updated
- [ ] Load testing completed

---

**Happy Coding! 🚀**

For more detailed information, see:

- `README.md` - Complete documentation
- `SCALABILITY.md` - Scaling guide
- `backend/README.md` - Backend API docs
- `frontend/README.md` - Frontend docs
