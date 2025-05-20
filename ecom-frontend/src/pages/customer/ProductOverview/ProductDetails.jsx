import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import {
  CurrencyDollarIcon,
  GlobeAmericasIcon,
  CurrencyBangladeshiIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import CustomerLayout from "../../../layouts/CustomerLayout/CustomerLayout";
import { addToCart } from "../../../features/customer/cart/slice";

const policies = [
  {
    name: "International delivery",
    icon: GlobeAmericasIcon,
    description: "Get your order in 2 years",
  },
  {
    name: "Loyalty rewards",
    icon: CurrencyDollarIcon,
    description: "Don't look at other tees",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { singleProduct } = useSelector((state) => state.customerProducts);

  useEffect(() => {
    dispatch({ type: "FETCH_SINGLE_PRODUCT", payload: { id } });
  }, [id, dispatch]);

  const images = singleProduct?.product_images || [];
  const sizesData = singleProduct?.product_size || [];

  const sizeMap = {
    1: "XS",
    2: "S",
    3: "M",
    4: "L",
    5: "XL",
    6: "2XL",
    7: "3XL",
  };

  const sizes = sizesData.map((s) => ({
    name: sizeMap[s.size_id] || `Size ${s.size_id}`,
    inStock: true,
  }));

  const [selectedSize, setSelectedSize] = useState(sizes[0] || null);

  console.log("selectedSize", selectedSize);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!singleProduct || !selectedSize) return;

    dispatch(
      addToCart({
        id: singleProduct.id,
        title: singleProduct.title,
        price: singleProduct.price,
        size: selectedSize.name,
        image_url: singleProduct.image_url,
      })
    );
  };

  return (
    <CustomerLayout>
      <div className="bg-white">
        <div className="pt-6 pb-16 sm:pb-24">
          <nav
            aria-label="Breadcrumb"
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          >
            <ol role="list" className="flex items-center space-x-4">
              <li>
                <a href="#" className="text-sm font-medium text-gray-900">
                  Shop
                </a>
              </li>
              <li className="text-sm font-medium text-gray-500">
                {singleProduct?.title}
              </li>
            </ol>
          </nav>

          <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
              {/* Product Title and Price */}
              <div className="lg:col-span-5 lg:col-start-8">
                <div className="flex justify-between">
                  <h1 className="text-xl font-medium text-gray-900">
                    {singleProduct?.title}
                  </h1>
                  <p className="text-xl font-medium text-gray-900 flex items-center gap-1">
                    <CurrencyBangladeshiIcon className="w-5 h-5 text-gray-700" />
                    {singleProduct?.price}

                    {singleProduct?.compare_price && (
                      <span className="ml-4 flex items-center text-sm line-through text-gray-400">
                        <CurrencyBangladeshiIcon className="w-4 h-4 mr-1" />
                        {singleProduct.compare_price}
                      </span>
                    )}
                  </p>
                </div>
                {/* Static Reviews */}
                <div className="mt-4">
                  <div className="flex items-center">
                    <p className="text-sm text-gray-700">4.2</p>
                    <div className="ml-1 flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            4.2 > rating ? "text-yellow-400" : "text-gray-200",
                            "h-5 w-5"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <span className="ml-4 text-sm text-gray-300">·</span>
                    <a
                      href="#"
                      className="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      120 reviews
                    </a>
                  </div>
                </div>
              </div>

              {/* Images */}
              <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
                <h2 className="sr-only">Images</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                  {images[0] && (
                    <img
                      src={images[0].image_url}
                      alt="Product Image 1"
                      className="rounded-lg lg:col-span-2 lg:row-span-2"
                    />
                  )}
                  {images[1] && (
                    <img
                      src={images[1].image_url}
                      alt="Product Image 2"
                      className="hidden lg:block rounded-lg"
                    />
                  )}
                  {images[2] && (
                    <img
                      src={images[2].image_url}
                      alt="Product Image 3"
                      className="hidden lg:block rounded-lg"
                    />
                  )}
                </div>
              </div>

              {/* Sizes and Actions */}
              <div className="mt-8 lg:col-span-5">
                <form>
                  {/* Sizes */}
                  <div>
                    <div className="flex items-center justify-between">
                      <h2 className="text-sm font-medium text-gray-900">
                        Size
                      </h2>
                      <a
                        href="#"
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        See sizing chart
                      </a>
                    </div>
                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="grid grid-cols-3 gap-3 mt-2 sm:grid-cols-6"
                    >
                      {sizes.map((size) => (
                        <Radio
                          key={size.name}
                          value={size}
                          disabled={!size.inStock}
                          className={() =>
                            classNames(
                              size.inStock
                                ? "cursor-pointer"
                                : "cursor-not-allowed opacity-25",
                              // base styles
                              "flex items-center justify-center rounded-md border px-3 py-3 text-sm font-medium uppercase sm:flex-1",
                              // border/background/text based on checked state
                              size.name == selectedSize?.name
                                ? "border-transparent bg-indigo-600 text-white hover:bg-indigo-700"
                                : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50",
                              // focus ring
                              "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            )
                          }
                        >
                          {size.name}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    type="submit"
                    onClick={handleAddToCart}
                    className="mt-8 w-full rounded-md bg-indigo-600 px-8 py-3 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Add to cart
                  </button>
                </form>

                {/* Description */}
                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">
                    Description
                  </h2>
                  <div className="mt-4 text-sm text-gray-500">
                    {singleProduct?.description}
                  </div>
                </div>

                {/* Fabric & Care (Static) */}
                <div className="mt-8 border-t border-gray-200 pt-8">
                  <h2 className="text-sm font-medium text-gray-900">
                    Fabric &amp; Care
                  </h2>
                  <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-gray-500">
                    <li>Pre-washed and pre-shrunk</li>
                    <li>Machine wash cold with similar colors</li>
                    <li>Ultra-soft cotton blend</li>
                    <li>Ethically made</li>
                  </ul>
                </div>

                {/* Policies */}
                <section className="mt-10" aria-labelledby="policies-heading">
                  <h2 id="policies-heading" className="sr-only">
                    Our Policies
                  </h2>
                  <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {policies.map((policy) => (
                      <div
                        key={policy.name}
                        className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center"
                      >
                        <policy.icon
                          className="mx-auto h-6 w-6 text-gray-400"
                          aria-hidden="true"
                        />
                        <dt className="mt-4 text-sm font-medium text-gray-900">
                          {policy.name}
                        </dt>
                        <dd className="mt-1 text-sm text-gray-500">
                          {policy.description}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default ProductDetails;
