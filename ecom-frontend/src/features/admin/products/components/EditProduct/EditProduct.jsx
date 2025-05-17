import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router";

import ProductInfo from "../ProductForm/ProductInfo";
import ProductSize from "../ProductForm/ProductSize";
import Pricing from "../ProductForm/Pricing";
import Inventory from "../ProductForm/Inventory";

import GalleryEdit from "../ProductForm/GalleryEdit";
import { transformProductForForm } from "../../utils/transformProductForForm";

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

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const product = useSelector((state) => state?.adminProducts?.currentProduct);

  useEffect(() => {
    if (id) {
      dispatch({ type: "GET_SINGLE_PRODUCT", payload: { id } });
    }
  }, [id, dispatch]);

  const handleSubmit = (values) => {
    dispatch({
      type: "EDIT_PRODUCT",
      payload: {
        id,
        data: values,
        // navigate,
      },
    });
  };

  return (
    <Formik
      initialValues={transformProductForForm(product)}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      <Form>
        <div className="divide-y divide-gray-900/10 space-y-12">
          <ProductInfo />
          <ProductSize />
          <Pricing />
          <Inventory />
          <GalleryEdit productId={id} />
        </div>
        <div className="flex justify-end px-4 pb-8">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            Update Product
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default EditProduct;
