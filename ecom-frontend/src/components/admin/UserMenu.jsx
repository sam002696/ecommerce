import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { AuthUser } from "../../helpers/AuthUser";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

const userNavigation = [
  { name: "Your profile", href: "profile" },
  { name: "Sign out", href: "sign_out" },
];

const UserMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = AuthUser.getUser();

  const handleDropDownItems = (item) => {
    if (item === "profile") {
      navigate("/profile");
    } else {
      dispatch({
        type: "LOGOUT",
        payload: {
          navigate,
        },
      });
    }
  };

  return (
    <Menu as="div" className="relative">
      <MenuButton className="flex items-center text-sm focus:outline-none focus-visible:ring-0">
        <span className="sr-only">Open user menu</span>
        {/* <img
          alt="Profile"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          className="h-8 w-8 rounded-full bg-gray-50"
        /> */}

        <span className="inline-block size-8 overflow-hidden rounded-full bg-gray-100">
          <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            className="size-full text-gray-300"
          >
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </span>
        <span className="hidden lg:flex lg:items-center">
          <span className="ml-4 text-sm font-semibold text-gray-900">
            {user?.name}
          </span>
          <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" />
        </span>
      </MenuButton>
      <MenuItems className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
        {userNavigation.map((item) => (
          <MenuItem>
            {({ active }) => (
              <button
                onClick={() => handleDropDownItems(item.href)}
                className={`w-full px-4 py-2 text-left text-sm text-gray-700 ${
                  active ? "bg-gray-100" : ""
                } focus:outline-none`}
              >
                {item.name}
              </button>
            )}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};

export default UserMenu;
