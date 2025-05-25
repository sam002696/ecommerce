import React from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";

const OrderItem = ({ item, status, updatedAt }) => {
  console.log("item", item);

  return (
    <div className="flex py-6 sm:py-10">
      <div className="min-w-0 flex-1 lg:flex lg:flex-col">
        <div className="lg:flex-1 sm:flex">
          <div>
            <h4 className="font-medium text-gray-900">{item.name}</h4>
            {item.product?.description && (
              <p className="mt-2 hidden text-sm text-gray-500 sm:block">
                {item.product.description}
              </p>
            )}
          </div>
          <p className="mt-1 font-medium text-gray-900 sm:mt-0 sm:ml-6">
            ৳{item.price}
          </p>
        </div>

        <div className="mt-2 flex text-sm font-medium sm:mt-4">
          <Link
            to={`/product-details/${item.product_id}`}
            className="text-indigo-600 hover:text-indigo-500"
          >
            View Product
          </Link>
          <Link
            to="#"
            className="ml-4 border-l border-gray-200 pl-4 text-indigo-600 hover:text-indigo-500 sm:ml-6 sm:pl-6"
          >
            Buy Again
          </Link>
        </div>

        <div className="mt-6 font-medium">
          {status === "delivered" ? (
            <div className="flex space-x-2">
              <CheckIcon className="size-6 flex-none text-green-500" />
              <p>
                Delivered
                <span className="hidden sm:inline">
                  {" "}
                  on <time dateTime={updatedAt}>{updatedAt}</time>
                </span>
              </p>
            </div>
          ) : (
            <p className="capitalize">{status}</p>
          )}
        </div>
      </div>

      <div className="ml-4 shrink-0 sm:order-first sm:m-0 sm:mr-6">
        <img
          src={item.product?.image_url}
          alt={item.name}
          className="size-20 rounded-lg object-cover sm:size-40 lg:size-52"
        />
      </div>
    </div>
  );
};

export default OrderItem;
