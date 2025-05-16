import React, { useEffect, useRef } from "react";
import { useFormikContext } from "formik";
import { useDispatch, useSelector } from "react-redux";
import FileInput from "../../../../../components/common/FileInput";
import Button from "../../../../../components/common/Button";

const GalleryEdit = ({ productId }) => {
  const dispatch = useDispatch();
  const { values, setFieldValue } = useFormikContext();

  const reduxGallery = useSelector(
    (state) => state.adminProducts.currentProduct?.gallery || []
  );

  const gallery = React.useMemo(() => values.gallery || [], [values.gallery]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0 && productId) {
      dispatch({
        type: "SAVE_PRODUCT_IMAGE",
        payload: {
          files,
          productId,
        },
      });
    }
  };

  // Syncing Redux gallery to Formik
  const prevGalleryRef = useRef([]);

  useEffect(() => {
    const ids = reduxGallery.map((img) => img.id);
    const prevIds = prevGalleryRef.current.map((img) => img.id);

    const hasChanged =
      ids.length !== prevIds.length || !ids.every((id, i) => id === prevIds[i]);

    if (hasChanged) {
      prevGalleryRef.current = reduxGallery;

      const merged = [
        ...gallery,
        ...reduxGallery.filter(
          (newImg) => !gallery.some((oldImg) => oldImg.id === newImg.id)
        ),
      ];

      setFieldValue("gallery", merged);
    }
  }, [reduxGallery, gallery, setFieldValue]);

  const handleDefaultImageChange = (fileName) => {
    // console.log("fileName", fileName);
    dispatch({
      type: "CHANGE_DEFAULT_IMAGE",
      payload: {
        productId,
        image: fileName,
      },
    });
  };

  console.log("gallery", gallery);

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 py-10">
      <div className="px-4 sm:px-0">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Gallery
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl md:col-span-2">
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <FileInput
                label="Upload Product Images"
                name="image"
                onChange={handleFileChange}
                accept="image/*"
                multiple
              />
            </div>
          </div>
        </div>

        <ul
          role="list"
          className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8 px-4 py-6"
        >
          {gallery.map((file, index) => (
            <li key={file.id || index} className="relative">
              <div className="group overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                <img
                  alt={file.name || `Gallery image ${index}`}
                  src={file.thumbnail_url || file.original_url}
                  className="pointer-events-none aspect-10/7 object-cover group-hover:opacity-75"
                />
              </div>
              <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
                {file.name}
              </p>

              <div className="mt-2 flex gap-2">
                <Button
                  onClick={() => handleDefaultImageChange(file.name)}
                  variant="primary"
                  isDisabled={file.is_default}
                >
                  {file?.is_default === 1 ? "Default image" : "Set as Default"}
                </Button>
                <Button variant="danger">Delete</Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GalleryEdit;
