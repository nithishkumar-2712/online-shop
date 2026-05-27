import Axios from "axios";
const axios = Axios.create({
  baseURL: "http://10.131.211.250:4000",
  withCredentials: true,
});
export default axios;
