export function PaymentMethod({ methods }) {
  return (
    <fieldset className="mt-10 border-t border-gray-200 pt-10">
      <legend className="sr-only">Payment method</legend>
      <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-10">
        {methods.map((m, i) => (
          <label key={m.id} className="flex items-center">
            <input
              type="radio"
              name="payment-type"
              defaultChecked={i === 0}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-3 text-sm font-medium text-gray-700">
              {m.title}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
