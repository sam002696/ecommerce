import { call, put, takeLatest } from "redux-saga/effects";
import { fetchDashboardDataStart, fetchDashboardDataSuccess } from "./slice";
import { setToastAlert } from "../../../store/slices/errorSlice";
import fetcher from "../../../services/fetcher";
import { DASHBOARD_API } from "../../../utils/api/admin";

function* fetchDashboardData() {
  try {
    yield put(fetchDashboardDataStart());
    const res = yield call(() => fetcher(`${DASHBOARD_API.GET}`));
    yield put(fetchDashboardDataSuccess(res.data));
  } catch (err) {
    yield put(setToastAlert({ type: "error", message: err.message }));
  }
}

export default function* notificationsSaga() {
  yield takeLatest("FETCH_DASHBOARD_DATA", fetchDashboardData);
}
