import Input from "../../../components/common/Input";

export function ShippingInfo({
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
}) {
  return (
    <div className="mt-10 border-t border-gray-200 pt-10">
      <h2 className="text-lg font-medium text-gray-900">
        Shipping information
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
        {/* Full name */}
        <div className="sm:col-span-2">
          <Input
            label="Full Name"
            name="name"
            placeholder="John Doe"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && errors.name}
          />
        </div>

        {/* Mobile */}
        <div className="sm:col-span-2">
          <Input
            label="Mobile"
            name="mobile"
            placeholder="1234567890"
            value={values.mobile}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.mobile && errors.mobile}
          />
        </div>

        {/* Address */}
        <div className="sm:col-span-2">
          <Input
            label="Address"
            name="address"
            placeholder="123 Main Street"
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.address && errors.address}
          />
        </div>

        {/* City */}
        <div>
          <Input
            label="City"
            name="city"
            placeholder="New York"
            value={values.city}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.city && errors.city}
          />
        </div>

        {/* State / Province */}
        <div>
          <Input
            label="State / Province"
            name="state"
            placeholder="NY"
            value={values.state}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.state && errors.state}
          />
        </div>

        {/* ZIP / Postal Code */}
        <div className="sm:col-span-2">
          <Input
            label="ZIP / Postal Code"
            name="zip"
            placeholder="10001"
            value={values.zip}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.zip && errors.zip}
          />
        </div>
      </div>
    </div>
  );
}
