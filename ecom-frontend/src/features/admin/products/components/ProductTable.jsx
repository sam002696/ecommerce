import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router";
import Pagination from "../../../../components/common/Pagination";
import ConfirmDialog from "../../../../components/common/ConfirmDialog";

const ProductTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const { list, meta } = useSelector((state) => state.adminProducts);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch({
      type: "FETCH_PRODUCTS",
      payload: { page: currentPage },
    });
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCreateProduct = () => {
    navigate("/products/create");
  };

  const handleDeleteClick = (productId) => {
    setSelectedProductId(productId);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch({ type: "DELETE_PRODUCT", payload: { id: selectedProductId } });
    setConfirmOpen(false);
    setSelectedProductId(null);
  };

  return (
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
            onClick={handleCreateProduct}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create product
          </button>
        </div>
      </div>

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
                  list.length > 0 &&
                  list.map((product) => (
                    <tr key={product.id}>
                      <td className="py-5 px-1 text-sm sm:pl-3">
                        <div className="flex items-center">
                          <div className="size-10">
                            {product.image_url ? (
                              <img
                                alt=""
                                src={product.image_url}
                                className="size-10 "
                              />
                            ) : (
                              <PhotoIcon className="size-11 rounded-full" />
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
                        <Link
                          to={`/products/${product?.id}/edit`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit<span className="sr-only">, {product.title}</span>
                        </Link>

                        <button
                          type="button"
                          className="text-red-600 hover:text-red-900 ml-4"
                          onClick={() => handleDeleteClick(product.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {meta && (
              <Pagination
                currentPage={meta.current_page}
                perPage={meta.per_page}
                total={meta.total}
                totalPages={meta.total_pages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
      />
    </div>
  );
};

export default ProductTable;
