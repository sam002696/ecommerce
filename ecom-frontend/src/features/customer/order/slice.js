import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  meta: null,
  loading: false,

  singleOrder: null,
  error: null,
};

const ordersSlice = createSlice({
  name: "customerOrders",
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

    // CREATE ORDER
    createOrderStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createOrderSuccess: (state, { payload }) => {
      // optionally insert new order into list
      state.list.unshift(payload);
      state.loading = false;
    },
    createOrderFailure: (state, { payload }) => {
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
