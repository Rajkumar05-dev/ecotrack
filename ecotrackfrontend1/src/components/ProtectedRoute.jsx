import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, roles = [] }) => {
  const { currentUser, loading } = useAuth();

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  if (!currentUser) return <Navigate to="/login" />;

  if (roles.length > 0 && !roles.includes(currentUser.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;