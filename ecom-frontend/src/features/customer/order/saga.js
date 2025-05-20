import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  createOrderStart,
  createOrderSuccess,
  createOrderFailure,
} from "./slice";
import { ORDER_API } from "../../../utils/api/customer";
import fetcher from "../../../services/fetcher";
import { setToastAlert } from "../../../store/slices/errorSlice";

// FETCH ALL ORDERS
function* fetchOrdersSaga() {
  try {
    yield put(fetchOrdersStart());
    const response = yield call(() => fetcher(ORDER_API.ALL));
    // assuming response.data contains the array of orders
    yield put(fetchOrdersSuccess(response.data));
  } catch (error) {
    yield put(fetchOrdersFailure(error.message));
    yield put(setToastAlert({ type: "error", message: error.message }));
  }
}

// CREATE NEW ORDER
function* createOrderSaga({ payload }) {
  try {
    yield put(createOrderStart());

    const response = yield call(() =>
      fetcher(ORDER_API.CREATE, {
        method: "POST",
        body: payload,
      })
    );
    // on success, response.data is the created order
    yield put(createOrderSuccess(response.data));
    yield put(setToastAlert({ type: "success", message: response.message }));
  } catch (error) {
    yield put(createOrderFailure(error.message));
    yield put(setToastAlert({ type: "error", message: error.message }));
  }
}

// ROOT ORDERS SAGA
export default function* ordersSaga() {
  yield takeLatest("FETCH_ORDERS", fetchOrdersSaga);
  yield takeLatest("CREATE_ORDER", createOrderSaga);
}
