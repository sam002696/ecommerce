const Input = ({
  label,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  error,
  onBlur,
  onKeyDown,
  autofocus = false,
  ref,
}) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      <div className="mt-3 relative grid grid-cols-1">
        <input
          ref={ref}
          type={type}
          name={name}
          value={value || ""}
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          autoFocus={autofocus}
          className={`block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 border placeholder:text-gray-400 focus:outline-none focus:ring-2 sm:text-sm
          ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-indigo-600"
          }`}
          data-dndkit-disable-drag
        />
      </div>

      {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
    </div>
  );
};

export default Input;
