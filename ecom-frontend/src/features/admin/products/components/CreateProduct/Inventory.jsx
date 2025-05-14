import React from "react";
import { useFormikContext } from "formik";
import Input from "../../../../../components/common/Input";

const Inventory = () => {
  const { values, handleChange, handleBlur, touched, errors } =
    useFormikContext();

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-8 py-10 md:grid-cols-2">
      <div className="px-4 sm:px-0">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Inventory
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Track product stock and identifiers.
        </p>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl md:col-span-2">
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <Input
                label="SKU"
                type="text"
                name="sku"
                value={values.sku}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.sku && errors.sku}
              />
            </div>

            <div className="sm:col-span-3">
              <Input
                label="Barcode"
                type="text"
                name="barcode"
                value={values.barcode}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.barcode && errors.barcode}
              />
            </div>

            <div className="sm:col-span-3">
              <Input
                label="Quantity"
                type="number"
                name="quantity"
                value={values.quantity}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.quantity && errors.quantity}
              />
            </div>

            <div className="sm:col-span-3">
              <Input
                label="Status"
                type="text"
                name="status"
                value={values.status}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.status && errors.status}
              />
            </div>

            <div className="sm:col-span-3">
              <Input
                label="Featured"
                type="text"
                name="featured"
                value={values.featured}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.featured && errors.featured}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
