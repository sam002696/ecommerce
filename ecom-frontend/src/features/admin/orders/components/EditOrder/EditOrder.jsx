import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import OrderStatus from "./OrderStatus";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

const EditOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { payment_status, status } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch({
      type: "FETCH_SINGLE_ADMIN_ORDER",
      payload: { id },
    });
  }, [dispatch, id]);

  const initialValues = {
    payment_status: payment_status,
    status: status,
  };

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch({
      type: "UPDATE_ADMIN_ORDER",
      payload: {
        id,
        data: values,
      },
    });
    setSubmitting(false);
  };

  console.log("payment_status", payment_status);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="divide-y divide-gray-900/10 space-y-12">
            <OrderStatus />
          </div>
          <div className="flex justify-end px-4 pb-8 mt-5">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              Update Order
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditOrder;
