import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  currentProduct: null,
  loading: false,
  error: null,
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
      state.list = payload;
      state.loading = false;
    },
    fetchProductsFailure: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },

    createProductSuccess: (state, { payload }) => {
      state.list.unshift(payload); // Add new product to top
    },

    updateProductSuccess: (state, { payload }) => {
      const index = state.list.findIndex((p) => p.id === payload.id);
      if (index !== -1) state.list[index] = payload;
    },

    deleteProductSuccess: (state, { payload }) => {
      state.list = state.list.filter((p) => p.id !== payload);
    },

    setCurrentProduct: (state, { payload }) => {
      state.currentProduct = payload;
    },
  },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  createProductSuccess,
  updateProductSuccess,
  deleteProductSuccess,
  setCurrentProduct,
} = productSlice.actions;

export default productSlice.reducer;
