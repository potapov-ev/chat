import { axiosService } from "services";

const messageSource = {
  getAll: payload => axiosService.get("/message/all", payload),
  create: payload => axiosService.post("/message/create", { data: payload }),
  updateStatus: payload => axiosService.put("/message/updatestatus", payload),
  delete: payload => axiosService.delete("/message/delete", payload) 
};

export default messageSource;