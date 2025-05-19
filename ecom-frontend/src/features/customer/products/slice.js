import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  currentProduct: null,
  loading: false,
  error: null,
  meta: {},
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

    setCurrentProduct: (state, { payload }) => {
      state.currentProduct = payload;
    },
  },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  setCurrentProduct,
} = productSlice.actions;

export default productSlice.reducer;
