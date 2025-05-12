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
import { AuthUser } from "../../helpers/AuthUser";

// Login Saga
function* loginSaga({ payload }) {
  const { loginData, navigate } = payload;
  try {
    yield put(loginStart());

    const response = yield call(() =>
      fetcher(AUTH_API.LOGIN, {
        method: "POST",
        body: JSON.stringify(loginData),
      })
    );

    if (response.status !== "success") throw new Error(response.message);

    // Saving login data using your helper class (persists token & user)
    yield call([AuthUser, AuthUser.saveLoginData], response.data);

    yield put(loginSuccess(response.data));
    yield put(setToastAlert({ type: "success", message: "Login successful!" }));

    if (navigate) navigate("/dashboard");
  } catch (error) {
    const message = error.message || "Login failed.";
    yield put(loginFailure(message));
    yield put(setToastAlert({ type: "error", message }));
  }
}

// Registration Saga
function* registerSaga({ payload }) {
  const { registerData, navigate } = payload;
  try {
    yield put(registerStart());

    const response = yield call(() =>
      fetcher(AUTH_API.REGISTER, {
        method: "POST",
        body: JSON.stringify(registerData),
      })
    );

    if (response.status !== "success") throw new Error(response.message);

    yield put(registerSuccess(response.data));
    yield put(
      setToastAlert({ type: "success", message: "Registration successful!" })
    );

    /* -----------------
       Navigation to login page
       -----------------
    */
    if (navigate) navigate("/login");
  } catch (error) {
    const message = error.message || "Registration failed.";
    yield put(registerFailure(message));
    yield put(setToastAlert({ type: "error", message }));
  }
}

function* logoutSaga() {
  // Clear cookies and storage
  yield call([AuthUser, AuthUser.logout]);

  // Reset Redux auth state
  yield put({ type: "auth/logout" });

  // Optionally redirect to login page
  // navigate("/login"); <-- only if you pass it in
}

// Root Auth Saga
export default function* authSaga() {
  yield takeLatest("LOGIN", loginSaga);
  yield takeLatest("REGISTER", registerSaga);
  yield takeLatest("LOGOUT", logoutSaga);
}
