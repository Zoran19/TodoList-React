import axios from "axios";
import { logout } from "../store/actions";
import { store } from "../store/store";


const restAPI = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});



restAPI.interceptors.request.use(function (config) {
  config.headers.common = {
    ...config.headers.common,
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  return config;
});



restAPI.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response?.status === 401) {
      store.dispatch(logout());
      console.log("UNAUTHORIZE");
    }
    return Promise.reject(error);
  }
);

export { restAPI };
