import React, { useState } from "react";
import FileInput from "../../../../../components/common/FileInput";

const Gallery = () => {
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const previewURLs = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages(previewURLs);
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

              {images.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-4">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className="w-24 h-24 overflow-hidden rounded-md border"
                    >
                      <img
                        src={img.preview}
                        alt={`Preview ${index}`}
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

export default Gallery;
