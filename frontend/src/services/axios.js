import _axios from "axios";

class AxiosService {
  config = {
    withCredentials: true,
  };
  
  get = async (url, config) => {
    return await _axios.get(url, { ...this.config, ...config });
  };

  post = async (url, params, config) => {
    return await _axios.post(url, params, { ...this.config, ...config });
  };

  put = async (url, params, config) => {
    return await _axios.put(url, params, { ...this.config, ...config });
  };

  delete = async (url, config) => {
    return await _axios.delete(url, { ...this.config, ...config });
  };
};

const axios = new AxiosService();

export default axios;