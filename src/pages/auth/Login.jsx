import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../api/auth.api';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import ErrorBanner from '../../components/common/ErrorBanner';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Demo mode: Accept any email/password
    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.login({ email, password });
      login(response.data.user, response.data.token);
      navigate('/dashboard');
    } catch (err) {
      // Demo mode fallback - allow login for testing
      const demoUser = {
        id: '1',
        email: email,
        name: email.split('@')[0]
      };
      const demoToken = 'demo-token-' + Math.random().toString(36).substr(2, 9);
      
      const errorMessage = err.response?.data?.message || err.message || 'Login failed. Please try again.';
      
      if (err.message?.includes('ERR_NETWORK') || err.message?.includes('Failed to fetch') || err.code === 'ERR_NETWORK') {
        // Backend not running, use demo mode
        login(demoUser, demoToken);
        navigate('/dashboard');
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Welcome Back</h1>
        <p className="auth-subtitle">Sign in to your health tracker account</p>

        <ErrorBanner message={error} onClose={() => setError('')} />

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>

          <Button type="submit" fullWidth loading={loading}>
            Sign In
          </Button>
        </form>

        <p className="auth-link">
          Don't have an account? <a href="/register">Create one</a>
        </p>
      </div>
    </div>
  );
}
