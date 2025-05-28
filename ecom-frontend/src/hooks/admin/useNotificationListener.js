import { useEffect } from "react";

import { useDispatch } from "react-redux";

import echo from "../../utils/echo";
import { addNotification } from "../../features/admin/notifications/slice";

export default function useNotificationListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    echo.private("admin.notifications").notification((notification) => {
      //   dispatch(addNotification(notification));

      console.log("notification", notification);

      dispatch({ type: "FETCH_NOTIFICATIONS" });
    });
  }, [dispatch]);
}
