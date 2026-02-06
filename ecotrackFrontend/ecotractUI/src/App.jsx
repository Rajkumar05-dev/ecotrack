import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./shared/layout/Navbar";
import AppRoutes from "./routes";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
