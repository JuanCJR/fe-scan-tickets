const host =
  process.env.REACT_APP_DEVENV === "1"
    ? "http://localhost:8081/api/scan-tickets/v1/auth"
    : "/api/scan-tickets/v1/auth";

const routes = [
  {
    name: "login",
    route: `${host}/login`,
    method: "POST",
  },
  {
    name: "refresh",
    route: `${host}/refresh`,
    method: "POST",
  },
  {
    name: "validate",
    route: `${host}/validate`,
    method: "POST",
  },
];

export const getRoute = (name: string) => {
  const route = routes.filter((r) => r.name === name);
  return route[0].route;
};
