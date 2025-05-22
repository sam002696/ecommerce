import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  loading: false,
  meta: {},
  singleOrder: null,
  error: null,
};

const ordersSlice = createSlice({
  name: "adminOrders",
  initialState,
  reducers: {
    // FETCH ALL ORDERS
    fetchOrdersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchOrdersSuccess: (state, { payload }) => {
      state.list = payload.data;
      state.meta = payload.meta;
      state.loading = false;
    },
    fetchOrdersFailure: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },

    // FETCH SINGLE ORDER
    fetchSingleOrderStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSingleOrderSuccess: (state, { payload }) => {
      state.singleOrder = payload;
      state.loading = false;
    },
    fetchSingleOrderFailure: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export const {
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  createOrderStart,
  createOrderSuccess,
  createOrderFailure,
  fetchSingleOrderStart,
  fetchSingleOrderSuccess,
  fetchSingleOrderFailure,
} = ordersSlice.actions;

export default ordersSlice.reducer;
