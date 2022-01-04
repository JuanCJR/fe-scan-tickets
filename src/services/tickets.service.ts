import axios from "axios";
import { Ticket } from "../interfaces/Ticket";

import { getRoute } from "../routes/tickets.routes";

export const getTickets = async () => {
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

export const getTicket = async (id: string | undefined) => {
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

export const createTicket = async (payload: Ticket) => {
  const token = sessionStorage.getItem("access_token");
  const userId = sessionStorage.getItem("sub");

  const result = await axios({
    method: "post",
    url: getRoute("create"),
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      state: payload.state,
      payMethod: payload.payMethod,
      sector: payload.sector,
      date: payload.date,
      purchaseDate: payload.purchaseDate,
      price: payload.price,
      quantity: payload.quantity,
      userId: userId,
      customerId: payload.customerId,
    },
  });

  return result.data;
};

export const getGroupedBySector = async () => {
  const token = sessionStorage.getItem("access_token");

  const result = await axios({
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    url: getRoute("findGroupedBySector"),
  });
  return result.data;
};
