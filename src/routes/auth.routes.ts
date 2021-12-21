const host =
  process.env.REACT_APP_DEVENV === "1"
    ? "http://localhost:8081/api/scan-tickets/v1/auth"
    : "/api/scan-tickets/v1/users";

const routes = [
  {
    name: "login",
    route: `${host}/login`,
    method: "POST",
  },
];

export const getRoute = (name: string) => {
  const route = routes.filter((r) => r.name === name);
  return route[0].route;
};
