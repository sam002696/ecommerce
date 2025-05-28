import { BellIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const NotificationsButton = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_NOTIFICATIONS" });
  }, [dispatch]);

  return (
    <button
      type="button"
      className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
    >
      <span className="sr-only">View notifications</span>
      <BellIcon className="h-6 w-6" />
    </button>
  );
};

export default NotificationsButton;
