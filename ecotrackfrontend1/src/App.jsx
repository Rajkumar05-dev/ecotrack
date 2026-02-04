import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import WorkshopList from './pages/WorkshopList';
import WorkshopDetails from './pages/WorkshopDetails';
import WorkshopForm from './pages/WorkshopForm';
import RecycleRequests from './pages/RecycleRequests';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<ProtectedRoute><WorkshopList /></ProtectedRoute>} />
                <Route path="/workshops/:id" element={<ProtectedRoute><WorkshopDetails /></ProtectedRoute>} />
                <Route path="/workshops/create" element={<ProtectedRoute roles={['ROLE_ADMIN']}><WorkshopForm /></ProtectedRoute>} />
                <Route path="/workshops/edit/:id" element={<ProtectedRoute roles={['ROLE_ADMIN']}><WorkshopForm /></ProtectedRoute>} />
                <Route path="/recycle-requests" element={<ProtectedRoute roles={['ROLE_ADMIN']}><RecycleRequests /></ProtectedRoute>} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
