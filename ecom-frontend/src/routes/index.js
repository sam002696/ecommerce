import AuthRoutes from "./AuthRoutes";
import AdminRoutes from "./AdminRoutes";
import CustomerRoutes from "./CustomerRoutes";

const AppRoutes = [...AuthRoutes, ...AdminRoutes, ...CustomerRoutes];

export default AppRoutes;
