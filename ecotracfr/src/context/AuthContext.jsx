import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, getUser } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = getUser();
    const token = localStorage.getItem('token');
    
    // Only set user if both token and user data exist
    if (storedUser && token) {
      setUser(storedUser);
    } else {
      // Clear any invalid state
      setUser(null);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login(email, password);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.userDto));
      setUser(response.userDto);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      await authAPI.register(userData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  // Function to clear auth data (used when token is invalid)
  const clearAuth = () => {
    logout();
  };

  const value = {
    user,
    login,
    register,
    logout,
    clearAuth,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ADMIN' || user?.role === 'admin',
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
