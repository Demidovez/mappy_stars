import {all} from "redux-saga/effects";
import dataSagas from "./dataSagas";
import eventSagas from "./eventSagas";
import projectsSagas from "./projectsSagas";

function* rootSaga() {
  yield all([dataSagas(), projectsSagas(), eventSagas()]);
}

export default rootSaga;
