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
  removeCurrentProduct,
  fetchBrandsStart,
  fetchBrandsSuccess,
  fetchBrandsFailure,
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from "./slice";
import {
  PRODUCT_API,
  TEMPIMAGE_API,
  PRODUCT_IMAGE_API,
  BRAND_API,
  CATEGORY_API,
} from "../../../utils/api/admin";

import { setToastAlert } from "../../../store/slices/errorSlice";
import fetcher from "../../../services/fetcher";

// FETCH ALL PRODUCTS
function* fetchProductsSaga({ payload }) {
  try {
    yield put(fetchProductsStart());

    const page = payload?.page || 1;

    const response = yield call(() =>
      fetcher(`${PRODUCT_API.ALL}?page=${page}`)
    );

    yield put(fetchProductsSuccess(response));
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
    navigate("/dashboard/products");
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
    const response = yield call(() =>
      fetcher(PRODUCT_API.DELETE(id), {
        method: "DELETE",
      })
    );
    yield put(deleteProductSuccess(id));
    yield put(setToastAlert({ type: "success", message: response.message }));
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
    yield put(removeCurrentProduct());
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

// change default image

function* changeDefaultProductImageSaga({ payload }) {
  const { productId, image } = payload;

  try {
    const formData = new FormData();
    formData.append("product_id", productId);
    formData.append("image", image);

    const response = yield call(() =>
      fetcher(PRODUCT_IMAGE_API.UPDATE_DEFAULT_IMAGE, {
        method: "POST",
        body: formData,
      })
    );

    yield put(
      setToastAlert({
        type: "success",
        message: response?.message || "Default image updated",
      })
    );

    yield put({ type: "GET_SINGLE_PRODUCT", payload: { id: productId } });
  } catch (error) {
    yield put(
      setToastAlert({
        type: "error",
        message: error.message || "Failed to update default image",
      })
    );
  }
}

// delete product image

function* deleteProductImageSaga({ payload }) {
  const { productId, imageId } = payload;

  try {
    const response = yield call(() =>
      fetcher(PRODUCT_IMAGE_API.DELETE(imageId), {
        method: "DELETE",
      })
    );

    yield put(
      setToastAlert({
        type: "success",
        message: response.message,
      })
    );

    // Refreshing product
    yield put({ type: "GET_SINGLE_PRODUCT", payload: { id: productId } });
  } catch (error) {
    yield put(
      setToastAlert({
        type: "error",
        message: error.message || "Failed to delete image",
      })
    );
  }
}

// get all product brands

function* fetchBrandsSaga() {
  try {
    yield put(fetchBrandsStart());
    const response = yield call(() => fetcher(BRAND_API.ALL));
    yield put(fetchBrandsSuccess(response.data));
  } catch (error) {
    yield put(fetchBrandsFailure(error.message));
    yield put(setToastAlert({ type: "error", message: error.message }));
  }
}

function* fetchCategoriesSaga() {
  try {
    yield put(fetchCategoriesStart());
    const response = yield call(() => fetcher(CATEGORY_API.ALL));
    yield put(fetchCategoriesSuccess(response.data));
  } catch (error) {
    yield put(fetchCategoriesFailure(error.message));
    yield put(setToastAlert({ type: "error", message: error.message }));
  }
}

// ROOT SAGA
export default function* productSaga() {
  yield takeLatest("FETCH_PRODUCTS", fetchProductsSaga);
  yield takeLatest("FETCH_BRANDS", fetchBrandsSaga);
  yield takeLatest("FETCH_CATEGORIES", fetchCategoriesSaga);
  yield takeLatest("CREATE_PRODUCT", createProductSaga);
  yield takeLatest("EDIT_PRODUCT", editProductSaga);
  yield takeLatest("DELETE_PRODUCT", deleteProductSaga);
  yield takeLatest("GET_SINGLE_PRODUCT", getSingleProductSaga);
  yield takeLatest("UPLOAD_TEMP_IMAGE", uploadTempImagesSaga);
  yield takeLatest("SAVE_PRODUCT_IMAGE", saveProductImagesSaga);
  yield takeLatest("CHANGE_DEFAULT_IMAGE", changeDefaultProductImageSaga);
  yield takeLatest("DELETE_PRODUCT_IMAGE", deleteProductImageSaga);
}
