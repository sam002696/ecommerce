import React from "react";
import InputSelect from "../../../../../components/common/InputSelect";
import { useFormikContext } from "formik";

const OrderStatus = () => {
  const { values, handleChange, handleBlur, errors, touched } =
    useFormikContext();

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl md:col-span-2">
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* Payment status */}
            <div className="sm:col-span-2">
              <InputSelect
                label="Payment status"
                name="payment_status"
                value={values.payment_status}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.payment_status && errors.payment_status}
                options={[
                  { value: "", label: "Select payment status" },
                  { value: "paid", label: "Paid" },
                  { value: "not paid", label: "Not paid" },
                ]}
              />
            </div>

            {/* Order status */}
            <div className="sm:col-span-2">
              <InputSelect
                label="Order status"
                name="status"
                value={values.status}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.status && errors.status}
                options={[
                  { value: "", label: "Select status" },
                  { value: "pending", label: "Pending" },
                  { value: "shipped", label: "Shipped" },
                  { value: "delivered", label: "Delivered" },
                  { value: "cancelled", label: "Cancelled" },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
