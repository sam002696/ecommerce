import React, { useState } from "react";

const FileInput = ({
  label,
  name,
  onChange,
  accept = "image/*",
  error,
  multiple = false,
}) => {
  const [fileNames, setFileNames] = useState("No file chosen");

  const handleLocalChange = (e) => {
    const files = Array.from(e.target.files);
    setFileNames(
      files.length > 0 ? files.map((f) => f.name).join(", ") : "No file chosen"
    );
    onChange && onChange(e); // bubble event up
  };

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900 mb-2"
        >
          {label}
        </label>
      )}
      <div className="flex items-center gap-4">
        <input
          id={name}
          name={name}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleLocalChange}
          className="sr-only"
        />
        <label
          htmlFor={name}
          className="cursor-pointer rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50"
        >
          Choose File
        </label>
        <span
          id={`${name}-filename`}
          className="text-sm text-gray-600 truncate max-w-xs"
        >
          {fileNames}
        </span>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FileInput;
