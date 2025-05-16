import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router";

import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";

const Login = () => {
  const isLoading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Setting up form handling with Formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // Form validation rules using Yup
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    // What happens when the form is submitted
    onSubmit: (values) => {
      console.log("values", values);
      dispatch({
        type: "LOGIN",
        payload: {
          loginData: values,
          navigate,
        },
      });
    },
  });

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          alt="Taskify"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-16 w-auto"
        />
        <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <Input
              label="Email address"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : ""
              }
            />

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : ""
              }
            />

            <div className="flex items-center justify-end">
              <div className="text-sm">
                <Link
                  to="/register"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  New user? Register here
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
