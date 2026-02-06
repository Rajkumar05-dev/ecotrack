import api from "../../services/api";

export const loginUser = (credentials) => {
  return api.post("/auth/login", credentials);
};

export const registerUser = (userData) => {
  return api.post("/users/register", userData);
};
