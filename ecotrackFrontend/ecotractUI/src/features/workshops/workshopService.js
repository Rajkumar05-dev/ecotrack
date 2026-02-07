import api from "../../services/api";

export const getAllWorkshops = () => api.get("/workshops");

export const getWorkshopById = (id) =>
  api.get(`/workshops/${id}`);
