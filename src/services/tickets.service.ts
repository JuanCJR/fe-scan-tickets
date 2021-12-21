import axios from "axios";
import { Ticket } from "../interfaces/Ticket";

import { getRoute } from "../routes/tickets.routes";

export const getTickets = async (token: string) => {
  const result = await axios.get(getRoute("find"));
  return result.data;
};

export const getTicket = async (id: number, token: string) => {
  const result = await axios.get(getRoute("find"));
  return result.data;
};

export const createTicket = async (payload: Ticket, token: string) => {
  const result = await axios.post(getRoute("create"), {
    state: payload.state,
    payMethod: payload.payMethod,
    sector: payload.sector,
    date: payload.date,
    purchaseDate: payload.purchaseDate,
    price: payload.price,
    quantity: payload.quantity,
    userId: payload.userId,
    customerId: payload.customerId,
  });

  return result.data;
};
