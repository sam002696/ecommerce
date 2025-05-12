// src/layouts/AdminLayout/Sidebar.jsx
import { useState } from "react";
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
  Cog6ToothIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: HomeIcon, current: true },
  { name: "Team", href: "#", icon: UsersIcon, current: false },
  { name: "Projects", href: "#", icon: FolderIcon, current: false },
  { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
  { name: "Documents", href: "#", icon: DocumentDuplicateIcon, current: false },
  { name: "Reports", href: "#", icon: ChartPieIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-100 text-indigo-600"
                      : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                    "flex items-center gap-3 p-2 rounded-md text-sm font-medium"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </a>
              ))}
            </nav>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 border-r border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center  h-16">
          <img
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            alt="Logo"
            className="h-8 w-auto"
          />
        </div>
        <nav className="mt-8 flex flex-col gap-4">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                item.current
                  ? "bg-gray-100 text-indigo-600"
                  : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                "flex items-center gap-3 p-2 rounded-md text-sm font-medium"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
}
