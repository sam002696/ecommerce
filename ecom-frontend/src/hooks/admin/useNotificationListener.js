import { useEffect } from "react";

import { useDispatch } from "react-redux";

import echo from "../../utils/echo";
// import { addNotification } from "../../features/admin/notifications/slice";

export default function useNotificationListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    echo.private("admin.notifications").listen(".new-order", (notification) => {
      console.log("Notification:", notification);
      // dispatch(addNotification(notification));
    });
  }, [dispatch]);
}
