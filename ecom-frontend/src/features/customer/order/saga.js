import { call, put, takeLatest } from "redux-saga/effects";
import Cookies from "js-cookie";
import {
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  createOrderStart,
  createOrderSuccess,
  createOrderFailure,
  fetchSingleOrderStart,
  fetchSingleOrderSuccess,
  fetchSingleOrderFailure,
  downloadOrderInvoiceStart,
  downloadOrderInvoiceSuccess,
  downloadOrderInvoiceFailure,
} from "./slice";
import { ORDER_API } from "../../../utils/api/customer";
import fetcher from "../../../services/fetcher";
import { setToastAlert } from "../../../store/slices/errorSlice";
import { clearCart } from "../cart/slice";

// FETCH ALL ORDERS
function* fetchOrdersSaga({ payload }) {
  try {
    const page = payload?.page || 1;
    yield put(fetchOrdersStart());
    const response = yield call(() => fetcher(`${ORDER_API.ALL}?page=${page}`));
    // assuming response.data contains the array of orders
    yield put(fetchOrdersSuccess(response));
  } catch (error) {
    yield put(fetchOrdersFailure(error.message));
    yield put(setToastAlert({ type: "error", message: error.message }));
  }
}

// CREATE NEW ORDER
function* createOrderSaga({ payload }) {
  try {
    const { orderData, navigate } = payload;

    yield put(createOrderStart());

    const response = yield call(() =>
      fetcher(ORDER_API.CREATE, {
        method: "POST",
        body: orderData,
      })
    );
    // on success, response.data is the created order
    yield put(createOrderSuccess(response?.data));
    yield put(setToastAlert({ type: "success", message: response.message }));

    // remove cart items after successful order creation
    yield put(clearCart());
    // navigate to orders page
    if (navigate) {
      navigate("/order-history");
    }
  } catch (error) {
    yield put(createOrderFailure(error.message));
    yield put(setToastAlert({ type: "error", message: error.message }));
  }
}

function* fetchSingleOrderSaga({ payload }) {
  const { id } = payload;
  try {
    yield put(fetchSingleOrderStart());

    const response = yield call(() => fetcher(`${ORDER_API.SINGLE_ORDER(id)}`));

    yield put(fetchSingleOrderSuccess(response?.data));
  } catch (error) {
    yield put(fetchSingleOrderFailure(error.message));
    yield put(setToastAlert({ type: "error", message: error.message }));
  }
}

function* downloadOrderInvoiceSaga({ payload }) {
  const { orderId } = payload;

  try {
    yield put(downloadOrderInvoiceStart());

    const response = yield call(() =>
      fetch(`${ORDER_API.DOWNLOAD_INVOICE(orderId)}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + Cookies.get("access_token"),
        },
      })
    );

    if (!response.ok) {
      throw new Error("Failed to download invoice.");
    }

    const blob = yield response.blob();
    const url = window.URL.createObjectURL(blob);

    // triggering download
    const link = document.createElement("a");
    link.href = url;
    link.download = `invoice_order_${orderId}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    yield put(downloadOrderInvoiceSuccess());
  } catch (error) {
    yield put(downloadOrderInvoiceFailure(error.message));
    yield put(setToastAlert({ type: "error", message: error.message }));
  }
}

// ROOT ORDERS SAGA
export default function* ordersSaga() {
  yield takeLatest("FETCH_ORDERS", fetchOrdersSaga);
  yield takeLatest("CREATE_ORDER", createOrderSaga);
  yield takeLatest("FETCH_SINGLE_ORDER", fetchSingleOrderSaga);
  yield takeLatest("DOWNLOAD_ORDER_INVOICE", downloadOrderInvoiceSaga);
}
