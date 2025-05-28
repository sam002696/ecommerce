import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchNotificationsStart,
  fetchNotificationsSuccess,
  fetchUnreadCountSuccess,
  markAsReadSuccess,
} from "./slice";
import { setToastAlert } from "../../../store/slices/errorSlice";
import fetcher from "../../../services/fetcher";
import { NOTIFICATION_API } from "../../../utils/api/admin";

function* fetchNotifications() {
  try {
    yield put(fetchNotificationsStart());
    const res = yield call(() => fetcher(`${NOTIFICATION_API.ALL}`));
    yield put(fetchNotificationsSuccess(res.data));
  } catch (err) {
    yield put(setToastAlert({ type: "error", message: err.message }));
  }
}

function* fetchUnreadCount() {
  try {
    const res = yield call(() => fetcher(`${NOTIFICATION_API.UNREAD_COUNT}`));
    yield put(fetchUnreadCountSuccess(res.data.unread_count));
  } catch (err) {
    yield put(setToastAlert({ type: "error", message: err.message }));
  }
}

function* markAsRead({ payload }) {
  try {
    const { id } = payload;
    yield call(() =>
      fetcher(`${NOTIFICATION_API.MARK_AS_READ(id)}`, {
        method: "POST",
      })
    );
    yield put(markAsReadSuccess(payload));
  } catch (err) {
    yield put(setToastAlert({ type: "error", message: err.message }));
  }
}

export default function* notificationsSaga() {
  yield takeLatest("FETCH_NOTIFICATIONS", fetchNotifications);
  yield takeLatest("FETCH_UNREAD_COUNT", fetchUnreadCount);
  yield takeLatest("MARK_AS_READ", markAsRead);
}
