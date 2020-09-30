import { DEV_STAND } from "./stands";
import { axios } from "services";
  console.log(111, axios)
const userSource = {
  getAll: async () => axios.get(`${DEV_STAND}/user/all`,{withCredentials: true}),
  signUp: async data => axios.post(`${DEV_STAND}/user/regis`, data), // todo signUp
  signIn: async data => axios.post(`${DEV_STAND}/user/login`, data, {withCredentials: true}),
};

export default userSource;