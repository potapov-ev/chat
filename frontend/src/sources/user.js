import { axiosService } from "services";

const userSource = {
  getAll: async () => axiosService.get("/user/all"),
  signUp: async payload => axiosService.post("/user/regis", payload), // todo signUp
  signIn: payload => axiosService.post("/user/login", payload),
};

export default userSource;