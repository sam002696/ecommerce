import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ProductInfo from "./ProductInfo";
import Pricing from "./Pricing";
import Inventory from "./Inventory";
import Gallery from "./Gallery";

const initialValues = {
  title: "",
  price: "",
  category_id: "",
  sku: "",
  is_featured: "",
  status: "",
  compare_price: "",
  description: "",
  short_description: "",
  image: null,
  brand_id: "",
  qty: "",
  barcode: "",
};

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  category_id: Yup.string()
    .required("Category is required")
    .notOneOf([""], "Category is required"),
  sku: Yup.string().required("SKU is required"),
  is_featured: Yup.string().required("Featured is required"),
  status: Yup.number()
    .required("Status is required")
    .notOneOf([""], "Status is required"),
});

const CreateProduct = () => {
  const dispatch = useDispatch();
  const handleSubmit = (values) => {
    console.log("Submitting full product:", values);

    dispatch({
      type: "CREATE_PRODUCT",
      payload: {
        productData: values,
      },
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div className="divide-y divide-gray-900/10 space-y-12">
          <ProductInfo />
          <Pricing />
          <Inventory />
          <Gallery />
        </div>
        <div className="flex justify-end px-4 pb-8">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            Submit Product
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default CreateProduct;
