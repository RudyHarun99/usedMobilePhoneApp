import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/welcome.tsx"),
  route("/dashboard", "./components/dashboard/layout.tsx", [
    route("phones", "./routes/dashboard/phones.tsx"),
  ]),
] satisfies RouteConfig;