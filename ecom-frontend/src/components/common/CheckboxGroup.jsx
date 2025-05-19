import React from "react";

const CheckboxGroup = ({
  label,
  name,
  options,
  values = [],
  onChange,
  error,
  direction = "horizontal",
}) => {
  const handleChange = (value) => {
    if (values.includes(value)) {
      onChange(
        name,
        values.filter((v) => v !== value)
      );
    } else {
      onChange(name, [...values, value]);
    }
  };

  return (
    <div className="w-full">
      {label && (
        <p className="block text-sm font-medium text-gray-900 mb-2">{label}</p>
      )}
      <div
        className={`flex flex-wrap gap-4 ${
          direction === "vertical" ? "flex-col" : "flex-row"
        }`}
      >
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 text-sm text-gray-700"
          >
            <input
              type="checkbox"
              checked={values.includes(option.value)}
              onChange={() => handleChange(option.value)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            {option.label}
          </label>
        ))}
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default CheckboxGroup;
