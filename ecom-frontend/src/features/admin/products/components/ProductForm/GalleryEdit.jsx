import React from "react";
import { useFormikContext } from "formik";
import FileInput from "../../../../../components/common/FileInput";
import { useDispatch } from "react-redux";

const GalleryEdit = () => {
  const { values } = useFormikContext();
  const dispatch = useDispatch();

  const gallery = values.gallery || [];

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      dispatch({ type: "UPLOAD_TEMP_IMAGE", payload: files });
    }
  };

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

              {gallery.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-4">
                  {gallery.map((img, index) => (
                    <div
                      key={img.id || index}
                      className="w-24 h-24 overflow-hidden rounded-md border"
                    >
                      <img
                        src={img.thumbnail_url || img.original_url}
                        alt={img.name || `Gallery image ${index}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryEdit;
