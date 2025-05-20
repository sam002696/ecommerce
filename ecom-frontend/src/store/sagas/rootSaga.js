import { all } from "redux-saga/effects";
import authSaga from "./authSaga";
import adminProductSaga from "../../features/admin/products/saga";
import customerProductSaga from "../../features/customer/products/saga";
import customerOrderSaga from "../../features/customer/order/saga";

//  Combining all sagas
export default function* rootSaga() {
  yield all([
    authSaga(),
    adminProductSaga(),
    customerProductSaga(),
    customerOrderSaga(),
  ]);
}
