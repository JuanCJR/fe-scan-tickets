import axios from "axios";

import { getRoute } from "../routes/auth.routes";
import { Login } from "../interfaces/Login";

export const doLogin = async (payload: Login) => {
  try {
    const result = await axios.post(getRoute("login"), { ...payload });
    return result;
  } catch (e: any) {
    if (e.response) {
      // Request made and server responded
      return {
        ...e.response.data,
      };
    } else if (e.request) {
      // The request was made but no response was received
      console.log(e.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", e.message);
    }
  }
};

export const refreshToken = async () => {
  try {
    const token = sessionStorage.getItem("access_token");
    const result = await axios({
      method: "post",
      url: getRoute("refresh"),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  } catch (e: any) {
    if (e.response) {
      // Request made and server responded
      return {
        ...e.response.data,
      };
    } else if (e.request) {
      // The request was made but no response was received
      console.log(e.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", e.message);
    }
  }
};

export const validateUser = async () => {
  try {
    const token = sessionStorage.getItem("access_token");
    const result = await axios({
      method: "post",
      url: getRoute("validate"),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  } catch (e: any) {
    if (e.response) {
      // Request made and server responded
      return {
        ...e.response.data,
      };
    } else if (e.request) {
      // The request was made but no response was received
      console.log(e.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", e.message);
    }
  }
};
