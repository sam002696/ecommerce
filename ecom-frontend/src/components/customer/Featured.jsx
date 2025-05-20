import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";

const Featured = () => {
  const { featuredProducts } = useSelector((state) => state.customerProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_FEATURED_PRODUCTS" });
  }, [dispatch]);
  return (
    <>
      <section aria-labelledby="featureds-heading">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="sm:flex sm:items-baseline sm:justify-between">
            <h2
              id="featureds-heading"
              className="text-2xl font-bold tracking-tight text-gray-900"
            >
              Our Feautured
            </h2>
            {/* <a
              href="#"
              className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
            >
              Browse all featureds
              <span aria-hidden="true"> &rarr;</span>
            </a> */}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 lg:gap-x-8">
            {featuredProducts.map((featured) => (
              <div key={featured.id} className="group relative">
                <img
                  // alt={featured.imageAlt}
                  src={featured.image_url}
                  className="h-96 w-full rounded-lg object-cover group-hover:opacity-75 sm:aspect-2/3 sm:h-auto"
                />
                <h3 className="mt-4 text-base font-semibold text-gray-900">
                  <Link to="">
                    <span className="absolute inset-0" />
                    {featured.title}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-500">{featured.price}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 sm:hidden">
            <a
              href="#"
              className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Browse all featureds
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Featured;
