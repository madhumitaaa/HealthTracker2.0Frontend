import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const menuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: '📊' },
    { label: 'Add Entry', path: '/add-entry', icon: '✏️' },
    { label: 'History', path: '/history', icon: '📋' },
    { label: 'Weekly Report', path: '/weekly-report', icon: '📈' },
    { label: 'AI Chat', path: '/ai-chat', icon: '🤖' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>HealthTrack</h1>
        <p className="user-email">{user?.email}</p>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="nav-item"
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <Button 
          onClick={handleLogout} 
          variant="danger" 
          fullWidth
        >
          🚪 Logout
        </Button>
      </div>
    </aside>
  );
}
