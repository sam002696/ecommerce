import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomerLayout from "../../../layouts/CustomerLayout/CustomerLayout";
import OrderCard from "./OrderCard";
import Pagination from "../../../components/common/Pagination";

const OrderHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { list: orders, meta } = useSelector((state) => state.customerOrders);

  useEffect(() => {
    // Fetch orders when the component
    dispatch({
      type: "FETCH_ORDERS",
      payload: { page: currentPage },
    });
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <CustomerLayout>
      <div className="bg-white">
        <div className="mx-auto max-w-4xl py-16 sm:px-6 sm:py-24">
          <header className="px-4 sm:px-0">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Order history
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Check the status of recent orders, manage returns, and download
              invoices.
            </p>
          </header>

          <div className="mt-16 space-y-16 sm:space-y-24">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}

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
    </CustomerLayout>
  );
};

export default OrderHistory;
