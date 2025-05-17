// import { useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { Link, useLocation } from "react-router";
import {
  HomeIcon,
  UsersIcon,
  FolderIcon,
  CalendarIcon,
  DocumentDuplicateIcon,
  ChartPieIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Team", href: "/team", icon: UsersIcon },
  {
    name: "Products",
    icon: FolderIcon,
    children: [
      { name: "All products", href: "/products" },
      { name: "Create product", href: "/products/create" },
      { name: "Edit product", href: "/products/:id/edit" },
    ],
  },
  {
    name: "Projects",
    icon: FolderIcon,
    children: [
      { name: "GraphQL API", href: "/projects/graphql" },
      { name: "iOS App", href: "/projects/ios" },
      { name: "Android App", href: "/projects/android" },
    ],
  },
  { name: "Calendar", href: "/calendar", icon: CalendarIcon },
  { name: "Documents", href: "/documents", icon: DocumentDuplicateIcon },
  { name: "Reports", href: "/reports", icon: ChartPieIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
  const location = useLocation();
  // const [sidebarOpen, setSidebarOpen] = useState(false);

  function matchPathPattern(pattern, pathname) {
    if (!pattern || !pathname) return false;
    const regex = new RegExp("^" + pattern.replace(/:\w+/g, "[^/]+") + "$");
    return regex.test(pathname);
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col border-r border-gray-200 bg-white px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center">
          <img
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="h-8 w-auto"
            alt="Logo"
          />
        </div>
        <nav className="mt-8 flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    {!item.children ? (
                      <Link
                        to={item.href}
                        className={classNames(
                          location.pathname.startsWith(item.href)
                            ? "bg-gray-50 text-indigo-600"
                            : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                          "group flex items-center gap-x-3 rounded-md py-2 pl-4 pr-2 text-sm font-semibold leading-6"
                        )}
                      >
                        {item.icon && (
                          <item.icon
                            className="h-5 w-5 text-gray-400 group-hover:text-indigo-600"
                            aria-hidden="true"
                          />
                        )}
                        {item.name}
                      </Link>
                    ) : (
                      <Disclosure
                        as="div"
                        className="space-y-1"
                        defaultOpen={item.children?.some(
                          (sub) =>
                            sub.href && location.pathname.startsWith(sub.href)
                        )}
                      >
                        {({ open }) => (
                          <>
                            <DisclosureButton
                              className={classNames(
                                location.pathname.startsWith(item.href)
                                  ? "bg-gray-50 text-indigo-600"
                                  : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                                "group flex w-full items-center gap-x-3 rounded-md py-2 pl-4 pr-2 text-sm font-semibold leading-6"
                              )}
                            >
                              {item.icon && (
                                <item.icon
                                  className="h-5 w-5 text-gray-400 group-hover:text-indigo-600"
                                  aria-hidden="true"
                                />
                              )}
                              {item.name}
                              <ChevronRightIcon
                                className={classNames(
                                  open
                                    ? "rotate-90 text-gray-500"
                                    : "text-gray-400",
                                  "ml-auto h-5 w-5 shrink-0 transform transition-transform"
                                )}
                                aria-hidden="true"
                              />
                            </DisclosureButton>
                            <DisclosurePanel className="space-y-1">
                              {item.children.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  to={subItem.href}
                                  className={classNames(
                                    matchPathPattern(
                                      subItem.href,
                                      location.pathname
                                    )
                                      ? "bg-gray-50 text-indigo-600"
                                      : "text-gray-600 hover:bg-gray-50 hover:text-indigo-600",
                                    "block rounded-md py-2 pl-11 pr-2 text-sm leading-6"
                                  )}
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </DisclosurePanel>
                          </>
                        )}
                      </Disclosure>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
