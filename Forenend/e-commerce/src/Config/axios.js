import Axios from "axios";
const axios = Axios.create({
  baseURL:"https://backenapi-ne3o.onrender.com",
  withCredentials: true,
});
export default axios;
