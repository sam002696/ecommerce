import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

export function DeliveryMethod({ methods, selected, onChange }) {
  return (
    <div className="mt-10 border-t border-gray-200 pt-10">
      <legend className="text-lg font-medium text-gray-900">
        Delivery method
      </legend>
      <RadioGroup
        value={selected}
        onChange={onChange}
        className="mt-4 grid gap-y-6 sm:grid-cols-2 sm:gap-x-4"
      >
        {methods.map((m) => (
          <RadioGroup.Option
            key={m.id}
            value={m}
            className={({ checked }) =>
              `relative flex cursor-pointer rounded-lg border p-4 ${
                checked
                  ? "border-indigo-600 bg-white"
                  : "border-gray-300 bg-white"
              }`
            }
          >
            {({ checked }) => (
              <>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{m.title}</p>
                  <p className="mt-1 text-sm text-gray-500">{m.turnaround}</p>
                  <p className="mt-6 text-sm font-medium text-gray-900">
                    {m.price}
                  </p>
                </div>
                <CheckCircleIcon
                  className={`h-5 w-5 text-indigo-600 ${
                    !checked && "invisible"
                  }`}
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </RadioGroup>
    </div>
  );
}
