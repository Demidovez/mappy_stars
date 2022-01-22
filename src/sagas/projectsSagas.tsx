import {put, call, takeEvery} from "redux-saga/effects";
import Actions from "../redux/actions/types/projectsActionTypes";
import {fetchProjects} from "../api";
import {setProjectsAction} from "../redux/actions/creators/projectsActionCreators";
import {IAction} from "../types/types";

function* workerFetchProjects(action: IAction) {
  const {data} = yield call(fetchProjects);

  yield put(setProjectsAction(data));
}

export default function* watcherSaga() {
  yield takeEvery(Actions.FETCH_PROJECTS, workerFetchProjects);
}
