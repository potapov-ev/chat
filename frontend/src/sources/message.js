import { DEV_STAND } from "./stands";
import { axios } from "services";

const userSource = {
  signUp: async data => axios.post(`${DEV_STAND}/user/regis`, data),
  signIn: async data => axios.post(`${DEV_STAND}/user/login`, data)
};

export default userSource;