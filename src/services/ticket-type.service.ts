import axios from "axios";

import { getRoute } from "../routes/events.routes";

export const getTicketsType = async () => {
  const token = sessionStorage.getItem("access_token");

  const result = await axios({
    method: "get",
    url: getRoute("find"),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return result.data;
};

export const getTickeType = async (id: number, token: string) => {
  const result = await axios.get(`${getRoute("find")}/${id}`);
  return result.data;
};

export const getTickesTypeByEvent = async (eventId: number) => {
  const token = sessionStorage.getItem("access_token");

  const result = await axios({
    method: "get",
    url: `${getRoute("findByEvent")}/${eventId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return result.data;
};

// export const createCostumer = async (payload: Customer) => {
//   try {
//     const token = sessionStorage.getItem("access_token");
//     const user = await axios({
//       method: "get",
//       url: `${getRoute("exists")}/${payload.rut}`,
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!user.data) {
//       const result = await axios({
//         method: "post",
//         url: getRoute("create"),
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         data: {
//           email: payload.email,
//           firstName: payload.firstName,
//           lastName: payload.lastName,
//           rut: payload.rut,
//           phone: payload.phone,
//           birthday: payload.birthday,
//         },
//       });
//       return result.data;
//     } else {
//       return user.data;
//     }
//   } catch (e: any) {
//     if (e.response) {
//       Request made and server responded
//       return {
//         ...e.response.data,
//       };
//     } else if (e.request) {
//       The request was made but no response was received
//       console.log(e.request);
//     } else {
//       Something happened in setting up the request that triggered an Error
//       console.log("Error", e.message);
//     }
//   }
// };
