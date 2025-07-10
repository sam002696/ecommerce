import { lazy } from "react";
import CreateProduct from "../features/admin/products/components/CreateProduct/CreateProduct";
import EditProduct from "../features/admin/products/components/EditProduct/EditProduct";
import Orders from "../features/admin/orders/components/Orders/Orders";
import EditOrder from "../features/admin/orders/components/EditOrder/EditOrder";
import OrderLayout from "../pages/admin/Orders/OrderLayout";
import RoleBasedRoute from "./RoleBasedRoute";

const AdminDashboard = lazy(() => import("../pages/admin/Dashboard/Dashboard"));

const Products = lazy(() => import("../pages/admin/Products/Products"));
const ProductLayout = lazy(() =>
  import("../pages/admin/Products/ProductLayout")
);

const AdminRoutes = [
  {
    path: "/dashboard",
    element: <RoleBasedRoute allowedRoles={["admin"]} />,
    children: [
      { path: "", element: <AdminDashboard /> },
      {
        path: "products",
        element: <ProductLayout />,
        children: [
          { path: "", element: <Products /> },
          { path: "create", element: <CreateProduct /> },
          { path: ":id/edit", element: <EditProduct /> },
        ],
      },
      {
        path: "orders",
        element: <OrderLayout />,
        children: [
          { path: "", element: <Orders /> },
          { path: ":id/edit", element: <EditOrder /> },
        ],
      },
    ],
  },
];

export default AdminRoutes;
