import { useState } from "react";
import { Link, useLocation } from "react-router";
import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
  TransitionChild,
} from "@headlessui/react";
import {
  HomeIcon,
  UsersIcon,
  FolderIcon,
  CalendarIcon,
  DocumentDuplicateIcon,
  ChartPieIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Team", href: "/team", icon: UsersIcon },
  {
    name: "Products",
    icon: FolderIcon,
    href: "/products",
    children: [
      { name: "All Products", href: "/products" },
      { name: "Create Product", href: "/products/create" },
    ],
  },
  { name: "Calendar", href: "#", icon: CalendarIcon },
  { name: "Documents", href: "#", icon: DocumentDuplicateIcon },
  { name: "Reports", href: "#", icon: ChartPieIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expanded, setExpanded] = useState({ Products: true }); // Default expanded menu

  const renderNavItem = (item) => {
    const isActive = location.pathname.startsWith(item.href);
    const isExpanded = expanded[item.name];

    return item.children ? (
      <div key={item.name}>
        <button
          onClick={() =>
            setExpanded((prev) => ({ ...prev, [item.name]: !prev[item.name] }))
          }
          className={classNames(
            isActive
              ? "bg-gray-100 text-indigo-600"
              : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
            "flex w-full items-center justify-between p-2 rounded-md text-sm font-medium"
          )}
        >
          <div className="flex items-center gap-3">
            <item.icon className="h-5 w-5" />
            {item.name}
          </div>
          <ChevronDownIcon
            className={classNames(
              "h-4 w-4 transition-transform duration-200",
              isExpanded ? "rotate-180 text-indigo-600" : "text-gray-400"
            )}
          />
        </button>

        {isExpanded && (
          <div className="ml-8 mt-1 space-y-1">
            {item.children.map((child) => (
              <Link
                key={child.name}
                to={child.href}
                className={classNames(
                  location.pathname === child.href
                    ? "text-indigo-600 font-medium"
                    : "text-gray-600 hover:text-indigo-600",
                  "block text-sm"
                )}
              >
                {child.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    ) : (
      <Link
        key={item.name}
        to={item.href}
        onClick={() => setSidebarOpen(false)}
        className={classNames(
          isActive
            ? "bg-gray-100 text-indigo-600"
            : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
          "flex items-center gap-3 p-2 rounded-md text-sm font-medium"
        )}
      >
        <item.icon className="h-5 w-5" />
        {item.name}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Sidebar */}
      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop className="fixed inset-0 bg-gray-900/80" />
        <div className="fixed inset-0 flex">
          <DialogPanel className="relative flex w-full max-w-xs flex-1 transform bg-white p-4">
            <TransitionChild>
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-4 right-4"
              >
                <XMarkIcon className="h-6 w-6 text-gray-600" />
              </button>
            </TransitionChild>
            <nav className="flex flex-col space-y-4">
              {navigation.map(renderNavItem)}
            </nav>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 border-r border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center h-16">
          <img
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            alt="Logo"
            className="h-8 w-auto"
          />
        </div>
        <nav className="mt-8 flex flex-col gap-4">
          {navigation.map(renderNavItem)}
        </nav>
      </aside>
    </>
  );
}
