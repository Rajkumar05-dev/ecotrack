import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Workshops from './pages/Workshops';
import WorkshopDetail from './pages/WorkshopDetail';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminWorkshops from './pages/admin/AdminWorkshops';
import MyEnrollments from './pages/MyEnrollments';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/workshops"
                element={
                  <ProtectedRoute>
                    <Workshops />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/enrollments"
                element={
                  <ProtectedRoute>
                    <MyEnrollments />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/workshops/:id"
                element={
                  <ProtectedRoute>
                    <WorkshopDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/workshops"
                element={
                  <AdminRoute>
                    <AdminWorkshops />
                  </AdminRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
