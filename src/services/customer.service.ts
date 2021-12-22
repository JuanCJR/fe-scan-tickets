import axios from "axios";

import { Customer } from "../interfaces/Customer";
import { getRoute } from "../routes/customers.routes";

export const getCostumers = async (token: string) => {
  const result = await axios.get(getRoute("find"));
  return result.data;
};

export const getCostumer = async (id: number, token: string) => {
  const result = await axios.get(`${getRoute("find")}/${id}`);
  return result.data;
};

export const getCostumerByRut = async (rut: number) => {
  const token = sessionStorage.getItem("access_token");
  const result = await axios({
    method: "get",
    url: `${getRoute("exists")}/${rut}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return result.data;
};

export const createCostumer = async (payload: Customer) => {
  try {
    const token = sessionStorage.getItem("access_token");
    const user = await axios({
      method: "get",
      url: `${getRoute("exists")}/${payload.rut}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!user.data) {
      const result = await axios({
        method: "post",
        url: getRoute("create"),
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          email: payload.email,
          firstName: payload.firstName,
          lastName: payload.lastName,
          rut: payload.rut,
          phone: payload.phone,
          birthday: payload.birthday,
        },
      });
      return result.data;
    } else {
      return user.data;
    }
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
