import {put, call, takeEvery} from "redux-saga/effects";
import Actions from "../redux/actions/types/controllerEventActionTypes";
import {fetchLocationVariants} from "../api";
import {setVariantsAction} from "../redux/actions/creators/controllerEventActionCreators";
import {IAction, IVariant} from "../types/types";

function* workerFetchVariants(action: IAction) {
  const {data} = yield call(fetchLocationVariants, action.payload);

  yield put(setVariantsAction(data as IVariant[]));
}

export default function* watcherSaga() {
  yield takeEvery(Actions.FETCH_VARIANTS, workerFetchVariants);
}
