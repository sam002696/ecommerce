import { call, put, takeLatest } from "redux-saga/effects";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
} from "../slices/authSlice";

import { AUTH_API } from "../../utils/api";

import fetcher from "../../services/fetcher";
import { setToastAlert } from "../slices/errorSlice";

// Login Saga
function* loginSaga({ payload }) {
  try {
    yield put(loginStart());

    const response = yield call(() =>
      fetcher(AUTH_API.LOGIN, {
        method: "POST",
        body: JSON.stringify(payload),
      })
    );

    if (response.status !== "success") throw new Error(response.message);

    yield put(loginSuccess(response.data));
    yield put(setToastAlert({ type: "success", message: "Login successful!" }));
  } catch (error) {
    const message = error.message || "Login failed.";
    yield put(loginFailure(message));
    yield put(setToastAlert({ type: "error", message }));
  }
}

// Registration Saga
function* registerSaga({ payload }) {
  try {
    yield put(registerStart());

    const response = yield call(() =>
      fetcher(AUTH_API.REGISTER, {
        method: "POST",
        body: JSON.stringify(payload),
      })
    );

    if (response.status !== "success") throw new Error(response.message);

    yield put(registerSuccess(response.data));
    yield put(
      setToastAlert({ type: "success", message: "Registration successful!" })
    );
  } catch (error) {
    const message = error.message || "Registration failed.";
    yield put(registerFailure(message));
    yield put(setToastAlert({ type: "error", message }));
  }
}

// Root Auth Saga
export default function* authSaga() {
  yield takeLatest("LOGIN", loginSaga);
  yield takeLatest("REGISTER", registerSaga);
}
