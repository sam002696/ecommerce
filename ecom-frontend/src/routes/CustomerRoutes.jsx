import { lazy } from "react";

const StoreFrontPage = lazy(() =>
  import("../pages/customer/StoreFront/StoreFrontPage")
);
const ShopPage = lazy(() => import("../pages/customer/Shop/ShopPage"));
const ProductDetails = lazy(() =>
  import("../pages/customer/ProductOverview/ProductDetails")
);

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
  {
    path: "/product-details",
    element: <ProductDetails />,
  },
];

export default CustomerRoutes;
