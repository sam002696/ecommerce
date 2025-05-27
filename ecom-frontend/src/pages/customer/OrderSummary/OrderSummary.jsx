import React, { useEffect } from "react";
import CustomerLayout from "../../../layouts/CustomerLayout/CustomerLayout";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const OrderSummary = () => {
  const { singleOrder } = useSelector((state) => state.customerOrders);
  const dispatch = useDispatch();
  const location = useLocation();
  const { orderId } = location.state;

  useEffect(() => {
    dispatch({
      type: "FETCH_SINGLE_ORDER",
      payload: { id: orderId },
    });
  }, [dispatch, orderId]);

  // mapping status → step index for the progress bar
  const steps = ["Order placed", "Processing", "Shipped", "Delivered"];

  const stepMap = { pending: 1, shipped: 2, delivered: 3, cancelled: 0 };
  const step = stepMap[singleOrder?.status] || 0;
  const fillPercent = (step / (steps.length - 1)) * 100;

  return (
    <CustomerLayout>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Order Details
          </h1>

          {/* ─── Order Header ───────────────────────────────────────────── */}
          <div className="mt-2 border-b border-gray-200 pb-5 text-sm sm:flex sm:justify-between">
            <dl className="flex">
              <dt className="text-gray-500">Order number&nbsp;</dt>
              <dd className="font-medium text-gray-900">{singleOrder?.id}</dd>
              <dt>
                <span className="sr-only">Date</span>
                <span aria-hidden="true" className="mx-2 text-gray-400">
                  &middot;
                </span>
              </dt>
              <dd className="font-medium text-gray-900">
                <time dateTime={singleOrder?.updated_at}>
                  {singleOrder?.created_at}
                </time>
              </dd>
            </dl>
            {/* <div className="mt-4 sm:mt-0">
              <a
                href={`/order/${singleOrder?.id}/invoice`}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                View invoice
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </div> */}
          </div>

          {/* ─── Products Purchased ──────────────────────────────────────── */}
          <div className="mt-8">
            <h2 className="sr-only">Products purchased</h2>

            <div className="space-y-24">
              {singleOrder?.order_items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-8"
                >
                  {/* Image */}
                  <div className="sm:col-span-4 md:col-span-5 md:row-span-2 md:row-end-2">
                    <img
                      alt={item.product.title}
                      src={item.product.image_url}
                      className="aspect-square w-full rounded-lg bg-gray-50 object-cover"
                    />
                  </div>

                  {/* Title + Price + Desc */}
                  <div className="mt-6 sm:col-span-7 sm:mt-0 md:row-end-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      {item.product.title}
                    </h3>
                    <p className="mt-1 font-medium text-gray-900">
                      ৳{item.price}
                    </p>
                    <p className="mt-3 text-gray-500">
                      {item.product.description}
                    </p>
                  </div>

                  {/* Address + Shipping Updates + Status */}
                  <div className="sm:col-span-12 md:col-span-7">
                    <dl className="grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
                      {/* Delivery address */}
                      <div>
                        <dt className="font-medium text-gray-900">
                          Delivery address
                        </dt>
                        <dd className="mt-3 text-gray-500">
                          <span className="block">{singleOrder?.name}</span>
                          <span className="block">{singleOrder?.address}</span>
                          <span className="block">
                            {singleOrder?.city}, {singleOrder?.state}{" "}
                            {singleOrder?.zip}
                          </span>
                        </dd>
                      </div>
                      {/* Shipping updates */}
                      <div>
                        <dt className="font-medium text-gray-900">
                          Shipping updates
                        </dt>
                        <dd className="mt-3 space-y-3 text-gray-500">
                          <p>{singleOrder?.email}</p>
                          <p>{singleOrder?.mobile}</p>
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Edit
                          </button>
                        </dd>
                      </div>
                    </dl>

                    {/* Status + Date */}
                    <p className="mt-6 font-medium text-gray-900 md:mt-10">
                      {singleOrder?.status.charAt(0).toUpperCase() +
                        singleOrder?.status.slice(1)}{" "}
                      on{" "}
                      <time dateTime={singleOrder?.updated_at}>
                        {singleOrder?.created_at}
                      </time>
                    </p>

                    {/* Progress bar */}
                    <div className="mt-6">
                      <div className="overflow-hidden rounded-full bg-gray-200">
                        <div
                          style={{ width: `${fillPercent}%` }}
                          className="h-2 rounded-full bg-indigo-600"
                        />
                      </div>
                      <div className="mt-6 hidden grid-cols-4 font-medium text-gray-600 sm:grid">
                        <div className="text-indigo-600">Order placed</div>
                        <div
                          className={classNames(
                            step > 0 ? "text-indigo-600" : "",
                            "text-center"
                          )}
                        >
                          Processing
                        </div>
                        <div
                          className={classNames(
                            step > 1 ? "text-indigo-600" : "",
                            "text-center"
                          )}
                        >
                          Shipped
                        </div>
                        <div
                          className={classNames(
                            step > 2 ? "text-indigo-600" : "",
                            "text-right"
                          )}
                        >
                          Delivered
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ─── Billing Summary ───────────────────────────────────────── */}
          <div className="mt-24">
            <h2 className="sr-only">Billing Summary</h2>

            <div className="rounded-lg bg-gray-50 px-6 py-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-0 lg:py-8">
              {/* Billing address & payment */}
              <dl className="grid grid-cols-1 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:col-span-5 lg:pl-8">
                <div>
                  <dt className="font-medium text-gray-900">Billing address</dt>
                  <dd className="mt-3 text-gray-500">
                    <span className="block">{singleOrder?.name}</span>
                    <span className="block">{singleOrder?.address}</span>
                    <span className="block">
                      {singleOrder?.city}, {singleOrder?.state}{" "}
                      {singleOrder?.zip}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">
                    Payment information
                  </dt>
                  <dd className="mt-3 flex">
                    {/* you can swap in a dynamic card icon if you have it */}
                    <div>
                      <svg
                        width={36}
                        height={24}
                        viewBox="0 0 36 24"
                        aria-hidden="true"
                        className="h-6 w-auto"
                      >
                        <rect rx={4} fill="#224DBA" width={36} height={24} />
                        {/* … */}
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-gray-900">
                        {singleOrder?.payment_status.toUpperCase()}
                      </p>
                    </div>
                  </dd>
                </div>
              </dl>

              {/* Totals */}
              <dl className="mt-8 divide-y divide-gray-200 text-sm lg:col-span-7 lg:mt-0 lg:pr-8">
                <div className="flex items-center justify-between pb-4">
                  <dt className="text-gray-600">Subtotal</dt>
                  <dd className="font-medium text-gray-900">
                    ৳{singleOrder?.subtotal}
                  </dd>
                </div>
                <div className="flex items-center justify-between py-4">
                  <dt className="text-gray-600">Shipping</dt>
                  <dd className="font-medium text-gray-900">
                    ৳{singleOrder?.shipping}
                  </dd>
                </div>
                <div className="flex items-center justify-between py-4">
                  <dt className="text-gray-600">Discount</dt>
                  <dd className="font-medium text-gray-900">
                    ৳{singleOrder?.discount || 0}
                  </dd>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <dt className="font-medium text-gray-900">Order total</dt>
                  <dd className="font-medium text-indigo-600">
                    ৳{singleOrder?.grand_total}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default OrderSummary;
