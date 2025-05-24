import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../../../../components/common/Pagination";
import { Link } from "react-router";
import { paymentStatusStyles } from "../../utils";

const OrdersTable = () => {
  const dispatch = useDispatch();
  const { list, meta } = useSelector((state) => state.adminOrders);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch({
      type: "FETCH_ADMIN_ORDERS",
      payload: { page: currentPage },
    });
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold text-gray-900">
              All orders
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the orders
            </p>
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
                      Order id
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Grand total
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Payment status
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Order status
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pr-4 pl-3 sm:pr-0"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {list &&
                    list.length > 0 &&
                    list.map((order) => (
                      <tr key={order.id}>
                        <td className="px-3 py-5 text-sm whitespace-nowrap text-gray-500">
                          <div className="text-gray-900">{order.id}</div>
                        </td>
                        <td className="px-3 py-5 text-sm whitespace-nowrap text-gray-500">
                          <div className="text-gray-900">
                            ৳{order.grand_total}
                          </div>
                        </td>
                        <td className="px-3 py-5 text-sm whitespace-nowrap text-gray-500">
                          <span
                            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                              paymentStatusStyles[order.payment_status] ||
                              paymentStatusStyles.Default
                            }`}
                          >
                            {order.payment_status}
                          </span>
                        </td>
                        <td className="px-3 py-5 text-sm whitespace-nowrap text-gray-500">
                          {order.status}
                        </td>
                        <td className="relative py-5 pr-6 text-right text-sm font-medium">
                          <Link
                            to={`/orders/${order?.id}/edit`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </Link>
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
      </div>
    </>
  );
};

export default OrdersTable;
