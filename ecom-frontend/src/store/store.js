import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import toastAlertReducer from "./slices/errorSlice";
import rootSaga from "./sagas/rootSaga";
import authReducer from "./slices/authSlice";
import adminProductSlice from "../features/admin/products/slice";

const sagaMiddleware = createSagaMiddleware();

// Creating the Redux store
export const store = configureStore({
  reducer: {
    toastAlert: toastAlertReducer,
    auth: authReducer,
    adminProduct: adminProductSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
