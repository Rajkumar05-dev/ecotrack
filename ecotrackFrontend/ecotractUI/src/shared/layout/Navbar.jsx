import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { auth, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Brand */}
        <Link
          to="/"
          className="text-xl font-bold text-green-700 tracking-wide"
        >
          EcoTrack
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-6">
          {!auth && (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `text-sm font-medium ${
                    isActive
                      ? "text-green-700"
                      : "text-gray-600 hover:text-green-700"
                  }`
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="bg-green-600 text-white text-sm px-4 py-1.5 rounded-md hover:bg-green-700 transition"
              >
                Register
              </NavLink>
            </>
          )}

          {auth && (
            <>
              {auth.role === "ROLE_ADMIN" && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `text-sm font-medium px-3 py-1 rounded ${
                      isActive
                        ? "bg-green-100 text-green-700"
                        : "text-gray-600 hover:text-green-700"
                    }`
                  }
                >
                  Admin
                </NavLink>
              )}

              <button
                onClick={logout}
                className="text-sm font-medium text-red-600 hover:text-red-700 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
