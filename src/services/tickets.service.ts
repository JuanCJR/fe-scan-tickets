import axios from "axios";
import { Ticket } from "../interfaces/Ticket";

import { getRoute } from "../routes/tickets.routes";

export const getTickets = async (token: string) => {
  const result = await axios.get(getRoute("find"));
  return result.data;
};

export const getTicket = async (id: number) => {
  const result = await axios.get(getRoute("find"));
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
