# Visual Architecture Guide

## 🎯 Application Flow Diagram

```
USER OPENS BROWSER
        │
        ↓
   http://localhost:5173
        │
        ↓
   ┌─────────────────────────────┐
   │     App.jsx (Router)         │
   │   ├─ AuthProvider            │
   │   └─ BrowserRouter           │
   └─────────────────────────────┘
        │
        ├─ Is User Logged In?
        │
        ├─ YES → <PrivateRoute>
        │   └─ <AppLayout>
        │       ├─ <Sidebar> ────────────────┐
        │       │  • Dashboard               │
        │       │  • Add Entry               │ Persistent
        │       │  • History                 │ (Never reloads)
        │       │  • Weekly Report           │
        │       │  • AI Chat                 │
        │       │  • Logout                  │
        │       └─────────────────────────────┘
        │       │
        │       └─ <main>
        │           ├─ Dashboard (when clicked)
        │           ├─ AddEntry (when clicked)
        │           ├─ History (when clicked)
        │           ├─ WeeklyReport (when clicked)
        │           └─ AIChat (when clicked)
        │           [ONLY THIS CHANGES]
        │
        └─ NO → <PublicRoute>
            ├─ Login.jsx
            └─ Register.jsx
```

---

## 🔐 Authentication State Flow

```
┌──────────────────────────────────────────────────┐
│              AuthProvider (App Root)              │
│                                                   │
│  ┌─────────────────────────────────────────────┐ │
│  │         AuthContext State                   │ │
│  │  • user: { id, email, name }                │ │
│  │  • token: JWT                               │ │
│  │  • isAuthenticated: boolean                 │ │
│  │  • loading: boolean                         │ │
│  └─────────────────────────────────────────────┘ │
│                    │                              │
│                    ↓                              │
│  ┌─────────────────────────────────────────────┐ │
│  │     localStorage (Browser Storage)          │ │
│  │  • authToken                                │ │
│  │  • user (JSON stringified)                  │ │
│  └─────────────────────────────────────────────┘ │
│                    │                              │
│                    ↓                              │
│         Available everywhere via:                │
│              const auth = useAuth()              │
│                                                   │
└──────────────────────────────────────────────────┘
```

---

## 🌐 API Request Lifecycle

```
┌─ Component (e.g., Dashboard)
│  └─ useState(loading, error)
│     │
│     ├─ useEffect() → fetch data
│     │
│     └─ entriesAPI.getDashboardSummary()
│        │
│        ↓
│  ┌──────────────────────────────────────┐
│  │  src/api/entries.api.js              │
│  │  ─────────────────────────────────   │
│  │  getDashboardSummary: () =>          │
│  │    axiosInstance.get(                │
│  │      '/entries/dashboard/summary'    │
│  │    )                                 │
│  └──────────────────────────────────────┘
│        │
│        ↓
│  ┌──────────────────────────────────────┐
│  │  src/api/axios.js                    │
│  │  ─────────────────────────────────   │
│  │  Interceptors:                       │
│  │  • Add: Authorization header         │
│  │  • Handle 401 → logout               │
│  │  • Handle errors                     │
│  └──────────────────────────────────────┘
│        │
│        ↓
│  ┌──────────────────────────────────────┐
│  │  HTTP Request                        │
│  │  GET /entries/dashboard/summary      │
│  │  Authorization: Bearer <token>       │
│  └──────────────────────────────────────┘
│        │
│        ↓
│     [BACKEND]
│        │
│        ↓
│  ┌──────────────────────────────────────┐
│  │  HTTP Response                       │
│  │  {                                   │
│  │    calories: 2000,                   │
│  │    sleepHours: 8,                    │
│  │    steps: 10000,                     │
│  │    ...                               │
│  │  }                                   │
│  └──────────────────────────────────────┘
│        │
│        ↓
│  Component receives data
│  ├─ setLoading(false)
│  ├─ setData(response.data)
│  └─ render with new data
│
└─ User sees stats on screen
```

---

## 📄 Component Hierarchy Map

```
<App>                                    [Router]
│
└─ <AuthProvider>                        [Global State]
   │
   └─ <Router>
      │
      ├─ <Routes>
      │  │
      │  ├─ /login
      │  │  └─ <PublicRoute>
      │  │     └─ <Login>              [Form]
      │  │        ├─ <ErrorBanner>
      │  │        └─ <Button>
      │  │
      │  ├─ /register
      │  │  └─ <PublicRoute>
      │  │     └─ <Register>           [Form]
      │  │        ├─ <ErrorBanner>
      │  │        └─ <Button>
      │  │
      │  ├─ /dashboard
      │  │  └─ <PrivateRoute>
      │  │     └─ <AppLayout>          [Layout]
      │  │        ├─ <Sidebar>         [Navigation]
      │  │        │  ├─ nav items
      │  │        │  └─ logout btn
      │  │        │
      │  │        └─ <main>
      │  │           └─ <Dashboard>    [Page]
      │  │              ├─ <Loader>
      │  │              ├─ stat cards
      │  │              └─ <ErrorBanner>
      │  │
      │  ├─ /add-entry
      │  │  └─ <PrivateRoute>
      │  │     └─ <AppLayout>
      │  │        ├─ <Sidebar>
      │  │        └─ <main>
      │  │           └─ <AddEntry>     [Page - Form]
      │  │              ├─ form sections
      │  │              ├─ <ErrorBanner>
      │  │              └─ <Button>
      │  │
      │  ├─ /history
      │  │  └─ <PrivateRoute>
      │  │     └─ <AppLayout>
      │  │        ├─ <Sidebar>
      │  │        └─ <main>
      │  │           └─ <History>      [Page - List]
      │  │              ├─ <Loader>
      │  │              ├─ entry items
      │  │              └─ <ErrorBanner>
      │  │
      │  ├─ /weekly-report
      │  │  └─ <PrivateRoute>
      │  │     └─ <AppLayout>
      │  │        ├─ <Sidebar>
      │  │        └─ <main>
      │  │           └─ <WeeklyReport> [Page]
      │  │              ├─ report display
      │  │              ├─ <Button>
      │  │              └─ <ErrorBanner>
      │  │
      │  └─ /ai-chat
      │     └─ <PrivateRoute>
      │        └─ <AppLayout>
      │           ├─ <Sidebar>
      │           └─ <main>
      │              └─ <AIChat>       [Page - Chat]
      │                 ├─ messages
      │                 ├─ input form
      │                 ├─ <Button>
      │                 └─ <ErrorBanner>
      │
      └─ CSS
         └─ Global styles via index.css
            imports from styles/
```

---

## 🗂️ File Organization

```
src/
│
├─ api/                    [API COMMUNICATION]
│  ├─ axios.js            ← HTTP client config
│  ├─ auth.api.js         ← Auth endpoints
│  ├─ entries.api.js      ← Health data endpoints
│  └─ ai.api.js           ← AI endpoints
│
├─ components/            [REUSABLE COMPONENTS]
│  ├─ layout/
│  │  ├─ Sidebar.jsx      ← Navigation
│  │  └─ AppLayout.jsx    ← Main wrapper
│  │
│  └─ common/
│     ├─ Button.jsx       ← Button variants
│     ├─ Loader.jsx       ← Spinner
│     └─ ErrorBanner.jsx  ← Error display
│
├─ context/              [GLOBAL STATE]
│  └─ AuthContext.jsx    ← Auth state + methods
│
├─ pages/                [PAGE COMPONENTS]
│  ├─ auth/
│  │  ├─ Login.jsx       ← Login form
│  │  └─ Register.jsx    ← Registration form
│  │
│  ├─ Dashboard.jsx      ← Health summary
│  ├─ AddEntry.jsx       ← Entry form
│  ├─ History.jsx        ← Entry list
│  ├─ WeeklyReport.jsx   ← AI report
│  └─ AIChat.jsx         ← Chat interface
│
├─ routes/              [ROUTE PROTECTION]
│  └─ PrivateRoute.jsx   ← Protected route wrapper
│
├─ styles/              [MODULAR CSS]
│  ├─ Layout.css         ← Sidebar & layout
│  ├─ Forms.css          ← Form styling
│  ├─ Button.css         ← Button styles
│  ├─ Common.css         ← Error/Loader
│  ├─ Pages.css          ← Page styles
│  └─ Chat.css           ← Chat styles
│
├─ App.jsx              [MAIN ROUTER]
├─ main.jsx             [ENTRY POINT]
└─ index.css            [GLOBAL STYLES + IMPORTS]
```

---

## 🔄 Data Flow Example: User Login

```
1. USER INTERACTION
   ├─ User visits /login
   └─ Sees login form
        │
        ↓
2. FORM SUBMISSION
   ├─ User enters email & password
   ├─ Clicks "Sign In"
   └─ handleSubmit() triggered
        │
        ↓
3. API CALL
   ├─ authAPI.login({ email, password })
   ├─ axios makes POST to /auth/login
   ├─ Interceptor adds headers
   └─ Request sent to backend
        │
        ↓
4. BACKEND PROCESSING
   ├─ Validates credentials
   ├─ Generates JWT token
   └─ Returns { token, user }
        │
        ↓
5. RESPONSE HANDLING
   ├─ Check if successful (200)
   ├─ If yes:
   │  ├─ login(user, token) in AuthContext
   │  ├─ Store to localStorage
   │  ├─ Set AuthContext state
   │  └─ navigate('/dashboard')
   │
   └─ If error:
      ├─ setError(error.message)
      └─ Show ErrorBanner
        │
        ↓
6. AUTHENTICATED STATE
   ├─ AuthContext updated
   ├─ localStorage updated
   ├─ isAuthenticated = true
   ├─ PrivateRoute allows access
   └─ AppLayout renders with Sidebar
        │
        ↓
7. USER SEES DASHBOARD
   ├─ Sidebar navigation available
   ├─ Main content shows health summary
   └─ User can navigate without login
```

---

## 🎯 Request/Response Pattern

All API interactions follow this pattern:

```javascript
// COMPONENT
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');

const fetchData = async () => {
  setLoading(true);
  setError('');
  
  try {
    // 1. CALL API
    const response = await entriesAPI.getAll();
    
    // 2. HANDLE SUCCESS
    setData(response.data);
    
  } catch (err) {
    // 3. HANDLE ERROR
    const message = err.response?.data?.message || 'Failed';
    setError(message);
    
  } finally {
    // 4. CLEANUP
    setLoading(false);
  }
};
```

---

## 🛡️ Protected Route Pattern

```javascript
// <PrivateRoute>
export const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  // Show loader while checking auth
  if (loading) return <Loader />;
  
  // If authenticated, show component
  if (isAuthenticated) return children;
  
  // Otherwise, redirect to login
  return <Navigate to="/login" replace />;
};

// USAGE
<PrivateRoute>
  <Dashboard />
</PrivateRoute>
```

---

## 📊 State Management Strategy

```
┌─────────────────────────────────────────┐
│        THREE LEVELS OF STATE            │
├─────────────────────────────────────────┤
│                                          │
│  LEVEL 1: GLOBAL (AuthContext)          │
│  ├─ Authentication status               │
│  ├─ Current user                        │
│  ├─ JWT token                           │
│  └─ Available everywhere via useAuth()  │
│                                          │
│  LEVEL 2: PAGE (Component useState)     │
│  ├─ Form data                           │
│  ├─ UI state (loading, error)           │
│  ├─ Fetched data (entries, report)      │
│  └─ Only in that component              │
│                                          │
│  LEVEL 3: LOCAL (Sub-component)         │
│  ├─ Expanded state                      │
│  ├─ Form field focus                    │
│  └─ Temporary UI state                  │
│                                          │
└─────────────────────────────────────────┘
```

---

## ✅ When to Use Each Tool

```
NEED TO TRACK...              USE...
─────────────────────────────────────────────
Auth status                   AuthContext
User info                     AuthContext
Login/logout flow             AuthContext

Form inputs                   useState
Loading state                 useState
Error messages                useState
API response data             useState

Modal open/close              useState (local)
Expanded rows                 useState (local)
Tooltip visible               useState (local)
```

---

## 🚀 Deployment Architecture

```
┌─────────────────────────────────────────┐
│         DEVELOPMENT (npm run dev)        │
├─────────────────────────────────────────┤
│                                          │
│  Vite Dev Server                        │
│  ↓                                       │
│  http://localhost:5173                  │
│  ↓                                       │
│  Hot Module Reload (HMR)                │
│  (Changes refresh instantly)            │
│                                          │
└─────────────────────────────────────────┘

                    ↓

┌─────────────────────────────────────────┐
│      PRODUCTION (npm run build)          │
├─────────────────────────────────────────┤
│                                          │
│  Build Process:                         │
│  ├─ Compile JSX → JavaScript            │
│  ├─ Bundle code                         │
│  ├─ Minify + optimize                   │
│  └─ Generate dist/                      │
│      ↓                                   │
│  dist/ folder contains:                 │
│  ├─ index.html (single file)            │
│  ├─ assets/                             │
│  │  ├─ *.js (minified)                  │
│  │  └─ *.css (minified)                 │
│  └─ Ready for static hosting            │
│                                          │
│  Deploy to:                             │
│  ├─ Vercel (recommended)                │
│  ├─ Netlify                             │
│  ├─ GitHub Pages                        │
│  └─ Any static host                     │
│                                          │
└─────────────────────────────────────────┘
```

---

This visual guide helps understand how all pieces work together! 🎯
