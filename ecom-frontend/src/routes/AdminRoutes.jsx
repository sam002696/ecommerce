import { lazy } from "react";
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
      //   { path: "create", element: <CreateProduct /> },
      //   { path: ":id/edit", element: <EditProduct /> },
    ],
  },
];

export default AdminRoutes;
