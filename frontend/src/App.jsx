import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/public/Home';
import Workshops from './pages/public/Workshops';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import UserDashboard from './pages/user/UserDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminWorkshops from './pages/admin/AdminWorkshops';
import AdminWorkshopForm from './pages/admin/AdminWorkshopForm';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto p-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User Routes */}
          <Route element={<ProtectedRoute allowedRoles={['ROLE_USER', 'ROLE_ADMIN']} />}>
            <Route path="/user/dashboard" element={<UserDashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['ROLE_ADMIN']} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/workshops" element={<AdminWorkshops />} />
            <Route path="/admin/workshops/create" element={<AdminWorkshopForm />} />
            <Route path="/admin/workshops/edit/:id" element={<AdminWorkshopForm />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
