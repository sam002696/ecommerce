import useNotificationListener from "../../hooks/admin/useNotificationListener";
import { AuthUser } from "../../helpers/AuthUser";

const AdminNotificationListener = () => {
  const user = AuthUser.getUser();

  useNotificationListener();

  if (user?.role !== "admin") return null;

  return null; // No UI, just listener
};

export default AdminNotificationListener;
