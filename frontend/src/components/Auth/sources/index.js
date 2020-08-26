import { DEV_STAND } from "./url";
import axios from "axios";

export const authSource = {
  signUp: async data => axios.post(`${DEV_STAND}/auth/regis`, data),
  signIn: async data => axios.post(`${DEV_STAND}/auth/login`, data)
};