import { Outlet } from "react-router";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";

const ProductLayout = () => {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

export default ProductLayout;
