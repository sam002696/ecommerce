// import React from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
// import { CheckIcon } from "@heroicons/react/24/outline";

const OrderHeader = ({ order }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDownloadInvoice = (orderId) => {
    dispatch({
      type: "DOWNLOAD_ORDER_INVOICE",
      payload: { orderId },
    });
  };

  const handleView = () =>
    navigate("/order/summary", { state: { orderId: order.id } });

  return (
    <div className="bg-gray-50 px-4 py-6 sm:rounded-lg sm:p-6 md:flex md:items-center md:justify-between md:space-x-6 lg:space-x-8">
      <dl className="flex-auto divide-y divide-gray-200 text-sm text-gray-600 md:grid md:grid-cols-3 md:gap-x-6 md:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8">
        {[
          { label: "Order number", value: order.id },
          {
            label: "Date placed",
            value: <time dateTime={order.created_at}>{order.created_at}</time>,
          },
          {
            label: "Total amount",
            value: `৳${order.grand_total}`,
            isBold: true,
          },
        ].map(({ label, value, isBold }, i) => (
          <div
            key={i}
            className="max-md:flex max-md:justify-between max-md:py-4 max-md:first:pt-0 max-md:last:pb-0"
          >
            <dt className="font-medium text-gray-900">{label}</dt>
            <dd
              className={`md:mt-1 ${isBold ? "font-medium text-gray-900" : ""}`}
            >
              {value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 space-y-4 sm:flex sm:space-y-0 sm:space-x-4 md:mt-0">
        <button
          onClick={handleView}
          className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 md:w-auto"
        >
          View Order
        </button>
        <button
          onClick={() => handleDownloadInvoice(order.id)}
          className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 md:w-auto"
        >
          Download Invoice
        </button>
      </div>
    </div>
  );
};

export default OrderHeader;
