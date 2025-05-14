import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ProductInfo from "./ProductInfo";
import Pricing from "./Pricing";
import Inventory from "./Inventory";
import Gallery from "./Gallery";

const initialValues = {
  title: "",
  category: "",
  brand: "",
  shortDescription: "",
  description: "",
  price: "",
  quantity: "",
  images: [],
};

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  category: Yup.string().required("Category is required"),
  brand: Yup.string().required("Brand is required"),
  shortDescription: Yup.string()
    .max(200)
    .required("Short description is required"),
  description: Yup.string().max(200).required("Description is required"),
  price: Yup.number().required("Price is required"),
  quantity: Yup.number().required("Quantity is required"),
});

const CreateProduct = () => {
  const handleSubmit = (values) => {
    console.log("Submitting full product:", values);
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
