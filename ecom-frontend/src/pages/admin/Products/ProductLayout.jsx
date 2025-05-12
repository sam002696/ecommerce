import { Outlet } from "react-router";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";

const ProductLayout = () => {
  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold text-gray-900">
              All products
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the products
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create product
            </button>
          </div>
        </div>
      </div>
      <Outlet />
    </AdminLayout>
  );
};

export default ProductLayout;
