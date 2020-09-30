import { DEV_STAND } from "./stands";
import { axios } from "services";

const dialogSource = {
  getAll: async ({ uid }) => axios.get(`${DEV_STAND}/dialog/all`, { uid }),
  create: async data => axios.post(`${DEV_STAND}/dialog/create`, { data }),
  delete: async dialogId => axios.post(`${DEV_STAND}/dialog/delete`, { dialogId })
};

export default dialogSource;