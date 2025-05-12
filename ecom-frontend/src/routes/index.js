import AuthRoutes from "./AuthRoutes";
import AdminRoutes from "./AdminRoutes";

const AppRoutes = [...AuthRoutes, ...AdminRoutes];

export default AppRoutes;
