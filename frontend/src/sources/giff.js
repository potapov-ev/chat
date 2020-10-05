import { axiosService } from "services";
const URL = "https://api.giphy.com/v1/gifs/search";
const _payload = {
  api_key: 'ln9tgm0RCZiGOcD5D6Gm3Wr8JYXLq4Zh',
  limit: 16,
  // G : Содержание, которое подходит для всех возрастов и людей.
  // PG : Чуть развращеннее 
  // PG-13 : Жестче
  // Р : Хард
  rating: "PG-13",
  lang: "ru"
};

const config = {
  withCredentials: false
};

const giffSource = {
  get: payload => axiosService.get(URL,
    {
      ..._payload, ...payload
    },
    config
  ),
};

export default giffSource;