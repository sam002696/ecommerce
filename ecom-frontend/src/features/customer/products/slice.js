import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  currentProduct: null,
  categories: [],
  brands: [],
  productFilters: {
    category: [],
    brand: [],
  },
  featuredProducts: [],
  latestProducts: [],
  loading: false,
  error: null,
  meta: {},
};

const productSlice = createSlice({
  name: "customerProducts",
  initialState,
  reducers: {
    fetchProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, { payload }) => {
      state.list = payload.data;
      state.meta = payload.meta;
      state.loading = false;
    },
    fetchProductsFailure: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },

    fetchBrandsSuccess: (state, { payload }) => {
      state.brands = payload;
    },
    fetchCategoriesSuccess: (state, { payload }) => {
      state.categories = payload;
    },

    setCurrentProduct: (state, { payload }) => {
      state.currentProduct = payload;
    },

    setProductFilters: (state, { payload }) => {
      state.productFilters = payload;
    },

    fetchFeaturedProductSuccess: (state, { payload }) => {
      state.featuredProducts = payload;
    },
    fetchLatestProductSuccess: (state, { payload }) => {
      state.latestProducts = payload;
    },
  },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  setCurrentProduct,
  fetchBrandsSuccess,
  fetchCategoriesSuccess,
  setProductFilters,
  fetchFeaturedProductSuccess,
  fetchLatestProductSuccess,
} = productSlice.actions;

export default productSlice.reducer;
