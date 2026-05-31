import Axios from "axios";
const axios = Axios.create({
  baseURL:"https://online-shop-11.onrender.com",
  withCredentials: true,
});
export default axios;
