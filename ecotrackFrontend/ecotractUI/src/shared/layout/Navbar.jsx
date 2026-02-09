import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center px-6 py-3 border-b">
      <h1 className="text-xl font-bold text-green-700">EcoTrack</h1>

      <div className="space-x-4">
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link
              to="/register"
              className="bg-green-600 text-white px-4 py-1 rounded"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="text-sm font-medium">
              {user.name}
            </span>

            <button
              onClick={logout}
              className="text-red-600 font-semibold"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
