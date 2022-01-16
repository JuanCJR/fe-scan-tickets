import axios from "axios";
import { NewTicketProps } from "../interfaces/request/Ticket";

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

export const createTicket = async (payload: NewTicketProps) => {
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
      quantity: payload.quantity,
      userId: userId,
      customerId: payload.customerId,
      ticketTypeId: payload.ticketTypeId,
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
