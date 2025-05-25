import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomerLayout from "../../../layouts/CustomerLayout/CustomerLayout";
import OrderCard from "./OrderCard";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.customerOrders.list);

  useEffect(() => {
    // Fetch orders when the component
    dispatch({
      type: "FETCH_ORDERS",
    });
  }, [dispatch]);

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
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default OrderHistory;
