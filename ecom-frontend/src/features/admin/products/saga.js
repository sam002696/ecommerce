import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  createProductSuccess,
  editProductSuccess,
  deleteProductSuccess,
  setCurrentProduct,
  uploadTempImagesStart,
  uploadTempImagesSuccess,
  uploadTempImagesFailure,
  resetGallery,
  appendEditProductGallery,
} from "./slice";
import {
  PRODUCT_API,
  TEMPIMAGE_API,
  PRODUCT_IMAGE_API,
} from "../../../utils/api/admin";

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
  const { productData, navigate } = payload;
  try {
    const response = yield call(() =>
      fetcher(PRODUCT_API.CREATE, {
        method: "POST",
        body: productData,
      })
    );
    yield put(createProductSuccess(response.data));
    yield put(resetGallery());
    yield put(
      setToastAlert({
        type: "success",
        message: response.message,
      })
    );
    navigate("/products");
  } catch (error) {
    yield put(setToastAlert({ type: "error", message: error.message }));
  }
}

// EDIT PRODUCT
function* editProductSaga({ payload }) {
  const { id, data } = payload;
  try {
    const response = yield call(() =>
      fetcher(PRODUCT_API.UPDATE(id), {
        method: "PUT",
        body: data,
      })
    );
    yield put(editProductSuccess(response.data));
    yield put(setToastAlert({ type: "success", message: response.message }));
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

function* saveProductImagesSaga({ payload }) {
  const { files, productId } = payload;

  try {
    yield put(uploadTempImagesStart());

    const uploaded = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("product_id", productId);

      // Create local preview URL for instant UI feedback
      const localPreview = URL.createObjectURL(file);

      // API call to upload image
      const response = yield call(() =>
        fetcher(PRODUCT_IMAGE_API.CREATE, {
          method: "POST",
          body: formData,
        })
      );

      const data = response?.data;

      if (data) {
        // Use local preview for now, until image_url is accessible
        const uploadedImage = {
          id: data.id,
          original_url: data.image_url,
          thumbnail_url: localPreview, // This is key for instant display
          name: data.image_url.split("/").pop(),
        };

        uploaded.push(uploadedImage);

        // Append to Redux gallery
        yield put(appendEditProductGallery([uploadedImage]));

        yield put(
          setToastAlert({ type: "success", message: response?.message })
        );
      }
    }
  } catch (error) {
    yield put(setToastAlert({ type: "error", message: error.message }));
  }
}

// ROOT SAGA
export default function* productSaga() {
  yield takeLatest("FETCH_PRODUCTS", fetchProductsSaga);
  yield takeLatest("CREATE_PRODUCT", createProductSaga);
  yield takeLatest("EDIT_PRODUCT", editProductSaga);
  yield takeLatest("DELETE_PRODUCT", deleteProductSaga);
  yield takeLatest("GET_SINGLE_PRODUCT", getSingleProductSaga);
  yield takeLatest("UPLOAD_TEMP_IMAGE", uploadTempImagesSaga);
  yield takeLatest("SAVE_PRODUCT_IMAGE", saveProductImagesSaga);
}
