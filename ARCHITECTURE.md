# Architecture & Flow Documentation

## 🎯 High-Level User Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      LANDING PAGE                            │
│              (User Not Authenticated)                         │
└────────┬────────────────────────────────────────────────────┘
         │
         ├─→ [Click "Sign Up"] ──→ REGISTER PAGE
         │                          ├─→ Create Account
         │                          └─→ Redirect to Dashboard
         │
         └─→ [Click "Sign In"] ───→ LOGIN PAGE
                                    ├─→ Verify Credentials
                                    └─→ Store Token + Redirect
                                         │
                                         ↓
                    ┌──────────────────────────────────┐
                    │   DASHBOARD (Protected)          │
                    │   ┌────────────┐ ┌─────────────┐│
                    │   │  SIDEBAR   │ │   CONTENT   ││
                    │   ├────────────┤ │             ││
                    │   │ Dashboard  │ │ Today's     ││
                    │   │ Add Entry  │ │ Summary     ││
                    │   │ History    │ │             ││
                    │   │ Weekly Rep │ │ • Calories  ││
                    │   │ AI Chat    │ │ • Sleep     ││
                    │   │ Logout     │ │ • Steps     ││
                    │   │            │ │ • Heart     ││
                    │   └────────────┘ │ • Mood      ││
                    │                  │ • Water     ││
                    │                  └─────────────┘│
                    └──────────────────────────────────┘
                            │
                ┌───────────┼───────────┬──────────┬──────────┐
                ↓           ↓           ↓          ↓          ↓
            [Add      [History]  [Weekly    [AI Chat]    [Logout]
             Entry]              Report]
```

## 🔐 Authentication Flow

```
CLIENT                          SERVER

User Inputs              
Email/Password                  
     │                          
     ├─→ POST /auth/login ────→ │ Validate credentials
                                 │ Generate JWT token
                                 │
                        ← {token, user} ←
                        │
        Store in localStorage
        Set AuthContext state
             │
        Check isAuthenticated
             │
        Route to /dashboard
```

## 📊 State Management

```
┌────────────────────────────────────────────────┐
│           AuthContext (Global)                  │
├────────────────────────────────────────────────┤
│                                                  │
│  State:                                          │
│  • user: { id, email, name }                   │
│  • token: JWT string                           │
│  • isAuthenticated: boolean                    │
│  • loading: boolean                            │
│                                                  │
│  Methods:                                       │
│  • login(userData, token)                      │
│  • logout()                                     │
│                                                  │
│  Storage: localStorage                          │
│  • authToken                                    │
│  • user (serialized)                           │
│                                                  │
└────────────────────────────────────────────────┘
            │
            └─→ Wrapped around entire App
                Available via useAuth() hook
                throughout application
```

## 🌐 API Layer Architecture

```
COMPONENT                  API MODULE                 BACKEND
          
└─ Dashboard
   ├─ entriesAPI.getDashboardSummary()
   │  └─→ GET /entries/dashboard/summary ────→ [Backend]
   │      └─→ Response: { calories, sleep, steps... }
   │
└─ AddEntry
   ├─ entriesAPI.create(data)
   │  └─→ POST /entries ──────────────────────→ [Backend]
   │      └─→ Response: { id, ... }
   │
└─ History
   ├─ entriesAPI.getAll()
   │  └─→ GET /entries ────────────────────────→ [Backend]
   │      └─→ Response: [ {...}, {...} ]
   │
   ├─ entriesAPI.delete(id)
   │  └─→ DELETE /entries/:id ─────────────────→ [Backend]
   │
└─ AIChat
   └─ aiAPI.chat(message)
      └─→ POST /ai/chat ────────────────────────→ [Backend]
          └─→ Response: { message, ... }

ALL REQUESTS:
  ↓
axios interceptor
  ├─ Add Authorization header: Bearer {token}
  ├─ Handle 401 → Logout & redirect to /login
  └─ Return response
```

## 🛣️ Router Structure

```
App.jsx
  │
  ├─→ <Router>
      │
      ├─→ PUBLIC ROUTES
      │   ├─ /login          → Login.jsx
      │   └─ /register       → Register.jsx
      │
      ├─→ PROTECTED ROUTES
      │   ├─ /dashboard      → Dashboard.jsx
      │   │  └─ Wrapped in AppLayout
      │   │
      │   ├─ /add-entry      → AddEntry.jsx
      │   │  └─ Wrapped in AppLayout
      │   │
      │   ├─ /history        → History.jsx
      │   │  └─ Wrapped in AppLayout
      │   │
      │   ├─ /weekly-report  → WeeklyReport.jsx
      │   │  └─ Wrapped in AppLayout
      │   │
      │   └─ /ai-chat        → AIChat.jsx
      │      └─ Wrapped in AppLayout
      │
      └─→ FALLBACK
          └─ / → Redirect to /dashboard
```

## 🎭 Component Hierarchy

```
<App>
  │
  ├─ <AuthProvider>
  │   │
  │   └─ <Router>
  │       │
  │       ├─ <PublicRoute>
  │       │   └─ <Login / Register>
  │       │
  │       └─ <PrivateRoute>
  │           │
  │           └─ <AppLayout>
  │               │
  │               ├─ <Sidebar>
  │               │   ├─ [Navigation Items]
  │               │   └─ [Logout Button]
  │               │
  │               └─ <main>
  │                   │
  │                   ├─ <Dashboard>
  │                   │   ├─ <Loader>
  │                   │   └─ [StatCards]
  │                   │
  │                   ├─ <AddEntry>
  │                   │   ├─ <ErrorBanner>
  │                   │   ├─ [FormSections]
  │                   │   └─ [Buttons]
  │                   │
  │                   ├─ <History>
  │                   │   └─ [ExpandableEntries]
  │                   │
  │                   ├─ <WeeklyReport>
  │                   │   └─ [ReportDisplay]
  │                   │
  │                   └─ <AIChat>
  │                       ├─ [ChatMessages]
  │                       └─ [ChatInput]
  │
  └─ CSS (Global Styles)
```

## 📈 Data Flow Example: Adding an Entry

```
┌─ User fills AddEntry form
│  ├─ Date: 2024-01-15
│  ├─ Calories: 2000
│  ├─ Sleep: 8
│  └─ etc...
│
├─ Submit form
│  └─ handleSubmit() triggers
│     │
│     ├─ setLoading(true)
│     ├─ Disable form inputs
│     │
│     └─ entriesAPI.create(formData)
│        │
│        └─ axios makes POST /entries
│           │
│           └─ axios interceptor adds token
│              │
│              → Backend receives request
│                │
│                ├─ Validate token
│                ├─ Save to database
│                └─ Return { id, ... }
│                     │
│                     ← Response back to client
│                       │
│                       ├─ setLoading(false)
│                       ├─ Clear form
│                       ├─ Show success message
│                       └─ navigate('/history')
│
└─ User sees history page with new entry
```

## 🔄 Error Handling Flow

```
┌─ API call fails
│  │
│  ├─ Error caught in try/catch
│  │  │
│  │  ├─ Check error type
│  │  │  │
│  │  │  ├─ 401 (Unauthorized)
│  │  │  │   ├─ Clear localStorage
│  │  │  │   ├─ Clear AuthContext
│  │  │  │   └─ Redirect to /login
│  │  │  │
│  │  │  ├─ 429 (Rate Limited)
│  │  │  │   └─ Show special "Rate limit" message
│  │  │  │
│  │  │  ├─ 4xx/5xx (Other)
│  │  │  │   └─ Show error.response.data.message
│  │  │  │
│  │  │  └─ Network Error
│  │  │      └─ Show "Failed to connect" message
│  │  │
│  │  └─ setError(message)
│  │
│  └─ <ErrorBanner> displays error
│     │
│     ├─ User can click X to close
│     │ or
│     └─ Auto-dismisses after 5 seconds
```

## 🎯 Key Design Decisions

### 1. **Persistent Sidebar**
- Sidebar never reloads when navigating
- Only main content area changes
- Creates native app feeling

### 2. **Protected Routes**
- Every app route wrapped in `<PrivateRoute>`
- Public routes use `<PublicRoute>` to redirect authenticated users
- Unauthenticated users can't access protected pages

### 3. **Centralized API**
- All API calls go through modules in `src/api/`
- Easy to modify endpoints (one place)
- Token injection happens automatically

### 4. **Error Handling**
- User-friendly error messages
- No raw JSON shown
- Auto-logout on 401

### 5. **Loading States**
- Buttons disable and show "..."
- Inputs disabled during submission
- Full loader for critical operations

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] Set `VITE_API_BASE_URL` environment variable
- [ ] Run `npm run build`
- [ ] Test build locally with `npm run preview`
- [ ] Ensure backend API is running
- [ ] Check CORS settings on backend
- [ ] Verify localStorage is enabled
- [ ] Test authentication flow end-to-end
- [ ] Check error handling with bad credentials
- [ ] Test on multiple devices/browsers
- [ ] Review console for errors

## 📝 Summary

The HealthTrack frontend is structured for:
- **Maintainability**: Clear separation of concerns
- **Scalability**: Easy to add new features
- **Professional UX**: Consistent design, smooth interactions
- **Interview-Ready**: Well-organized, documented code

Each component has a single responsibility, APIs are centralized, and authentication is managed globally through React Context.
