import { createContext, useContext, useEffect, useState } from 'react';
import { authAPI } from '../api/auth.api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ INIT AUTH STATE
  useEffect(() => {
    try {
      const storedAccessToken = localStorage.getItem('accessToken');
      const storedRefreshToken = localStorage.getItem('refreshToken');
      const storedUser = localStorage.getItem('user');

      if (storedAccessToken) {
        setAccessToken(storedAccessToken);
        setRefreshToken(storedRefreshToken);

        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
          } catch {
            console.warn("⚠️ Corrupted user in localStorage, resetting");
            localStorage.removeItem('user');
          }
        }
      }
    } catch (err) {
      console.error('Auth init error:', err);

      // ❌ corrupted storage → clean reset
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ LOGIN
  const login = (userData, accessToken, refreshToken) => {
    if (!accessToken) {
      console.error('❌ Login failed: No access token provided');
      return;
    }

    // 🔥 fallback if user missing (important for your case)
    const safeUser = userData || { email: 'unknown' };

    setUser(safeUser);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken || null);

    localStorage.setItem('accessToken', accessToken);

    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }

    localStorage.setItem('user', JSON.stringify(safeUser));
  };

  // ✅ REFRESH TOKEN
  const refreshAccessToken = async () => {
    if (!refreshToken) return false;

    try {
      const res = await authAPI.refresh(refreshToken);

      const newAccessToken = res?.accessToken;
      const newRefreshToken = res?.refreshToken;

      if (!newAccessToken) {
        throw new Error("No new access token");
      }

      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken || refreshToken);

      localStorage.setItem('accessToken', newAccessToken);

      if (newRefreshToken) {
        localStorage.setItem('refreshToken', newRefreshToken);
      }

      return true;
    } catch (err) {
      console.error('❌ Token refresh failed:', err);
      logout();
      return false;
    }
  };

  // ✅ LOGOUT
  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (err) {
      console.warn('Logout API error (ignored):', err);
    }

    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  };

  // 🔥 FIXED AUTH CHECK
  const isAuthenticated = !!accessToken && !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        loading,
        login,
        logout,
        refreshAccessToken,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ CUSTOM HOOK (stable, no HMR issues)
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};