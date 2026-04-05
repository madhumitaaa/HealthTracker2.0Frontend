import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../common/Button";
import "../../styles/Sidebar.css";

export default function Sidebar({ isOpen, toggle }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();

  const menuItems = [
    { label: "Dashboard", path: "/dashboard", icon: "📊" },
    { label: "Add Entry", path: "/add-entry", icon: "✏️" },
    { label: "History", path: "/history", icon: "📋" },
    { label: "Weekly Report", path: "/weekly-report", icon: "📈" },
    { label: "AI Chat", path: "/ai-chat", icon: "🤖" },
    { label: "Daily Routine", path: "/daily-routine", icon: "🍽️" },
    { label: "Night Review", path: "/night-review", icon: "🌙" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const isActiveRoute = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    if (location.pathname !== path) navigate(path);
    if (isOpen) toggle();
  };

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={toggle}></div>}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h1>HealthTrack</h1>
          <p className="user-email">{user?.email}</p>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`nav-item ${isActiveRoute(item.path) ? "active" : ""}`}
            >
              <span className="icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <Button onClick={handleLogout} variant="danger" fullWidth>
            🚪 Logout
          </Button>
        </div>
      </aside>
    </>
  );
}