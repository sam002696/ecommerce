import { all } from "redux-saga/effects";
import authSaga from "./authSaga";

//  Combining all sagas
export default function* rootSaga() {
  yield all([authSaga()]);
}
