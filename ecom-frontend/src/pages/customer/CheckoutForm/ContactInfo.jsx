import Input from "../../../components/common/Input";

export function ContactInfo({
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
}) {
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900">Contact information</h2>
      <div className="mt-4">
        <Input
          label="Email address"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && errors.email}
        />
      </div>
    </div>
  );
}
