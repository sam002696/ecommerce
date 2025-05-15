import React from "react";
import { useFormikContext } from "formik";
import CheckboxGroup from "../../../../../components/common/CheckboxGroup";

const ProductSize = () => {
  const { values, setFieldValue, errors, touched } = useFormikContext();

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-8 py-10 md:grid-cols-2">
      <div className="px-4 sm:px-0">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Product size
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Set available sizes for this product
        </p>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl md:col-span-2">
        <div className="px-4 py-6 sm:p-8">
          <CheckboxGroup
            label="Available Sizes"
            name="sizes"
            options={[
              { value: 1, label: "S" },
              { value: 2, label: "M" },
              { value: 3, label: "L" },
              { value: 4, label: "XL" },
            ]}
            values={values.sizes}
            onChange={setFieldValue}
            error={touched.sizes && errors.sizes}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductSize;
