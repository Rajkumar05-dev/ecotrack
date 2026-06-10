import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Workshops from './pages/Workshops';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Authentication Context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore authentication session from localStorage
    const savedToken = localStorage.getItem('ecotrack_token');
    const savedUser = localStorage.getItem('ecotrack_user');

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const loginSession = (tokenVal, userVal) => {
    localStorage.setItem('ecotrack_token', tokenVal);
    localStorage.setItem('ecotrack_user', JSON.stringify(userVal));
    setToken(tokenVal);
    setUser(userVal);
  };

  const logoutSession = () => {
    localStorage.removeItem('ecotrack_token');
    localStorage.removeItem('ecotrack_user');
    setToken(null);
    setUser(null);
  };

  const updateCurrentUser = (updatedUser) => {
    localStorage.setItem('ecotrack_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, loginSession, logoutSession, updateCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// Guard route for authenticated users
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#9bbbb0' }}>
        <h3>Loading Session...</h3>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles) {
    const roleString = user.role?.appRole || '';
    const hasRole = allowedRoles.some(role => roleString.includes(role));
    if (!hasRole) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Authenticated Dashboard */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Workshops (accessible to all, but actions might require auth) */}
              <Route path="/workshops" element={<Workshops />} />
              
              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
