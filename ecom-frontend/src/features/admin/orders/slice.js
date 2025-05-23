import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  loading: false,
  meta: {},
  singleOrder: null,
  error: null,
  payment_status: null,
  status: null,
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

    // update order
    updateOrderStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateOrderSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.payment_status = null;
      state.status = null;
    },
    updateOrderFailure: (state, { payload }) => {
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
      state.payment_status = payload.payment_status;
      state.status = payload.status;
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
  updateOrderStart,
  updateOrderSuccess,
  updateOrderFailure,
} = ordersSlice.actions;

export default ordersSlice.reducer;
