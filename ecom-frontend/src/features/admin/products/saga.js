import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  createProductSuccess,
  updateProductSuccess,
  deleteProductSuccess,
  setCurrentProduct,
  uploadTempImagesStart,
  uploadTempImagesSuccess,
  uploadTempImagesFailure,
} from "./slice";
import { PRODUCT_API, TEMPIMAGE_API } from "../../../utils/api/admin";

import { setToastAlert } from "../../../store/slices/errorSlice";
import fetcher from "../../../services/fetcher";

// FETCH ALL PRODUCTS
function* fetchProductsSaga() {
  try {
    yield put(fetchProductsStart());
    const response = yield call(() => fetcher(PRODUCT_API.ALL));
    yield put(fetchProductsSuccess(response.data));
  } catch (error) {
    yield put(fetchProductsFailure(error.message));
    yield put(setToastAlert({ type: "error", message: error.message }));
  }
}

// CREATE PRODUCT
function* createProductSaga({ payload }) {
  const { productData } = payload;
  try {
    const response = yield call(() =>
      fetcher(PRODUCT_API.CREATE, {
        method: "POST",
        body: productData,
      })
    );
    yield put(createProductSuccess(response.data));
    yield put(
      setToastAlert({
        type: "success",
        message: "Product created successfully",
      })
    );
  } catch (error) {
    yield put(setToastAlert({ type: "error", message: error.message }));
  }
}

// UPDATE PRODUCT
function* updateProductSaga({ payload }) {
  const { id, data } = payload;
  try {
    const response = yield call(() =>
      fetcher(PRODUCT_API.UPDATE(id), {
        method: "PUT",
        body: JSON.stringify(data),
      })
    );
    yield put(updateProductSuccess(response.data));
    yield put(setToastAlert({ type: "success", message: "Product updated" }));
  } catch (error) {
    yield put(setToastAlert({ type: "error", message: error.message }));
  }
}

// DELETE PRODUCT
function* deleteProductSaga({ payload }) {
  const { id } = payload;
  try {
    yield call(() =>
      fetcher(PRODUCT_API.DELETE(id), {
        method: "DELETE",
      })
    );
    yield put(deleteProductSuccess(id));
    yield put(setToastAlert({ type: "success", message: "Product deleted" }));
  } catch (error) {
    yield put(setToastAlert({ type: "error", message: error.message }));
  }
}

// GET SINGLE PRODUCT
function* getSingleProductSaga({ payload }) {
  const { id } = payload;
  try {
    const response = yield call(() => fetcher(PRODUCT_API.SINGLE(id)));
    yield put(setCurrentProduct(response.data));
  } catch (error) {
    yield put(setToastAlert({ type: "error", message: error.message }));
  }
}

// UPLOAD TEMP IMAGES
function* uploadTempImagesSaga({ payload }) {
  try {
    yield put(uploadTempImagesStart());
    const uploaded = [];

    for (const file of payload) {
      const formData = new FormData();
      formData.append("image", file);

      const response = yield call(() =>
        fetcher(TEMPIMAGE_API.CREATE, {
          method: "POST",
          body: formData,
        })
      );

      if (response?.data) {
        uploaded.push(response?.data);
      }
    }

    yield put(uploadTempImagesSuccess(uploaded)); // contains id, original_url
  } catch (error) {
    yield put(uploadTempImagesFailure(error.message));
    yield put(setToastAlert({ type: "error", message: error.message }));
  }
}

// ROOT SAGA
export default function* productSaga() {
  yield takeLatest("FETCH_PRODUCTS", fetchProductsSaga);
  yield takeLatest("CREATE_PRODUCT", createProductSaga);
  yield takeLatest("UPDATE_PRODUCT", updateProductSaga);
  yield takeLatest("DELETE_PRODUCT", deleteProductSaga);
  yield takeLatest("GET_SINGLE_PRODUCT", getSingleProductSaga);
  yield takeLatest("UPLOAD_TEMP_IMAGE", uploadTempImagesSaga);
}
