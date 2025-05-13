import React from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Input from "../../../../components/common/Input";
import Textarea from "../../../../components/common/Textarea";

const CreateProduct = () => {
  return (
    <div className="divide-y divide-gray-900/10 space-y-12">
      {/* Profile Section */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Profile
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>
        </div>

        <form className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First name
                </label>
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="mt-2 block w-full rounded-md border-0 bg-white px-3 py-1.5 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  About
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 text-sm"
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about yourself.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <UserCircleIcon
                    className="h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50"
                  >
                    Change
                  </button>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cover photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Personal Information Section */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 py-10 md:grid-cols-2">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Product info
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p>
        </div>

        <form className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <Input
                  label="Title"
                  type="text"
                  name="name"
                  //   value={formik.values.name}
                  //   onChange={formik.handleChange}
                  //   onBlur={formik.handleBlur}
                  //   error={
                  //     formik.touched.name && formik.errors.name ? formik.errors.name : ""
                  //   }
                />
              </div>

              <div className="sm:col-span-2">
                <Input
                  label="Category"
                  type="text"
                  name="name"
                  //   value={formik.values.name}
                  //   onChange={formik.handleChange}
                  //   onBlur={formik.handleBlur}
                  //   error={
                  //     formik.touched.name && formik.errors.name ? formik.errors.name : ""
                  //   }
                />
              </div>

              <div className="sm:col-span-2">
                <Input
                  label="Brand"
                  type="text"
                  name="name"
                  //   value={formik.values.name}
                  //   onChange={formik.handleChange}
                  //   onBlur={formik.handleBlur}
                  //   error={
                  //     formik.touched.name && formik.errors.name ? formik.errors.name : ""
                  //   }
                />
              </div>

              <div className="sm:col-span-3">
                <Textarea
                  label="Short Description"
                  name="description"
                  value={"Hello"}
                  //   onChange={formik.handleChange}
                  //   onBlur={formik.handleBlur}
                  maxLength={200} // Enforce max length
                  //   error={
                  //     formik.touched.description && formik.errors.description
                  //       ? formik.errors.description
                  //       : ""
                  //   }
                />
              </div>

              <div className="sm:col-span-3">
                <Textarea
                  label="Description"
                  name="description"
                  value={"Hello"}
                  //   onChange={formik.handleChange}
                  //   onBlur={formik.handleBlur}
                  maxLength={200} // Enforce max length
                  //   error={
                  //     formik.touched.description && formik.errors.description
                  //       ? formik.errors.description
                  //       : ""
                  //   }
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
