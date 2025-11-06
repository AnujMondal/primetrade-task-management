# PrimeTrade Frontend

React.js application for task management with authentication.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Start development server
npm start

# Build for production
npm run build
```

## 📋 Environment Variables

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🎨 Features

- ✅ User Authentication (Login/Signup)
- ✅ Protected Routes
- ✅ Task Management (CRUD)
- ✅ Search & Filter Tasks
- ✅ Task Statistics Dashboard
- ✅ Profile Management
- ✅ Responsive Design
- ✅ Toast Notifications

## 📦 Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "axios": "^1.6.2",
  "react-toastify": "^9.1.3",
  "react-icons": "^4.12.0",
  "tailwindcss": "^3.3.6"
}
```

## 🗂️ Project Structure

```
src/
├── components/          # Reusable components
│   ├── LoadingSpinner.js
│   ├── Navbar.js
│   ├── ProtectedRoute.js
│   ├── StatsCard.js
│   ├── TaskCard.js
│   └── TaskModal.js
├── context/            # Context providers
│   └── AuthContext.js
├── pages/             # Page components
│   ├── Dashboard.js
│   ├── Login.js
│   ├── NotFound.js
│   ├── Profile.js
│   └── Signup.js
├── services/          # API services
│   └── taskService.js
├── App.js            # Main app component
├── index.js          # Entry point
└── index.css         # Global styles
```

## 🎨 TailwindCSS Configuration

Custom theme configured with primary colors:

- Primary 600: #4f46e5 (Indigo)
- Custom utilities for buttons and inputs
- Responsive breakpoints
- Custom animations

## 🔐 Authentication Flow

1. User logs in/signs up
2. JWT token received from backend
3. Token stored in localStorage
4. Token sent in Authorization header for protected routes
5. Auto-redirect to login if token invalid/expired

## 🛣️ Routes

- `/login` - Login page (Public)
- `/signup` - Signup page (Public)
- `/dashboard` - Main dashboard (Protected)
- `/profile` - User profile (Protected)
- `/` - Redirects to dashboard
- `*` - 404 Not Found page

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Collapsible mobile menu
- Optimized layouts for all screen sizes

## 🎯 Key Components

### AuthContext

- Manages authentication state
- Provides login, signup, logout functions
- Handles token management
- Auto-loads user on mount

### ProtectedRoute

- Wraps protected pages
- Redirects to login if not authenticated
- Shows loading state during auth check

### Dashboard

- Task list with filters
- Search functionality
- CRUD operations
- Statistics cards
- Create/Edit modal

### TaskModal

- Reusable form for create/edit
- Form validation
- Dynamic title based on mode
- Character count for text fields

## 🛠️ Development

```bash
# Start dev server (http://localhost:3000)
npm start

# Run tests
npm test

# Build for production
npm run build

# Eject from Create React App (irreversible)
npm run eject
```

## 🚀 Deployment

### Build Production Bundle

```bash
npm run build
```

### Deploy to Vercel

```bash
vercel
```

### Deploy to Netlify

```bash
netlify deploy --prod
```

## 🎨 Customization

### Change Theme Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      }
    }
  }
}
```

### Add New Components

1. Create component in `src/components/`
2. Import and use in pages
3. Add to git

## 📝 Code Quality

- ESLint configuration included
- React best practices
- Functional components with hooks
- Proper error handling
- Loading states for async operations

## 🔧 Troubleshooting

### "Module not found" error

```bash
rm -rf node_modules package-lock.json
npm install
```

### Port already in use

```bash
# Change port in package.json or
PORT=3001 npm start
```

### API connection issues

- Check REACT_APP_API_URL in .env
- Ensure backend is running
- Check CORS settings

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🙏 Credits

- React.js
- TailwindCSS
- React Router
- React Toastify
- React Icons
