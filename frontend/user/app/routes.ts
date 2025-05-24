import {
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

export default [
  route("/", "routes/home.tsx", [
    route("/", "./layouts/products.tsx"),
    route("/:productId", "./layouts/productDetail.tsx"),
  ]),
] satisfies RouteConfig;