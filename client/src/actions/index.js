import { AUTH_USER, AUTH_ERROR } from "./types";
import axios from "axios";
export const signup = (formProps, callback) => async (dispatch) => {
  console.log("sending request:", formProps);
  try {
    const response = await axios.post(
      "http://localhost:3090/signup",
      formProps
    );

    dispatch({ type: AUTH_USER, payload: response.data.token });
    // store in browser localstorage, so if a user refreshes the page we will read it from the localstorage
    // we will use this as the inital state in "index.js"
    localStorage.setItem("token", response.data.token);
    callback();
  } catch (err) {
    dispatch({ type: AUTH_ERROR, payload: "Email in use." });
  }
};

export const signin = (formProps, callback) => async (dispatch) => {
  console.log("sending request:", formProps);
  try {
    const response = await axios.post(
      "http://localhost:3090/signin",
      formProps
    );

    dispatch({ type: AUTH_USER, payload: response.data.token });
    // store in browser localstorage, so if a user refreshes the page we will read it from the localstorage
    // we will use this as the inital state in "index.js"
    localStorage.setItem("token", response.data.token);
    callback();
  } catch (err) {
    dispatch({ type: AUTH_ERROR, payload: "Invalid loggin credentials." });
  }
};

export const signout = () => {
  // clear the localstorage
  localStorage.removeItem("token");

  return {
    type: AUTH_USER,
    payload: "",
  };
};
