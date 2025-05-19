import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
} from "./slice";
import { PRODUCT_API } from "../../../utils/api/customer";

import { setToastAlert } from "../../../store/slices/errorSlice";
import fetcher from "../../../services/fetcher";

// FETCH ALL PRODUCTS
function* fetchProductsSaga() {
  try {
    yield put(fetchProductsStart());

    const response = yield call(() => fetcher(`${PRODUCT_API.ALL}`));

    yield put(fetchProductsSuccess(response));
  } catch (error) {
    yield put(fetchProductsFailure(error.message));
    yield put(setToastAlert({ type: "error", message: error.message }));
  }
}

// ROOT SAGA
export default function* productSaga() {
  yield takeLatest("FETCH_CUSTOMER_PRODUCTS", fetchProductsSaga);
}
