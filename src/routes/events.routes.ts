const host =
  process.env.REACT_APP_DEVENV === "1"
    ? "http://localhost:8081/api/scan-tickets/v1/events"
    : "/api/scan-tickets/v1/events";

const routes = [
  {
    name: "find",
    route: `${host}`,
    method: "GET",
  },
  {
    name: "findOne",
    route: `${host}`,
    method: "GET",
  },
  {
    name: "create",
    route: `${host}`,
    method: "POST",
  },
  {
    name: "update",
    route: `${host}`,
    method: "PUT",
  },
  {
    name: "delete",
    route: `${host}`,
    method: "DELETE",
  },
];

export const getRoute = (name: string) => {
  const route = routes.filter((r) => r.name === name);
  return route[0].route;
};
