import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/dashboard.tsx", [
    route("/", "./layouts/products.tsx"),
    route("/products/new", "./layouts/productForm.tsx"),
    route("/products/:productId/edit", "./layouts/productForm.tsx"),
  ]),
] satisfies RouteConfig;