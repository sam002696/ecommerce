import React from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router";

const CartSummary = ({ subtotal, shipping = 0, tax = 0 }) => {
  const navigate = useNavigate();
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    navigate("/checkout-form");
  };

  return (
    <section className="rounded-lg bg-gray-50 p-6 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
      <dl className="mt-6 space-y-4">
        <div className="flex justify-between text-sm text-gray-600">
          <dt>Subtotal</dt>
          <dd>৳{subtotal.toFixed(2)}</dd>
        </div>
        <div className="flex justify-between border-t border-gray-200 pt-4 text-sm text-gray-600">
          <dt className="flex items-center">
            Shipping estimate
            <QuestionMarkCircleIcon className="ml-2 h-5 w-5 text-gray-400 hover:text-gray-500" />
          </dt>
          <dd>৳{shipping.toFixed(2)}</dd>
        </div>
        <div className="flex justify-between border-t border-gray-200 pt-4 text-sm text-gray-600">
          <dt className="flex items-center">
            Tax estimate
            <QuestionMarkCircleIcon className="ml-2 h-5 w-5 text-gray-400 hover:text-gray-500" />
          </dt>
          <dd>৳{tax.toFixed(2)}</dd>
        </div>
        <div className="flex justify-between border-t border-gray-200 pt-4 text-base font-medium text-gray-900">
          <dt>Order total</dt>
          <dd>৳{total.toFixed(2)}</dd>
        </div>
      </dl>
      <button
        onClick={handleCheckout}
        type="button"
        className="mt-6 w-full rounded-md bg-indigo-600 px-4 py-3 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Checkout
      </button>
    </section>
  );
};
export default CartSummary;
