import React, { useEffect } from "react";
import { useFormikContext } from "formik";
import Input from "../../../../../components/common/Input";
import Textarea from "../../../../../components/common/Textarea";
import InputSelect from "../../../../../components/common/InputSelect";
import { useDispatch, useSelector } from "react-redux";

const ProductInfo = () => {
  const dispatch = useDispatch();
  const { brands, categories } = useSelector((state) => state.adminProducts);
  const { values, handleChange, handleBlur, touched, errors } =
    useFormikContext();

  useEffect(() => {
    dispatch({
      type: "FETCH_BRANDS",
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch({
      type: "FETCH_CATEGORIES",
    });
  }, [dispatch]);

  // console.log("brands", brands);

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
                name="category_id"
                value={values.category_id}
                onChange={handleChange}
                onBlur={handleBlur}
                options={[
                  { value: "", label: "Select category" },
                  ...categories.map((category) => ({
                    value: category.id,
                    label: category.name,
                  })),
                ]}
                error={touched.category_id && errors.category_id}
              />
            </div>

            <div className="sm:col-span-2">
              <InputSelect
                label="Brand"
                name="brand_id"
                value={values.brand_id}
                onChange={handleChange}
                onBlur={handleBlur}
                options={[
                  { value: "", label: "Select brand" },
                  ...brands.map((brand) => ({
                    value: brand.id,
                    label: brand.name,
                  })),
                ]}
                error={touched.brand_id && errors.brand_id}
              />
            </div>

            <div className="sm:col-span-3">
              <Textarea
                label="Short Description"
                name="short_description"
                value={values.short_description}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={200}
                error={touched.short_description && errors.short_description}
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
