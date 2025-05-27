// import { PlusIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import CustomerLayout from "../../../layouts/CustomerLayout/CustomerLayout";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import CheckboxGroup from "../../../components/common/CheckboxGroup";
import { setProductFilters } from "../../../features/customer/products/slice";
import Pagination from "../../../components/common/Pagination";

const breadcrumbs = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Shop", href: "/shop" },
];

const ShopPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { list, categories, brands, productFilters, meta } = useSelector(
    (state) => state.customerProducts
  );

  useEffect(() => {
    dispatch({
      type: "FETCH_CUSTOMER_PRODUCTS",
      payload: { page: currentPage },
    });
  }, [dispatch, currentPage]);

  useEffect(() => {
    dispatch({ type: "FETCH_CUSTOMER_BRANDS" });
    dispatch({ type: "FETCH_CUSTOMER_CATEGORIES" });
  }, [dispatch]);

  const handleFilterChange = (name, values) => {
    const updatedFilters = {
      ...productFilters,
      [name]: values,
    };

    dispatch(setProductFilters(updatedFilters));
    dispatch({
      type: "FETCH_CUSTOMER_PRODUCTS",
      payload: { page: currentPage },
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <CustomerLayout>
      <div>
        <div className="border-b border-gray-200">
          <nav
            aria-label="Breadcrumb"
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          >
            <ol role="list" className="flex items-center space-x-4 py-4">
              {breadcrumbs.map((breadcrumb) => (
                <li key={breadcrumb.id}>
                  <div className="flex items-center">
                    <a
                      href={breadcrumb.href}
                      className="mr-4 text-sm font-medium text-gray-900"
                    >
                      {breadcrumb.name}
                    </a>
                    <svg
                      viewBox="0 0 6 20"
                      aria-hidden="true"
                      className="h-5 w-auto text-gray-300"
                    >
                      <path
                        d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </li>
              ))}
              {/* <li className="text-sm">
                <a
                  href="#"
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  New Arrivals
                </a>
              </li> */}
            </ol>
          </nav>
        </div>

        <main className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
          <div className="border-b border-gray-200 pt-24 pb-10">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Browse Our Collection
            </h1>
            <p className="mt-4 text-base text-gray-500">
              Explore a wide range of quality products handpicked just for you.
              Use the filters to find exactly what you're looking for.
            </p>
          </div>

          <div className="pt-12 pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            <aside>
              <h2 className="sr-only">Filters</h2>

              <div className="hidden lg:block">
                <div className="divide-y divide-gray-200 space-y-6">
                  <CheckboxGroup
                    label="Categories"
                    name="category"
                    options={categories.map((c) => ({
                      value: c.id.toString(),
                      label: c.name,
                    }))}
                    values={productFilters.category.map(String)}
                    onChange={handleFilterChange}
                    direction="vertical"
                  />

                  <div className="pt-6">
                    <CheckboxGroup
                      label="Brands"
                      name="brand"
                      options={brands.map((b) => ({
                        value: b.id.toString(),
                        label: b.name,
                      }))}
                      values={productFilters.brand.map(String)}
                      onChange={handleFilterChange}
                      direction="vertical"
                    />
                  </div>
                </div>
              </div>
            </aside>

            <section
              aria-labelledby="product-heading"
              className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3"
            >
              <h2 id="product-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
                {list.map((product) => (
                  <div
                    key={product.id}
                    className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                  >
                    <img
                      // alt={product.imageAlt}
                      src={product.image_url}
                      className="aspect-3/4 bg-gray-200 object-cover group-hover:opacity-75 sm:h-96"
                    />
                    <div className="flex flex-1 flex-col space-y-2 p-4">
                      <h3 className="text-sm font-medium text-gray-900">
                        <Link to={`/product-details/${product.id}`}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-500">
                        {product.description}
                      </p>
                      <div className="flex flex-1 flex-col justify-end">
                        {/* <p className="text-sm text-gray-500 italic">
                          {product.options}
                        </p> */}
                        <p className="text-base font-medium text-gray-900">
                          ৳{product.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                {meta && (
                  <Pagination
                    currentPage={meta.current_page}
                    perPage={meta.per_page}
                    total={meta.total}
                    totalPages={meta.total_pages}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </CustomerLayout>
  );
};
export default ShopPage;
