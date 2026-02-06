import api from "../../services/api";

export const getWorkshops = () => api.get("/workshops");
export const getWorkshop = (id) => api.get(`/workshops/${id}`);
