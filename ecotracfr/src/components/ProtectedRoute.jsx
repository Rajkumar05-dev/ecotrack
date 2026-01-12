import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAuthToken } from '../services/api';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  // Check both user state and token existence
  const token = getAuthToken();
  const isReallyAuthenticated = isAuthenticated && token;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return isReallyAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
