
https://github.com/user-attachments/assets/76c0ef98-9b74-4b0d-b58e-c4017984351c



# HealthTrack Frontend

A professional, production-ready health tracking dashboard built with React, Vite, and modern web technologies.

## 🎯 Product Overview

**HealthTrack** is a personal health dashboard where users can:
- Track daily health metrics (calories, sleep, steps, heart rate, mood, water intake)
- Add and manage health entries
- View historical data
- Get AI-powered health insights
- Chat with an AI health assistant

## 🏗️ Architecture

### User Journey
```
Landing → Login/Register → Dashboard (Protected)
                          ↓
                   [Persistent Sidebar]
                   • Dashboard
                   • Add Entry
                   • History
                   • Weekly Report
                   • AI Chat
                   • Logout
```

### Key Design Principles
✅ **Persistent Sidebar** - Never reloads, only main content changes  
✅ **Protected Routes** - All features require authentication  
✅ **Clean Separation** - API, Context, Components clearly organized  
✅ **Professional UX** - Consistent styling, smooth interactions, error handling  
✅ **Interview-Ready** - Well-structured, documented, scalable architecture  

## 📁 Project Structure

```
src/
├── api/                          # API layer
│   ├── axios.js                  # Configured axios instance with interceptors
│   ├── auth.api.js              # Authentication endpoints
│   ├── entries.api.js           # Health entries endpoints
│   └── ai.api.js                # AI features endpoints
│
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx          # Navigation sidebar (persistent)
│   │   └── AppLayout.jsx        # Main layout wrapper
│   │
│   └── common/
│       ├── Button.jsx           # Reusable button component
│       ├── Loader.jsx           # Loading spinner
│       └── ErrorBanner.jsx      # Error display component
│
├── pages/
│   ├── auth/
│   │   ├── Login.jsx            # Login form page
│   │   └── Register.jsx         # Registration form page
│   │
│   ├── Dashboard.jsx            # Today's health summary
│   ├── AddEntry.jsx             # Add/Edit health entry
│   ├── History.jsx              # View past entries
│   ├── WeeklyReport.jsx         # AI-generated weekly report
│   └── AIChat.jsx               # Chat with AI assistant
│
├── context/
│   └── AuthContext.jsx          # Authentication state management
│
├── routes/
│   └── PrivateRoute.jsx         # Protected route wrapper
│
├── styles/
│   ├── Layout.css               # Sidebar & main layout
│   ├── Forms.css                # Form styling
│   ├── Button.css               # Button variants
│   ├── Common.css               # Error banner, loader
│   ├── Pages.css                # Dashboard, history, etc.
│   └── Chat.css                 # Chat interface
│
├── App.jsx                      # Main app router
├── main.jsx                     # React entry point
└── index.css                    # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your backend URL
# VITE_API_BASE_URL=http://localhost:3001/api
```

### Development

```bash
# Start dev server
npm run dev

# Server runs on http://localhost:5173
```

### Production

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📋 Page-by-Page Guide

### 🔐 Authentication (Public)
**Login & Register Pages**
- Clean, minimal forms
- Email/password validation
- Success redirects to Dashboard
- Inline error messages
- Disable button during API call

### 🏠 Dashboard (Protected)
**Your hero page showing today's summary:**
- 6 metric cards: Calories, Sleep, Steps, Heart Rate, Mood, Water
- Pulls data from `GET /entries/dashboard/summary`
- Visual cards with icons and subtle shadows
- Empty state if no data yet

### ➕ Add Entry (Protected)
**Guided form with multiple sections:**
1. **Date & Stats** - Date picker, calories, sleep, steps, heart rate
2. **Mood & Hydration** - Mood selector, water intake
3. **Symptoms** - Chip buttons for quick selection
4. **Notes** - Optional text field

**Features:**
- Auto-save functionality
- Success toast notifications
- Clear error messages
- Form validation

### 📜 History (Protected)
**Browse past entries:**
- Lists last 30 entries
- Expandable rows showing full details
- Edit/Delete buttons
- Confirmation dialogs

### 📊 Weekly Report (Protected)
**AI-powered health insights:**
- Single button: "Generate Weekly Health Report"
- Loading state animation
- Graceful rate-limit error handling
- Readable paragraph format

### 🤖 AI Chat (Protected)
**Real-time conversation:**
- Chat bubbles with color distinction
- User vs AI message differentiation
- Typing indicator animation
- Disable input during rate limit
- Auto-scroll to latest message

## 🔒 Authentication & Security

### How It Works
1. User logs in → Backend returns `token` + `user` object
2. Token stored in `localStorage`
3. `AuthContext` manages authentication state
4. All API requests include token in `Authorization: Bearer <token>`
5. Expired token → Auto redirect to `/login`

### Protected Routes
```javascript
<PrivateRoute>
  <Dashboard />
</PrivateRoute>
```

Users without valid token are redirected to `/login`

## 🎨 Design System

### Color Palette
- **Primary**: `#007bff` (Blue)
- **Secondary**: `#6c757d` (Gray)
- **Danger**: `#dc3545` (Red)
- **Success**: `#28a745` (Green)

### Spacing Scale
- `--spacing-xs`: 4px
- `--spacing-sm`: 8px
- `--spacing-md`: 16px
- `--spacing-lg`: 24px
- `--spacing-xl`: 32px
- `--spacing-2xl`: 48px

### Typography
- **Headings**: 700 weight, increased size
- **Body**: 14px, line-height 1.6
- **Labels**: 14px, 500 weight

## 🔌 API Integration

### Axios Configuration
- Base URL: `http://localhost:3001/api`
- Auto token injection in all requests
- Automatic logout on 401 responses

### API Modules

**auth.api.js**
```javascript
authAPI.register(data)      // POST /auth/register
authAPI.login(data)         // POST /auth/login
authAPI.logout()            // Clear token
```

**entries.api.js**
```javascript
entriesAPI.getDashboardSummary()  // GET /entries/dashboard/summary
entriesAPI.getAll()               // GET /entries
entriesAPI.create(data)           // POST /entries
entriesAPI.update(id, data)       // PUT /entries/:id
entriesAPI.delete(id)             // DELETE /entries/:id
```

**ai.api.js**
```javascript
aiAPI.chat(message)               // POST /ai/chat
aiAPI.generateWeeklyReport()      // POST /ai/weekly-report
```

## 💡 AI Chat System Prompt

```
You are a professional, friendly health assistant.

Your role:
- Give supportive, non-medical advice
- Analyze health habits gently
- Encourage healthy routines
- Never provide diagnoses or medical treatment
- Keep responses concise and reassuring

Tone:
- Calm
- Motivational
- Human-like
- Non-judgmental

If user asks medical questions:
- Politely suggest consulting a healthcare professional
```

## 🧪 Error Handling

### ErrorBanner Component
- Auto-dismisses after 5 seconds
- Manual close button
- Displays API error messages clearly
- Never shows raw JSON

### Loader Component
- Smooth spinner animation
- Used during API calls
- Disables form inputs while loading

## 📱 Responsive Design

The app is fully responsive:
- **Desktop**: Sidebar on left, content on right
- **Tablet**: Horizontal sidebar, adjusted spacing
- **Mobile**: Sidebar collapses, content full width

## 🚦 Status Management

### Loading States
- Button disables with "..." text
- Inputs disabled during submission
- Full-page loader for critical operations

### Error States
- Error banners for recoverable errors
- Clear, user-friendly messages
- No raw API responses shown

### Success States
- Toast notifications
- Form resets
- Navigation to appropriate page

## 🔄 State Management

### AuthContext
```javascript
const { user, token, loading, login, logout, isAuthenticated } = useAuth();
```

- Persists to localStorage
- Manages authentication state
- Provides user context globally

## 🎯 Interview Talking Points

**Problem Statement:**
"I designed a modular, authenticated health tracking dashboard with a persistent layout similar to Notion or Slack."

**Architecture:**
"The frontend uses React with clear separation of concerns: API layer handles backend communication, Context manages authentication state, and components are reusable and composable."

**UX Design:**
"Each feature maps directly to a backend API. Protected routes ensure security. Error handling is graceful with user-friendly messages. The persistent sidebar creates a native app feel."

**Scalability:**
"The structure easily supports adding new features. New pages just connect to new API endpoints. Authentication is centralized via AuthContext."

**Production Ready:**
"The app includes proper error handling, loading states, validation, and responsive design. Environment configuration is external. The code is clean and well-organized."

## 📚 Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.21.0",
  "axios": "^1.6.5",
  "react-toastify": "^10.0.0"
}
```

## 🛠️ Development Tips

1. **Add a New Page**: Create file in `src/pages/`, add route in `App.jsx`
2. **Add API Endpoint**: Add method to relevant file in `src/api/`
3. **Reusable Component**: Create in `src/components/common/`
4. **Styling**: Add rules to appropriate CSS file in `src/styles/`
5. **Protected Feature**: Wrap with `<PrivateRoute>`

## 📖 Resources

- [React Router Docs](https://reactrouter.com/)
- [Axios Docs](https://axios-http.com/)
- [Vite Docs](https://vitejs.dev/)

---

**Built with ❤️ for interview success** 🚀
