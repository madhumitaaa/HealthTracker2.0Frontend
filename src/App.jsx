import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoute, PublicRoute } from './routes/PrivateRoute';
import AppLayout from './components/layout/AppLayout';

// Auth pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// App pages
import Dashboard from './pages/Dashboard';
import AddEntry from './pages/AddEntry';
import History from './pages/History';
import WeeklyReport from './pages/WeeklyReport';
import AIChat from './pages/AIChat';
import DailyRoutine from "./pages/Routine";
import NightReview from "./pages/NightReview";

// Landing page
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>

          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/add-entry"
            element={
              <PrivateRoute>
                <AppLayout>
                  <AddEntry />
                </AppLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/add-entry/:entryId"
            element={
              <PrivateRoute>
                <AppLayout>
                  <AddEntry />
                </AppLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/history"
            element={
              <PrivateRoute>
                <AppLayout>
                  <History />
                </AppLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/ai-chat"
            element={
              <PrivateRoute>
                <AppLayout>
                  <AIChat />
                </AppLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/daily-routine"
            element={
              <PrivateRoute>
                <AppLayout>
                  <DailyRoutine />
                </AppLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/night-review"
            element={
              <PrivateRoute>
                <AppLayout>
                  <NightReview />
                </AppLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/weekly-report"
            element={
              <PrivateRoute>
                <AppLayout>
                  <WeeklyReport />
                </AppLayout>
              </PrivateRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;