import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 App reload hone par token se user restore
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      setAuth(JSON.parse(user));
    }

    setLoading(false);
  }, []);

  // 🔹 LOGIN
  const login = (data) => {
    /*
      backend response example:
      {
        token: "eyJhbGciOi...",
        username: "raj122@gmail.com",
        role: "ROLE_USER"
      }
    */

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data));

    setAuth(data);
  };

  // 🔹 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 🔹 Custom hook
export const useAuth = () => useContext(AuthContext);
