import { lazy } from "react";

const StoreFrontPage = lazy(() =>
  import("../pages/customer/StoreFront/StoreFrontPage")
);
const ShopPage = lazy(() => import("../pages/customer/Shop/ShopPage"));

const CustomerRoutes = [
  // { path: "/", element: <Navigate to="/" replace /> },
  {
    path: "/",
    element: <StoreFrontPage />,
  },
  {
    path: "/shop",
    element: <ShopPage />,
  },
];

export default CustomerRoutes;
