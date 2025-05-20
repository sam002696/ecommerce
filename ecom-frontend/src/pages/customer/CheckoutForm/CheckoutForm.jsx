// src/features/customer/checkout/CheckoutForm.jsx
// import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomerLayout from "../../../layouts/CustomerLayout/CustomerLayout";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { ContactInfo } from "./ContactInfo";
import { ShippingInfo } from "./ShippingInfo";
import { DeliveryMethod } from "./DeliveryMethod";
import { PaymentMethod } from "./PaymentMethod";
import { OrderReview } from "./OrderReview";

const deliveryMethods = [
  {
    id: 1,
    title: "Standard",
    turnaround: "4–10 business days",
    price: "$5.00",
  },
  { id: 2, title: "Express", turnaround: "2–5 business days", price: "$16.00" },
];
const paymentMethods = [{ id: "cod", title: "Cash on delivery" }];

export default function CheckoutForm() {
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((s) => s.customerCart);
  // const [selectedDelivery, setSelectedDelivery] = useState(deliveryMethods[0]);

  const shippingCost = items.length ? 100 : 0;
  const tax = Math.round((totalAmount + shippingCost) * 0.1 * 100) / 100;
  const grandTotal = totalAmount + shippingCost + tax;

  const initialValues = {
    // ContactInfo
    email: "",
    // ShippingInfo
    name: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    name: Yup.string().required("Required"),
    mobile: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    zip: Yup.string().required("Required"),
  });

  const handleSubmit = (values) => {
    const payload = {
      name: values.name,
      email: values.email,
      mobile: values.mobile,
      address: values.address,
      city: values.city,
      state: values.state,
      zip: values.zip,
      subtotal: totalAmount,
      shipping: shippingCost,
      tax,
      discount: 0,
      grand_total: grandTotal,
      payment_status: "",
      status: "",
      cart: items.map((i) => ({
        product_id: i.id,
        qty: i.quantity,
        price: i.price,
        size: i.size,
        name: i.title,
      })),
    };

    dispatch({ type: "PLACE_ORDER", payload });
  };

  return (
    <CustomerLayout>
      <div className="bg-gray-50">
        <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleBlur, errors, touched }) => (
              <Form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                <div className="space-y-8">
                  <ContactInfo
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                  />

                  <ShippingInfo
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                  />

                  <DeliveryMethod
                    methods={deliveryMethods}
                    selectedId={values.deliveryId}
                    // onChange={(method) =>
                    //   handleChange({
                    //     target: { name: "deliveryId", value: method.id },
                    //   }) || setSelectedDelivery(method)
                    // }
                  />

                  <PaymentMethod
                    methods={paymentMethods}
                    selected={values.paymentMethod}
                    onChange={(val) =>
                      handleChange({
                        target: { name: "paymentMethod", value: val },
                      })
                    }
                  />
                </div>

                <OrderReview
                  subtotal={totalAmount}
                  shipping={shippingCost}
                  tax={tax}
                  grandTotal={grandTotal}
                  items={items}
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </CustomerLayout>
  );
}
