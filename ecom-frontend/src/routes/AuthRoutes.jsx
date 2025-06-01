import { lazy } from "react";
import { Navigate } from "react-router";
import PublicOnlyRoute from "./PublicOnlyRoute";

const Login = lazy(() => import("../pages/Auth/Login/Login"));
const Register = lazy(() => import("../pages/Auth/Register/Register"));

// Defining routes
const Authroutes = [
  // { path: "/", element: <Navigate to="/login" replace /> },
  {
    path: "/login",
    element: (
      <PublicOnlyRoute>
        <Login />
      </PublicOnlyRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicOnlyRoute>
        <Register />
      </PublicOnlyRoute>
    ),
  },
  //   {
  //     path: "*",
  //     element: <NotFound />,
  //   },
];

export default Authroutes;
