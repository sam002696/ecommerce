// components/common/RoleRedirect.jsx
import { Navigate } from "react-router";
import { AuthUser } from "../../helpers/AuthUser";

const RoleRedirect = () => {
  const role = AuthUser.getRole();

  console.log("role", role);

  switch (role) {
    case "admin":
      return <Navigate to="/dashboard" replace />;
    case "customer":
      return <Navigate to="/home" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
};

export default RoleRedirect;
