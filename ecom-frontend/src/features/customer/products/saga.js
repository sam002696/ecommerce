import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchBrandsSuccess,
  fetchCategoriesSuccess,
  fetchFeaturedProductSuccess,
  fetchLatestProductSuccess,
  fetchSingleProductStart,
  fetchSingleProductSuccess,
  fetchSingleProductFailure,
} from "./slice";
import { PRODUCT_API } from "../../../utils/api/customer";

import { setToastAlert } from "../../../store/slices/errorSlice";
import fetcher from "../../../services/fetcher";

// FETCH ALL PRODUCTS
function* fetchProductsSaga() {
  try {
    yield put(fetchProductsStart());

    const { productFilters } = yield select((state) => state.customerProducts);

    const queryParams = new URLSearchParams();

    if (productFilters.category.length) {
      queryParams.append("category_id", productFilters.category.join(","));
    }

    if (productFilters.brand.length) {
      queryParams.append("brand_id", productFilters.brand.join(","));
    }

    const url = `${PRODUCT_API.ALL}?${queryParams.toString()}`;
    const response = yield call(() => fetcher(url));

    yield put(fetchProductsSuccess(response));
  } catch (error) {
    yield put(fetchProductsFailure(error.message));
    yield put(setToastAlert({ type: "error", message: error.message }));
  }
}

function* fetchBrandsSaga() {
  try {
    const response = yield call(() => fetcher(PRODUCT_API.PRODUCT_BRANDS));
    yield put(fetchBrandsSuccess(response.data));
  } catch (error) {
    yield put(setToastAlert({ type: "error", message: error.message }));
  }
}

function* fetchCategoriesSaga() {
  try {
    const response = yield call(() => fetcher(PRODUCT_API.PRODUCT_CATEGORIES));
    yield put(fetchCategoriesSuccess(response.data));
  } catch (error) {
    yield put(setToastAlert({ type: "error", message: error.message }));
  }
}

function* fetchFeaturedProductsSaga() {
  try {
    const response = yield call(() => fetcher(PRODUCT_API.PRODUCT_FEATURED));
    yield put(fetchFeaturedProductSuccess(response.data));
  } catch (error) {
    yield put(setToastAlert({ type: "error", message: error.message }));
  }
}

function* fetchLatestProductsSaga() {
  try {
    const response = yield call(() => fetcher(PRODUCT_API.PRODUCT_LATEST));
    yield put(fetchLatestProductSuccess(response.data));
  } catch (error) {
    yield put(setToastAlert({ type: "error", message: error.message }));
  }
}

function* fetchSingleProductSaga({ payload }) {
  const { id } = payload;
  try {
    yield put(fetchSingleProductStart());

    const response = yield call(() =>
      fetcher(`${PRODUCT_API.SINGLE_PRODUCT(id)}`)
    );

    yield put(fetchSingleProductSuccess(response.data));
  } catch (error) {
    yield put(fetchSingleProductFailure(error.message));
    yield put(setToastAlert({ type: "error", message: error.message }));
  }
}

// ROOT SAGA
export default function* productSaga() {
  yield takeLatest("FETCH_CUSTOMER_PRODUCTS", fetchProductsSaga);
  yield takeLatest("FETCH_CUSTOMER_BRANDS", fetchBrandsSaga);
  yield takeLatest("FETCH_CUSTOMER_CATEGORIES", fetchCategoriesSaga);
  yield takeLatest("FETCH_FEATURED_PRODUCTS", fetchFeaturedProductsSaga);
  yield takeLatest("FETCH_LATEST_PRODUCTS", fetchLatestProductsSaga);

  yield takeLatest("FETCH_SINGLE_PRODUCT", fetchSingleProductSaga);
}
