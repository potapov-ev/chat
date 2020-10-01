import { axios } from "services";
const URL = "https://api.giphy.com/v1/gifs/search";
const params = {
  api_key: 'ln9tgm0RCZiGOcD5D6Gm3Wr8JYXLq4Zh',
  limit: 16,
  // G : Содержание, которое подходит для всех возрастов и людей.
  // PG : Чуть развращеннее 
  // PG-13 : Жестче
  // Р : Хард
  rating: "PG-13",
  lang: "ru"
};

const giffSource = {
  get: async config => axios.get(URL, { params: { ...params, ...config.params }}),
};

export default giffSource;