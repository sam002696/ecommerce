import { useSelector } from "react-redux";
import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid";
import { useFormikContext } from "formik";

export function OrderReview({ shipping = 50, taxRate = 0.1 }) {
  const { totalAmount, items } = useSelector((s) => s.customerCart);
  const shippingCost = items.length ? shipping : 0;
  const tax = Math.round((totalAmount + shippingCost) * taxRate * 100) / 100;
  const orderTotal = totalAmount + shippingCost + tax;

  const { submitForm } = useFormikContext();

  return (
    <div className="mt-10 lg:mt-0">
      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
      <div className="mt-4 space-y-4 rounded-lg border border-gray-200 bg-white p-6">
        <Detail label="Subtotal" value={`₹${totalAmount.toFixed(2)}`} />
        <Detail
          label="Shipping estimate"
          info
          value={`₹${shippingCost.toFixed(2)}`}
        />
        <Detail label="Tax estimate" info value={`₹${tax.toFixed(2)}`} />
        <Detail label="Order total" value={`₹${orderTotal.toFixed(2)}`} large />
      </div>
      <button
        type="button"
        onClick={submitForm}
        className="mt-6 w-full rounded-md bg-indigo-600 px-4 py-3 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Confirm order
      </button>
    </div>
  );
}

function Detail({ label, value, info, large }) {
  return (
    <div className={`flex justify-between ${info ? "pt-4 border-t" : ""}`}>
      <dt className={`text-sm ${large ? "font-medium" : "text-gray-600"}`}>
        {label}
        {info && (
          <QuestionMarkCircleIcon className="ml-2 inline h-5 w-5 text-gray-400" />
        )}
      </dt>
      <dd
        className={`text-sm ${
          large ? "font-medium text-gray-900" : "text-gray-900"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
