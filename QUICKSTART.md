# Quick Start Guide

Get the HealthTrack frontend running in 5 minutes.

## 📋 Prerequisites

- **Node.js** 16+ ([download](https://nodejs.org/))
- **npm** or **yarn** (comes with Node.js)
- **Backend API** running on `http://localhost:3001` (required for full functionality)

## 🚀 Installation (Copy & Paste)

```bash
# 1. Navigate to project directory
cd c:\Users\tmand\OneDrive\Desktop\frontednHH

# 2. Install dependencies
npm install

# 3. Create environment file
copy .env.example .env

# 4. (Optional) Edit .env if your backend is on a different URL
# VITE_API_BASE_URL=http://localhost:3001/api
```

## 🎮 Running the App

### Development Mode

```bash
npm run dev
```

- Server starts on `http://localhost:5173`
- Hot reload enabled (changes refresh automatically)
- Press `q` to quit

### Production Build

```bash
npm run build
```

Creates optimized build in `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

Test the production build locally before deploying.

## 🧪 Testing the Frontend

### Without Backend
The frontend will load but API calls will fail. You'll see error messages.

### With Backend
Ensure your backend is running:
1. Backend should be on `http://localhost:3001`
2. All API endpoints should be implemented
3. CORS should allow `http://localhost:5173`

## 📱 Accessing the App

1. Open `http://localhost:5173` in browser
2. Click "Create Account" or "Sign In"
3. Use test credentials (if backend has seed data)

## 🎨 Default Features

✅ **Authentication** - Login/Register  
✅ **Dashboard** - Today's health summary  
✅ **Add Entry** - Log health metrics  
✅ **History** - View past entries  
✅ **Weekly Report** - AI-generated insights  
✅ **AI Chat** - Talk to health assistant  

## 🛠️ Project Structure at a Glance

```
frontednHH/
├── src/
│   ├── api/              # API calls
│   ├── components/       # Reusable components
│   ├── pages/            # Feature pages
│   ├── context/          # Global state
│   ├── routes/           # Route protection
│   ├── styles/           # Stylesheets
│   ├── App.jsx          # Main router
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── package.json          # Dependencies
├── vite.config.js       # Build config
├── index.html           # HTML template
├── README.md            # Full documentation
└── ARCHITECTURE.md      # Design documentation
```

## 🐛 Common Issues

### "Cannot find module 'react'"

```bash
npm install
```

Reinstall dependencies.

### "API calls are failing"

1. Check backend is running on `http://localhost:3001`
2. Check CORS is enabled
3. Check token is being sent in headers
4. Check API endpoints match expected format

### "Page won't load after login"

1. Check browser console for errors (F12)
2. Check localStorage has token:
   ```javascript
   // Open DevTools → Console
   localStorage.getItem('authToken')
   localStorage.getItem('user')
   ```

### "Styles are broken"

1. Hard refresh browser (Ctrl+Shift+R)
2. Clear browser cache
3. Check CSS imports in `src/index.css`

## 📚 Learn More

- [React Docs](https://react.dev/)
- [Vite Docs](https://vitejs.dev/)
- [Axios Docs](https://axios-http.com/)
- [React Router Docs](https://reactrouter.com/)

See **README.md** and **ARCHITECTURE.md** for full documentation.

## 🚀 Deploying to Production

### Build
```bash
npm run build
```

### Deploy
Upload the `dist/` folder to your hosting (Vercel, Netlify, etc.)

### Environment Variables
Set `VITE_API_BASE_URL` to your production backend URL

```
VITE_API_BASE_URL=https://api.yoursite.com
```

## 💡 Tips

- **Use DevTools** - F12 to inspect components and network
- **Check Console** - See errors and logs
- **Network Tab** - See API requests and responses
- **React DevTools** - Browser extension for React debugging
- **Read ARCHITECTURE.md** - Understand the design

## ❓ Questions?

Refer to:
1. **README.md** - Overview and features
2. **ARCHITECTURE.md** - Design and flow
3. **API_REFERENCE.md** - Backend expectations
4. **INTERVIEW.md** - How to explain the project

---

**Happy coding!** 🎉
