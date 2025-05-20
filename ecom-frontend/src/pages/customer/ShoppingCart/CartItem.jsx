import React from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon, ClockIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
} from "../../../features/customer/cart/slice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <li className="flex py-6 sm:py-10">
      <div className="shrink-0">
        <img
          src={item.image_url}
          alt={item.title}
          className="h-24 w-24 rounded-md object-cover sm:h-48 sm:w-48"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          {/* Title / Price */}
          <div>
            <h3 className="text-sm font-medium text-gray-700">{item.title}</h3>
            <p className="mt-1 text-sm text-gray-500">{item.size}</p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              ₹{item.price.toFixed(2)}
            </p>
          </div>

          {/* Qty selector + Remove */}
          <div className="mt-4 sm:mt-0 sm:pr-9">
            <div className="relative inline-block text-left">
              <select
                value={item.quantity}
                onChange={(e) =>
                  dispatch(
                    updateQuantity({
                      id: item.id,
                      size: item.size,
                      quantity: Number(e.target.value),
                    })
                  )
                }
                className="block appearance-none rounded-md border border-gray-300 bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              >
                {[...Array(10).keys()].map((n) => (
                  <option key={n + 1} value={n + 1}>
                    {n + 1}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            </div>

            <button
              onClick={() =>
                dispatch(removeFromCart({ id: item.id, size: item.size }))
              }
              type="button"
              className="absolute top-0 right-0 -m-2 p-2 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Remove</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Stock indicator */}
        <p className="mt-4 flex items-center space-x-2 text-sm text-gray-700">
          {true ? (
            <CheckIcon className="h-5 w-5 text-green-500" />
          ) : (
            <ClockIcon className="h-5 w-5 text-gray-300" />
          )}
          <span>In stock</span>
        </p>
      </div>
    </li>
  );
};

export default CartItem;
