import React from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const InputSelect = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  options,
  error,
  ref,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm/6 font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      <div className="mt-2 relative grid grid-cols-1">
        <select
          id={name}
          ref={ref}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`block w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 border sm:text-sm/6
            ${error ? "border-red-500 focus:border-red-500" : "border-gray-300"}
            focus:outline-none focus:ring-2 focus:ring-indigo-600`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
        />
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default InputSelect;
