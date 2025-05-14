import React from "react";
import { useFormikContext } from "formik";
import Input from "../../../../../components/common/Input";
import Textarea from "../../../../../components/common/Textarea";
import InputSelect from "../../../../../components/common/InputSelect";

const ProductInfo = () => {
  const { values, handleChange, handleBlur, touched, errors } =
    useFormikContext();

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
      <div className="px-4 sm:px-0">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Product Info
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Provide basic information about your product.
        </p>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl md:col-span-2">
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <Input
                label="Title"
                name="title"
                type="text"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.title && errors.title}
              />
            </div>

            <div className="sm:col-span-2">
              <InputSelect
                label="Category"
                name="category"
                value={values.category}
                onChange={handleChange}
                options={[
                  { value: "", label: "Select category" },
                  { value: "To Do", label: "To Do" },
                  { value: "In Progress", label: "In Progress" },
                  { value: "Done", label: "Done" },
                ]}
                error={
                  touched.category && errors.category ? errors.category : ""
                }
              />
            </div>

            <div className="sm:col-span-2">
              <InputSelect
                label="Brand"
                name="brand"
                value={values.brand}
                onChange={handleChange}
                options={[
                  { value: "", label: "Select brand" },
                  { value: "To Do", label: "To Do" },
                  { value: "In Progress", label: "In Progress" },
                  { value: "Done", label: "Done" },
                ]}
                error={touched.brand && errors.brand ? errors.brand : ""}
              />
            </div>

            <div className="sm:col-span-3">
              <Textarea
                label="Short Description"
                name="shortDescription"
                value={values.shortDescription}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={200}
                error={touched.shortDescription && errors.shortDescription}
              />
            </div>

            <div className="sm:col-span-3">
              <Textarea
                label="Description"
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={200}
                error={touched.description && errors.description}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
