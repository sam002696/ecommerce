import { lazy } from "react";
import { Navigate } from "react-router";

const Login = lazy(() => import("../pages/Auth/Login/Login"));
const Register = lazy(() => import("../pages/Auth/Register/Register"));
const AdminDashboard = lazy(() => import("../pages/admin/Dashboard/Dashboard"));

// Defining routes
const Authroutes = [
  { path: "/", element: <Navigate to="/login" replace /> },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <AdminDashboard />,
  },
  //   {
  //     path: "*",
  //     element: <NotFound />,
  //   },
];

export default Authroutes;
