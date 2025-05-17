import { lazy } from "react";

const StoreFrontPage = lazy(() =>
  import("../pages/customer/StoreFront/StoreFrontPage")
);

const CustomerRoutes = [
  // { path: "/", element: <Navigate to="/" replace /> },
  {
    path: "/",
    element: <StoreFrontPage />,
  },
];

export default CustomerRoutes;
