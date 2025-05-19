import { all } from "redux-saga/effects";
import authSaga from "./authSaga";
import adminProductSaga from "../../features/admin/products/saga"; // Importing the product saga
import customerProductSaga from "../../features/customer/products/saga"; // Importing the product saga

//  Combining all sagas
export default function* rootSaga() {
  yield all([authSaga(), adminProductSaga(), customerProductSaga()]);
}
