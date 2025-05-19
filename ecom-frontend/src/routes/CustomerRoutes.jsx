import { lazy } from "react";

const StoreFrontPage = lazy(() =>
  import("../pages/customer/StoreFront/StoreFrontPage")
);
const ShopPage = lazy(() => import("../pages/customer/Shop/ShopPage"));
const ProductDetails = lazy(() =>
  import("../pages/customer/ProductOverview/ProductDetails")
);
const ShoppingCart = lazy(() =>
  import("../pages/customer/ShoppingCart/ShoppingCart")
);
const CheckoutForm = lazy(() =>
  import("../pages/customer/CheckoutForm/CheckoutForm")
);

const OrderHistory = lazy(() =>
  import("../pages/customer/OrderHistory/OrderHistory")
);

const OrderSummary = lazy(() =>
  import("../pages/customer/OrderSummary/OrderSummary")
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
  {
    path: "/shopping-cart",
    element: <ShoppingCart />,
  },
  {
    path: "/checkout-form",
    element: <CheckoutForm />,
  },
  {
    path: "/order-history",
    element: <OrderHistory />,
  },
  {
    path: "/order-summary",
    element: <OrderSummary />,
  },
];

export default CustomerRoutes;
