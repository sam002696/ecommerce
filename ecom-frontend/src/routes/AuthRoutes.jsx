import { lazy } from "react";
import { Navigate } from "react-router";

const Login = lazy(() => import("../pages/Auth/Login/Login"));
const Register = lazy(() => import("../pages/Auth/Register/Register"));
const Example = lazy(() => import("../pages/Auth/example"));

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
    path: "/example",
    element: <Example />,
  },
  //   {
  //     path: "*",
  //     element: <NotFound />,
  //   },
];

export default Authroutes;
