import { DEV_STAND } from "./stands";
import { axios } from "services";

const dialogSource = {
  getAll: async config => axios.get(`${DEV_STAND}/dialog/all`, config),
  create: async data => axios.post(`${DEV_STAND}/dialog/create`, { data }),
  delete: async config => axios.delete(`${DEV_STAND}/dialog/delete`, config) // todo config: { data: {} }
};

export default dialogSource;