# Interview Preparation Guide

## 🎤 Opening Statement (30 seconds)

> "I built a professional health tracking dashboard using React and Vite. The app features persistent authentication with a protected dashboard where users can track daily health metrics, view historical data, and interact with an AI health assistant. The architecture uses React Context for state management, a modular API layer, and clear separation of concerns - all organized to be scalable and maintainable."

## 🔥 Common Interview Questions

### 1. "Walk me through your project structure"

**Answer:**
"The frontend is organized into clear layers:

- **api/** - Centralized API communication
  - axios.js handles all requests with token injection and 401 handling
  - Separate modules for auth, entries, and AI features
  - Easy to modify endpoints in one place

- **components/** - Reusable, focused components
  - layout/ for structural components (Sidebar, AppLayout)
  - common/ for reusable UI elements (Button, Loader, ErrorBanner)

- **pages/** - Feature pages
  - auth/ for login/register
  - Protected pages like Dashboard, History, etc.

- **context/** - Global state
  - AuthContext manages user, token, and authentication methods
  - Persists to localStorage for session recovery

- **routes/** - Route protection
  - PrivateRoute wraps protected features
  - PublicRoute prevents authenticated users from accessing login

- **styles/** - Modular CSS
  - Each module has its own stylesheet for easy maintenance

This structure makes it trivial to add new features - just add a new page, connect to an API endpoint, and add a route."

---

### 2. "How do you handle authentication?"

**Answer:**
"Authentication follows this flow:

1. **Login/Register:** User submits credentials to the backend
2. **Token Generation:** Backend returns JWT token + user object
3. **Storage:** Token stored in localStorage, user in AuthContext
4. **Request Injection:** axios interceptor adds `Authorization: Bearer {token}` to every request
5. **Token Expiration:** If backend returns 401, we clear localStorage, reset AuthContext, and redirect to /login
6. **Protected Routes:** PrivateRoute component checks `isAuthenticated` before rendering

The key is the AuthContext at the root level - it provides authentication state to the entire app via the useAuth() hook. This prevents prop drilling and makes authentication accessible everywhere."

---

### 3. "How is state managed?"

**Answer:**
"We use a combination of approaches:

1. **Global State:** AuthContext for authentication
   - Shared via useAuth() hook
   - Persists to localStorage for recovery

2. **Local Component State:** useState for form data and UI state
   - Loading states, error messages, form inputs
   - Scoped to the component that needs it

3. **API State:** Managed in components using useState
   - Loading states during API calls
   - Error handling with setError()

Why not Redux? The app doesn't need it yet. AuthContext is sufficient for global auth state, and component state handles the rest. If we needed to share data across pages (like a shopping cart), we'd add Context providers or Redux.

This approach keeps the app simple while remaining scalable."

---

### 4. "How do you handle errors?"

**Answer:**
"Error handling happens at multiple levels:

1. **API Layer** - axios interceptors
   - 401 → Auto logout and redirect to /login
   - Other errors → Propagate to component

2. **Component Level** - try/catch blocks
   ```javascript
   try {
     const response = await entriesAPI.create(data);
     // success
   } catch (err) {
     const message = err.response?.data?.message || 'Failed to save';
     setError(message);
   }
   ```

3. **UI Display** - ErrorBanner component
   - Shows error message
   - User can close it
   - Auto-dismisses after 5 seconds
   - Never shows raw JSON

4. **Form Validation**
   - Required field validation
   - Type checking (email, number)
   - Clear feedback

The key principle: show users friendly messages, never raw errors."

---

### 5. "Why separate the API layer?"

**Answer:**
"Separating API calls into dedicated modules has huge benefits:

1. **Single Responsibility:** Each module handles its domain
   - auth.api.js for login/register
   - entries.api.js for health data
   - ai.api.js for AI features

2. **Easy to Modify:** Change an endpoint once, everywhere uses it
   ```javascript
   // One place to change
   export const entriesAPI = {
     getAll: () => axiosInstance.get('/entries'),
   };
   ```

3. **Testing:** Easy to mock API calls in tests

4. **Scalability:** New endpoints follow same pattern

5. **Maintainability:** Backend changes? Update the API module, not 10 components

Without this, every component would have its own axios calls scattered throughout the codebase - a maintenance nightmare."

---

### 6. "How do you handle loading states?"

**Answer:**
"We use a simple pattern throughout:

```javascript
const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  
  try {
    await api.call();
    // success
  } finally {
    setLoading(false);
  }
};
```

Loading state disables:
- Form inputs
- Buttons (show "..." text)
- Select dropdowns

For full-page loads, we show a Loader component.

Why finally? Ensures loading resets even if an error occurs."

---

### 7. "Why React Context instead of Redux?"

**Answer:**
"Context is perfect for this app because:

1. **Simplicity** - No boilerplate
2. **Authentication is global** - Needs to be everywhere
3. **Limited shared state** - Only auth needs global scope
4. **Small team/solo project** - Redux adds complexity

Redux shines when:
- Multiple global states
- Complex state transitions
- Large team needs predictable patterns
- Time-travel debugging needed

For this project, Context + localStorage is cleaner. We could easily migrate to Redux later if needed."

---

### 8. "How do you make the sidebar persistent?"

**Answer:**
"The key is the AppLayout component structure:

```javascript
<App>
  <Router>
    <PrivateRoute>
      <AppLayout>  {/* Persistent */}
        <Sidebar /> {/* Never reloads */}
        <main>
          {/* Page content changes */}
        </main>
      </AppLayout>
    </PrivateRoute>
  </Router>
</App>
```

When user navigates:
1. AppLayout stays mounted
2. Sidebar stays mounted
3. Only the `<main>` content re-renders
4. Sidebar state persists across page changes

This creates a native app feeling, like Slack or Notion. If Sidebar was inside each page component, it would remount and reset every navigation."

---

### 9. "What would you add if you had more time?"

**Answer:**
"Great question! Here's my priority list:

**High Priority:**
1. **Input Validation** - Real-time validation feedback
2. **Unit Tests** - Components and API calls
3. **Loading Skeletons** - Better UX than plain spinners
4. **Pagination** - History page shows 30 items, might be slow
5. **Search/Filter** - Find entries by date or metric

**Medium Priority:**
1. **Caching** - Redux or React Query for data management
2. **Offline Support** - Service workers
3. **Notifications** - Toast for success messages
4. **Dark Mode** - CSS variables make this easy
5. **Charts** - Display trends over time

**Low Priority:**
1. **Export Data** - CSV/PDF export
2. **Notifications** - Browser notifications for reminders
3. **Analytics** - Track app usage
4. **Share Data** - Share entries with doctor

I'd focus on tests and validation first - foundational for a production app."

---

### 10. "How do you explain this in simple terms?"

**Answer:**
"Think of it like a real app:

1. **Login Page** - Gatekeeper. No one gets in without credentials.

2. **Persistent Sidebar** - Like the left menu in Gmail. Never reloads. Click different sections and the main content changes.

3. **Dashboard** - Your daily overview. Numbers and cards showing your health today.

4. **Add Entry** - A guided form to log your health metrics.

5. **History** - See everything you've logged. Click to expand and see details.

6. **Weekly Report** - Ask AI to summarize your week.

7. **AI Chat** - Talk to an assistant about your health.

**Behind the scenes:**
- Every page is protected - can't access without login
- All data comes from the backend API
- User stays logged in even after refresh (localStorage)
- Errors show friendly messages

That's it! Simple concept, professional execution."

---

## 💼 Projects to Highlight

### 1. **Authentication System**
- Token-based with JWT
- Persistent sessions (localStorage)
- Automatic logout on expiration
- Protected routes

### 2. **Persistent Layout**
- Sidebar never reloads
- Only content area changes
- Like production apps (Notion, Slack)

### 3. **API Integration**
- Modular API layer
- Automatic token injection
- Centralized error handling
- Easy to test and modify

### 4. **User Experience**
- Loading states
- Error messages
- Form validation
- Responsive design

### 5. **Code Organization**
- Clear folder structure
- Separation of concerns
- Reusable components
- Easy to scale

---

## 🎯 Talking About Trade-offs

When asked about design decisions:

**"I chose X because..."**

1. **React Context over Redux**
   - "For this app's state needs, Context is simpler and sufficient. Redux adds boilerplate we don't need."

2. **Vite over Create React App**
   - "Faster build times, better DX, and it's the modern standard in 2024."

3. **CSS Modules approach**
   - "Component-scoped styles prevent conflicts. Tailwind would be faster but this shows CSS mastery."

4. **localStorage for token**
   - "Simple and works for this phase. In production, httpOnly cookies are more secure."

5. **No query library (React Query)**
   - "For this scale, axios + useState is fine. React Query adds value with caching and sync."

---

## ❌ What NOT to Say

- ❌ "I'm not sure how it works"
- ❌ "I copied this from Stack Overflow"
- ❌ "This could be refactored..." (unless asked)
- ❌ "I didn't have time to..." (own your choices)
- ❌ "This is enterprise code" (it's not, don't oversell)

---

## ✅ Strong Closing Statements

> "This project shows I can build a production-quality frontend - organized code, proper error handling, security (authentication), and user experience. I made intentional design choices and understand the tradeoffs."

> "The modular architecture means adding features is straightforward - want a new page? Create a component, add an API call, add a route. It's scalable."

> "I focused on what matters for real apps: authentication, error handling, loading states, and responsive design - not just happy path coding."

---

## 📊 Technical Depth Questions

### Q: "How would you optimize performance?"

**A:**
- Code splitting with React.lazy()
- Memoization for heavy components
- Virtual scrolling for long lists (History page)
- Image optimization
- CSS-in-JS evaluation

### Q: "How would you add testing?"

**A:**
```javascript
// Component test with vitest/react-testing-library
import { render, screen } from '@testing-library/react';
import Button from './Button';

test('button shows loading state', () => {
  render(<Button loading>Submit</Button>);
  expect(screen.getByText('...')).toBeInTheDocument();
});
```

### Q: "What about security?"

**A:**
- HTTPS for all API calls
- httpOnly cookies instead of localStorage (for production)
- CSRF protection on backend
- Input sanitization
- Never log sensitive data
- Content Security Policy headers

### Q: "How would you handle real-time updates?"

**A:**
- WebSockets for live chat
- Server-Sent Events for notifications
- Polling as fallback
- Redux/Context for state sync

---

## 🏆 Final Tips

1. **Be Confident** - Own your code, your choices
2. **Be Honest** - Say "I don't know" if you don't
3. **Show Growth** - Explain what you'd do differently
4. **Code Well** - This project shows clean, professional code
5. **Explain Clearly** - Assume interviewer knows React basics

---

Good luck! 🚀
