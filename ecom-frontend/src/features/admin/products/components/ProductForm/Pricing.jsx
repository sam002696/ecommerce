import React from "react";
import { useFormikContext } from "formik";
import Input from "../../../../../components/common/Input";

const Pricing = () => {
  const { values, handleChange, handleBlur, touched, errors } =
    useFormikContext();

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-8 py-10 md:grid-cols-2">
      <div className="px-4 sm:px-0">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Pricing
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Set a price and optional discount.
        </p>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl md:col-span-2">
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <Input
                label="Price"
                type="number"
                name="price"
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.price && errors.price}
              />
            </div>

            <div className="sm:col-span-3">
              <Input
                label="Discounted Price"
                type="number"
                name="compare_price"
                value={values.compare_price}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.compare_price && errors.compare_price}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
