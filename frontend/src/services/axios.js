import axios from "axios";

const TYPE_GET = "get";
const TYPE_POST = "post";
const TYPE_PUT = "put";
const TYPE_DELETE = "delete";

class AxiosService {
  constructor() {
    this.axios = axios.create({
      baseURL: 'http://localhost:8989',
      withCredentials: true,
    });
    /* this.axios.interceptors.request.use(function (config) {
      console.log("axios.interceptors", config);
      return config;
    }, function (error) {
      console.log("axios.interceptors", error);
      return Promise.reject(error);
    }); */
  }

  get = (url, payload, config) => (
    new Promise((resolve, reject) => {
      this.request(TYPE_GET, url, payload, config)
        .then(resolve)
        .catch(reject)
    })
  );

  post = (url, payload, config) => (
    new Promise((resolve, reject) => {
      this.request(TYPE_POST, url, payload, config)
        .then(resolve)
        .catch(reject)
    })
  );

  put = (url, payload, config) => (
    new Promise((resolve, reject) => {
      this.request(TYPE_PUT, url, payload, config)
        .then(resolve)
        .catch(reject)
    })
  );

  delete = (url, payload, config) => (
    new Promise((resolve, reject) => {
      this.request(TYPE_DELETE, url, payload, config)
        .then(resolve)
        .catch(reject)
    })
  );

  request = (methodType, url, payload, config = {}) => (
    new Promise((resolve, reject) => {
      this.axios({
        url: url,
        method: methodType,
        [methodType === TYPE_GET
          ? "params"
          : "data"
        ]: payload,
        ...config
      })
        .then(resolve)
        .catch(reject)
    })
  );
}

const axiosService = new AxiosService();

export default axiosService;