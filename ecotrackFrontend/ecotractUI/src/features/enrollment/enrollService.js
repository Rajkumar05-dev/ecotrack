import api from "../../services/api";

export const enrollWorkshop = (workshopId) => {
  return api.post(`/enroll/${workshopId}`);
};
