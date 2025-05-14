import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { getCastedValue } from "../../utils/getCastedValue";

const InputSelect = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  options = [],
  error,
  ref,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      <div className="mt-3 relative grid grid-cols-1">
        <select
          id={name}
          ref={ref}
          name={name}
          value={value}
          onBlur={onBlur}
          onChange={(e) => {
            onChange({
              target: {
                name,
                value: getCastedValue(e.target.value, options),
              },
            });
          }}
          className={`block w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 border sm:text-sm focus:outline-none focus:ring-2
  ${
    error
      ? "border-red-500 focus:ring-red-500"
      : "border-gray-300 focus:ring-indigo-600"
  }`}
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
