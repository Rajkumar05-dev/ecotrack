import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../shared/layout/ProtectedRoute";

import Login from "../features/auth/Login";
import Register from "../features/auth/Register";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<div className="p-6">Home</div>} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="ROLE_ADMIN">
            <div className="p-6">Admin Dashboard</div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
