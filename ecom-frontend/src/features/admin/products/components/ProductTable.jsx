import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PhotoIcon } from "@heroicons/react/24/outline";

const ProductTable = () => {
  const { list } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "FETCH_PRODUCTS",
    });
  }, [dispatch]);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Product Image
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    SKU
                  </th>
                  <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {list &&
                  list !== null &&
                  list.length > 0 &&
                  list.map((product) => (
                    <tr key={product.id}>
                      <td className="py-5 px-1 text-sm sm:pl-3">
                        <div className="flex items-center">
                          <div className="size-11 shrink-0">
                            {product.image_url ? (
                              <img
                                alt=""
                                src={product.image_url}
                                className="size-11 rounded-full"
                              />
                            ) : (
                              <>
                                <PhotoIcon className="size-11 rounded-full" />
                              </>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">
                              name
                            </div>
                            <div className="mt-1 text-gray-500">email</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-5 text-sm whitespace-nowrap text-gray-500">
                        <div className="text-gray-900">{product.title}</div>
                        <div className="mt-1 text-gray-500">department</div>
                      </td>
                      <td className="px-3 py-5 text-sm whitespace-nowrap text-gray-500">
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                          {product.status === 1 ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-3 py-5 text-sm whitespace-nowrap text-gray-500">
                        {product.sku}
                      </td>
                      <td className="relative py-5 pr-6 text-right text-sm font-medium">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit<span className="sr-only">, {product.title}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
