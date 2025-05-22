import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  fetchSingleOrderStart,
  fetchSingleOrderSuccess,
  fetchSingleOrderFailure,
} from "./slice";
import { ORDER_API } from "../../../utils/api/admin";
import fetcher from "../../../services/fetcher";
import { setToastAlert } from "../../../store/slices/errorSlice";

// FETCH ALL ORDERS
function* fetchOrdersSaga({ payload }) {
  try {
    yield put(fetchOrdersStart());

    const page = payload?.page || 1;

    const response = yield call(() => fetcher(`${ORDER_API.ALL}?page=${page}`));

    // assuming response.data contains the array of orders
    yield put(fetchOrdersSuccess(response));
  } catch (error) {
    yield put(fetchOrdersFailure(error.message));
    yield put(setToastAlert({ type: "error", message: error.message }));
  }
}

function* fetchSingleOrderSaga({ payload }) {
  const { id } = payload;
  try {
    yield put(fetchSingleOrderStart());

    const response = yield call(() => fetcher(`${ORDER_API.SINGLE_ORDER(id)}`));

    yield put(fetchSingleOrderSuccess(response.data));
  } catch (error) {
    yield put(fetchSingleOrderFailure(error.message));
    yield put(setToastAlert({ type: "error", message: error.message }));
  }
}

// ROOT ORDERS SAGA
export default function* ordersSaga() {
  yield takeLatest("FETCH_ADMIN_ORDERS", fetchOrdersSaga);

  yield takeLatest("FETCH_SINGLE_ADMIN_ORDER", fetchSingleOrderSaga);
}
