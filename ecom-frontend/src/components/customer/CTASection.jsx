import React from "react";
import { Link } from "react-router";

import ctaImage1 from "../../assets/images/cta/cta-image-1.jpg";
import ctaImage2 from "../../assets/images/cta/cta-image-2.jpg";
import ctaImage3 from "../../assets/images/cta/cta-image-3.jpg";
import ctaImage4 from "../../assets/images/cta/cta-image-4.jpg";
import ctaImage5 from "../../assets/images/cta/cta-image-5.jpg";
import ctaImage6 from "../../assets/images/cta/cta-image-6.jpg";

const CTASection = () => {
  return (
    <>
      <section aria-labelledby="sale-heading">
        <div className="overflow-hidden pt-32 sm:pt-14">
          <div className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="relative pt-48 pb-16 sm:pb-24">
                <div>
                  <h2
                    id="sale-heading"
                    className="text-4xl font-bold tracking-tight text-white md:text-5xl"
                  >
                    Final Stock.
                    <br />
                    Up to 50% off.
                  </h2>
                  <div className="mt-6 text-base">
                    <Link to="/shop" className="font-semibold text-white">
                      Shop the sale
                      <span aria-hidden="true"> &rarr;</span>
                    </Link>
                  </div>
                </div>

                <div className="absolute -top-32 left-1/2 -translate-x-1/2 transform sm:top-6 sm:translate-x-0">
                  <div className="ml-24 flex min-w-max space-x-6 sm:ml-3 lg:space-x-8">
                    <div className="flex space-x-6 sm:flex-col sm:space-y-6 sm:space-x-0 lg:space-y-8">
                      <div className="shrink-0">
                        <img
                          alt=""
                          src={ctaImage1}
                          className="size-64 rounded-lg object-cover md:size-72"
                        />
                      </div>

                      <div className="mt-6 shrink-0 sm:mt-0">
                        <img
                          alt=""
                          src={ctaImage2}
                          className="size-64 rounded-lg object-cover md:size-72"
                        />
                      </div>
                    </div>
                    <div className="flex space-x-6 sm:-mt-20 sm:flex-col sm:space-y-6 sm:space-x-0 lg:space-y-8">
                      <div className="shrink-0">
                        <img
                          alt=""
                          src={ctaImage3}
                          className="size-64 rounded-lg object-cover md:size-72"
                        />
                      </div>

                      <div className="mt-6 shrink-0 sm:mt-0">
                        <img
                          alt=""
                          src={ctaImage4}
                          className="size-64 rounded-lg object-cover md:size-72"
                        />
                      </div>
                    </div>
                    <div className="flex space-x-6 sm:flex-col sm:space-y-6 sm:space-x-0 lg:space-y-8">
                      <div className="shrink-0">
                        <img
                          alt=""
                          src={ctaImage5}
                          className="size-64 rounded-lg object-cover md:size-72"
                        />
                      </div>

                      <div className="mt-6 shrink-0 sm:mt-0">
                        <img
                          alt=""
                          src={ctaImage6}
                          className="size-64 rounded-lg object-cover md:size-72"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CTASection;
