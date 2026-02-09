import api from "../../services/api";

export const loginUser = (data) => {
  return api.post("/auth/login", data);   // ✅ login
};

export const registerUser = (data) => {
  return api.post("/users/register", data); // ✅ register
};
