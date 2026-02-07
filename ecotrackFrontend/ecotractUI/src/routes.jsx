import { Routes, Route } from "react-router-dom";

import Login from "./features/auth/Login";
import Register from "./features/auth/Register";

import ProtectedRoute from "./shared/layout/ProtectedRoute";
import WorkshopList from "./features/workshops/WorkshopList";
import WorkshopDetails from "./features/workshops/WorkshopDetails";
import Home from "./pages/Home";



function AdminDashboard() {
  return <div className="p-6">Admin Dashboard</div>;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/workshops" element={<WorkshopList />} />
<Route path="/workshops/:id" element={<WorkshopDetails />} />

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
