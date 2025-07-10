// components/common/RoleGuardedHome.jsx
import React from "react";
import { Navigate } from "react-router";
import { AuthUser } from "../../helpers/AuthUser";
import StoreFrontPage from "../../pages/customer/StoreFront/StoreFrontPage";

const RoleGuardedHome = () => {
  const role = AuthUser.getRole();

  if (role === "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  // default: customer or not-logged-in user
  return <StoreFrontPage />;
};

export default RoleGuardedHome;
