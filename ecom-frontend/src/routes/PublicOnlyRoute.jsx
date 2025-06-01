import React from "react";
import { Navigate } from "react-router";
import { AuthUser } from "../helpers/AuthUser";

const PublicOnlyRoute = ({ children }) => {
  const isAuthenticated = AuthUser.isAuthenticated();
  const user = AuthUser.getUser();

  if (isAuthenticated) {
    // Redirecting based on role
    const redirectPath = user?.role === "admin" ? "/dashboard" : "/home";
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default PublicOnlyRoute;
