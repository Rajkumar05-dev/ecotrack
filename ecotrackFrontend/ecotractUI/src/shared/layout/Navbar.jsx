import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { auth, logout } = useAuth();

  return (
    <nav className="bg-white shadow px-6 py-3 flex justify-between">
      <Link to="/" className="font-semibold text-primary">
        EcoTrack
      </Link>

      <div className="flex gap-4 items-center">
        {!auth && <Link to="/login">Login</Link>}

        {auth && (
          <>
            {auth.role === "ROLE_ADMIN" && (
              <Link to="/admin">Admin</Link>
            )}
            <button onClick={logout} className="text-red-600">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
