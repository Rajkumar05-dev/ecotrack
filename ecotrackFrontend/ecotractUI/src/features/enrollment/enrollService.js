import api from "../../services/api";

export const enrollWorkshop = (workshopId) =>
  api.post(`/enroll/${workshopId}`);
