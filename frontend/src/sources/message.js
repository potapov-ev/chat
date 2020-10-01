import { DEV_STAND } from "./stands";
import { axios } from "services";

const messageSource = {
  getAll: async config => axios.get(`${DEV_STAND}/message/all`, config),
  create: async data => axios.post(`${DEV_STAND}/message/create`, { data }),
  updateStatus: async data => axios.put(`${DEV_STAND}/message/updatestatus`, { data }),
  delete: async config => axios.delete(`${DEV_STAND}/message/delete`, config) 
};

export default messageSource;