import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dashboardData: {},
};

const adminDashboardSlice = createSlice({
  name: "adminDashboard",
  initialState,
  reducers: {
    fetchDashboardDataStart(state) {
      state.loading = true;
    },
    fetchDashboardDataSuccess(state, action) {
      state.dashboardData = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchDashboardDataStart, fetchDashboardDataSuccess } =
  adminDashboardSlice.actions;

export default adminDashboardSlice.reducer;
