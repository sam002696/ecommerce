import React from "react";
import { Navigate, Outlet } from "react-router";
import { AuthUser } from "../helpers/AuthUser";
import Unauthorized from "../pages/403Page/Unauthorized";

const RoleBasedRoute = ({ allowedRoles }) => {
  console.log("allowedRoles", allowedRoles[0]);
  // const isAuthenticated = AuthUser.isAuthenticated();
  const role = AuthUser.getRole();

  console.log("role", role);

  // If not logged in, redirect to login
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }

  // If authenticated but role not allowed
  if (!allowedRoles.includes(role)) {
    return <Unauthorized />;
  }

  // All good — show child routes
  return <Outlet />;
};

export default RoleBasedRoute;
