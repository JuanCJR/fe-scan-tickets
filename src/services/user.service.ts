import axios from "axios";

import { User } from "../interfaces/User";
import { getRoute } from "../routes/users.routes";

export const getUsers = async () => {
  const token = sessionStorage.getItem("access_token");
  const result = await axios({
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    url: getRoute("find"),
  });
  return result.data;
};

export const getUser = async (id: number | string) => {
  const token = sessionStorage.getItem("access_token");
  const result = await axios({
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    url: `${getRoute("find")}/${id}`,
  });
  return result.data;
};

export const createUser = async (payload: User) => {
  try {
    const token = sessionStorage.getItem("access_token");
    const result = await axios({
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: getRoute("create"),
      data: {
        email: payload.email,
        password: payload.password,
        role: payload.role,
      },
    });
    return result.data;
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
