import { lazy } from "react";
import CreateProduct from "../features/admin/products/components/CreateProduct/CreateProduct";
import EditProduct from "../features/admin/products/components/EditProduct/EditProduct";

const AdminDashboard = lazy(() => import("../pages/admin/Dashboard/Dashboard"));

const Products = lazy(() => import("../pages/admin/Products/Products"));
const ProductLayout = lazy(() =>
  import("../pages/admin/Products/ProductLayout")
);

const AdminRoutes = [
  {
    path: "/dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/products",
    element: <ProductLayout />,
    children: [
      { path: "/products", element: <Products /> },
      { path: "/products/create", element: <CreateProduct /> },
      { path: "/products/:id/edit", element: <EditProduct /> },
    ],
  },
];

export default AdminRoutes;
