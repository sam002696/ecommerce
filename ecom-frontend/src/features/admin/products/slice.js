import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  currentProduct: null,
  loading: false,
  error: null,
  meta: {},
  brands: [],
  categories: [],
};

const productSlice = createSlice({
  name: "adminProducts",
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

    createProductSuccess: (state, { payload }) => {
      state.list.unshift(payload);
    },

    editProductSuccess: (state, { payload }) => {
      const index = state.list.findIndex((p) => p.id === payload.id);
      if (index !== -1) state.list[index] = payload;
    },

    deleteProductSuccess: (state, { payload }) => {
      state.list = state.list.filter((p) => p.id !== payload);
    },

    setCurrentProduct: (state, { payload }) => {
      state.currentProduct = payload;
    },

    removeCurrentProduct: (state) => {
      state.currentProduct = null;
    },

    appendEditProductGallery: (state, { payload }) => {
      if (state.currentProduct) {
        const newImage = Array.isArray(payload) ? payload : [payload];
        state.currentProduct.gallery = [
          ...(state.currentProduct.gallery || []),
          ...newImage,
        ];
      }
    },

    /*---------------------
 
      Temp image reducer

    -----------------------*/

    uploadTempImagesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    uploadTempImagesSuccess: (state, { payload }) => {
      state.currentProduct = {
        ...(state.currentProduct || {}),
        gallery: payload,
      };
      state.loading = false;
    },
    uploadTempImagesFailure: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    resetGallery: (state) => {
      if (state.currentProduct) {
        state.currentProduct.gallery = [];
      }
    },

    /*---------------------
 
      Product brands reducer

    -----------------------*/

    fetchBrandsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchBrandsSuccess: (state, { payload }) => {
      state.brands = payload;
      state.loading = false;
    },
    fetchBrandsFailure: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },

    /*---------------------
 
      Product Categories reducer

    -----------------------*/

    fetchCategoriesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCategoriesSuccess: (state, { payload }) => {
      state.categories = payload;
      state.loading = false;
    },
    fetchCategoriesFailure: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  createProductSuccess,
  editProductSuccess,
  deleteProductSuccess,
  setCurrentProduct,
  uploadTempImagesStart,
  uploadTempImagesSuccess,
  uploadTempImagesFailure,
  resetGallery,
  appendEditProductGallery,
  removeCurrentProduct,
  fetchBrandsStart,
  fetchBrandsSuccess,
  fetchBrandsFailure,
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} = productSlice.actions;

export default productSlice.reducer;
