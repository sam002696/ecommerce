import React from "react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import { Outlet } from "react-router";

const OrderLayout = () => {
  return (
    <>
      <AdminLayout>
        <Outlet />
      </AdminLayout>
    </>
  );
};

export default OrderLayout;
