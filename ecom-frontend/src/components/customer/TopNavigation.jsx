// import React from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";

import EcomLogo from "../../assets/logo/Merchly.png";
import BdFlag from "../../assets/bdFlag/Flag_of_Bangladesh.svg";

import { Popover, PopoverButton, PopoverGroup } from "@headlessui/react";

import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { AuthUser } from "../../helpers/AuthUser";

const navigation = {
  categories: [
    {
      id: "women",
      name: "Women",
      to: "/shop",
    },
    {
      id: "men",
      name: "Men",
      to: "/shop",
    },
  ],
  pages: [
    { name: "Company", href: "/" },
    { name: "Stores", href: "/" },
  ],
};

const TopNavigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.customerCart);
  const user = AuthUser.getUser();

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
      payload: {
        navigate,
      },
    });
  };

  return (
    <>
      <nav
        aria-label="Top"
        className="relative z-20 bg-white/90 backdrop-blur-xl backdrop-filter"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center">
            <button
              type="button"
              // onClick={() => setOpen(true)}
              className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>

            {/* Logo */}
            <div className="ml-4 flex lg:ml-0">
              <Link to="/">
                <span className="sr-only">Merchly</span>
                <img alt="" src={EcomLogo} className="h-12 w-auto" />
              </Link>
            </div>

            {/* Flyout menus */}
            <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
              <div className="flex h-full space-x-8">
                {navigation.categories.map((category) => (
                  <Popover key={category.name} className="flex">
                    <div className="relative flex">
                      <PopoverButton className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-open:border-indigo-600 data-open:text-indigo-600 outline-none focus:outline-none">
                        <Link to={category.to}>{category.name}</Link>
                      </PopoverButton>
                    </div>
                  </Popover>
                ))}

                {navigation.pages.map((page) => (
                  <Link
                    to={page.href}
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    {page.name}
                  </Link>
                ))}
              </div>
            </PopoverGroup>

            <div className="ml-auto flex items-center">
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                {user ? (
                  <Menu as="div" className="relative">
                    <MenuButton className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800 focus:outline-none">
                      <span>{user.name}</span>
                      <svg
                        className="ml-1 h-4 w-4 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </MenuButton>
                    <MenuItems className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                      <MenuItem>
                        {({ active }) => (
                          <Link
                            to="/order-history"
                            className={`block px-4 py-2 text-sm ${
                              active ? "bg-gray-100" : ""
                            }`}
                          >
                            Your orders
                          </Link>
                        )}
                      </MenuItem>
                      {/* <MenuItem>
                        {({ active }) => (
                          <Link
                            to="/settings"
                            className={`block px-4 py-2 text-sm ${
                              active ? "bg-gray-100" : ""
                            }`}
                          >
                            Settings
                          </Link>
                        )}
                      </MenuItem> */}
                      <MenuItem>
                        {({ active }) => (
                          <button
                            onClick={handleLogout}
                            className={`w-full text-left px-4 py-2 text-sm ${
                              active ? "bg-gray-100" : ""
                            }`}
                          >
                            Sign out
                          </button>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Sign in
                    </Link>
                    <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                    <Link
                      to="/register"
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Create account
                    </Link>
                  </>
                )}
              </div>

              <div className="hidden lg:ml-8 lg:flex">
                <a
                  href="#"
                  className="flex items-center text-gray-700 hover:text-gray-800"
                >
                  <img
                    alt=""
                    src={BdFlag}
                    className="block h-auto w-5 shrink-0"
                  />
                  <span className="ml-3 block text-sm font-medium">BD</span>
                  <span className="sr-only">, change currency</span>
                </a>
              </div>

              {/* Search */}
              <div className="flex lg:ml-6">
                <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Search</span>
                  <MagnifyingGlassIcon aria-hidden="true" className="size-6" />
                </a>
              </div>

              {/* Cart */}

              <div className="ml-4 flow-root lg:ml-6">
                <Link
                  to="/shopping-cart"
                  className="group -m-2 flex items-center p-2"
                >
                  <ShoppingBagIcon
                    aria-hidden="true"
                    className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    {items.length}
                  </span>
                  <span className="sr-only">items in cart, view bag</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default TopNavigation;
