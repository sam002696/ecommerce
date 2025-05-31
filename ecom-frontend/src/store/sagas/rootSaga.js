import { all } from "redux-saga/effects";

import authSaga from "./authSaga";

import adminProductSaga from "../../features/admin/products/saga";
import adminOrderSaga from "../../features/admin/orders/saga";
import adminNotificationSaga from "../../features/admin/notifications/saga";
import adminDashboardSaga from "../../features/admin/dashboard/saga";

import customerProductSaga from "../../features/customer/products/saga";
import customerOrderSaga from "../../features/customer/order/saga";

//  Combining all sagas
export default function* rootSaga() {
  yield all([
    authSaga(),
    adminProductSaga(),
    adminOrderSaga(),
    customerProductSaga(),
    customerOrderSaga(),
    adminNotificationSaga(),
    adminDashboardSaga(),
  ]);
}
