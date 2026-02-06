import { Routes, Route } from "react-router-dom";

import Login from "./features/auth/Login";
import Register from "./features/auth/Register";

import ProtectedRoute from "./shared/layout/ProtectedRoute";

function Home() {
  return <div className="p-6">Home</div>;
}

function AdminDashboard() {
  return <div className="p-6">Admin Dashboard</div>;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="ROLE_ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
