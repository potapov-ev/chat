import { axiosService } from "services";

const dialogSource = {
  getAll: payload => axiosService.get("/dialog/all", payload),
  create: payload => axiosService.post("/dialog/create", { data: payload}),
  delete: payload => axiosService.delete("/dialog/delete", payload)
};

export default dialogSource;