import { LOGIN, SAVE_PROFILE, LOGOUT } from "./actionTypes";
import { restAPI } from "../../config/axiosConfig";

const saveToken = (token) => {
  return {
    type: LOGIN,
    token,
  };
};

export const login = (email, password) => {
  return (dispatch) => {
    return restAPI
      .post("/auth/login", {
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        return dispatch(saveToken(response.data.token));
      });
  };
};

export const signUp = (email, password) => {
  return (dispatch) => {
    return restAPI
      .post("auth/signup", {
        email,
        password,
      })
      .then((response) => {
         localStorage.setItem("token", response.data.token);
         return dispatch(saveToken(response.data.token));
      });
  };
};

const saveProfile = (profile) => {
  return {
    type: SAVE_PROFILE,
    profile,
  };
};

export const getProfile = () => {
  return (dispatch) => {
    return restAPI.get("/users/me").then((response) => {
      return dispatch(saveProfile(response.data));
    });
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  return {
    type: LOGOUT,
  };
};
