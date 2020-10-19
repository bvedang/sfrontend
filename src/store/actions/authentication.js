import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authenticationSuccess = (token) => {
  return {
    type: actionTypes.AUTHENTICATION_SUCCESS,
    token: token,
  };
};

export const authenticationFailed = () => {
  return {
    type: actionTypes.AUTHENTICATION_FAILED,
  };
};

export const authenticationInit = (user) => {
  return (dispatch) => {
    axios({
      method: "POST",
      url: "/api/login",
      headers: {},
      data: {
        email: user.email,
        password: +user.password,
      },
    })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", "Bearer " + response.data.access_token);
        dispatch(authenticationSuccess(localStorage.getItem("token")));
      })
      .catch((error) => {
        console.log(error);
        dispatch(authenticationFailed());
      });
  };
};

export const authenticationLogout = () => {
  localStorage.removeItem("token");
  localStorage.setItem("path","/dashboard");
  return {
    type: actionTypes.AUTHENTICATION_LOGOUT,
  };
};

export const authCheckStatus = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(authenticationLogout());
    } else {
      dispatch(authenticationSuccess(token));
    }
  };
};
