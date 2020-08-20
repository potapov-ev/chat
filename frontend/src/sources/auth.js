import axios from 'axios';
import { TEST_STAND } from "./stands";

export default {
  signIn: data => axios.post(`${TEST_STAND}/login`, data), // todo для passport необходим id
};