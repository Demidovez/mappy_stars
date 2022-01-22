import {put, call, takeEvery} from "redux-saga/effects";
import Actions from "../redux/actions/types/dataActionTypes";
import {
  fetchTemplates,
  fetchControllers,
  fetchHolsts,
  fetchColors,
  fetchShapesBorderMap,
  fetchShapesSeparator,
  fetchFonts,
  fetchHolstImages,
} from "../api";
import {
  setTemplatesAction,
  setControllersAction,
  setHolstsAction,
  setColorsAction,
  setShapesBorderMapAction,
  setShapesSeparatorAction,
  setLoadedFontsAction,
  setHolstImagesAction,
} from "../redux/actions/creators/dataActionCreators";
import {IAction} from "../types/types";
import {setHolstIdAction} from "../redux/actions/creators/controllerCanvasActionCreators";

function* workerFetchTemplates(action: IAction) {
  const {data} = yield call(fetchTemplates);

  yield put(setTemplatesAction(data));
}

function* workerFetchControllers(action: IAction) {
  const {data} = yield call(fetchControllers);

  yield put(setControllersAction(data));
}

function* workerFetchHolsts(action: IAction) {
  const {data} = yield call(fetchHolsts);

  yield put(setHolstsAction(data));
  yield put(setHolstIdAction(data[0]?.id));
}

function* workerFetchColors(action: IAction) {
  const {data} = yield call(fetchColors);

  yield put(setColorsAction(data));
}

function* workerFetchShapesBorderMap(action: IAction) {
  const {data} = yield call(fetchShapesBorderMap);

  yield put(setShapesBorderMapAction(data));
}

function* workerFetchShapesSeparator(action: IAction) {
  const {data} = yield call(fetchShapesSeparator);

  yield put(setShapesSeparatorAction(data));
}

function* workerFetchFonts(action: IAction) {
  const {data} = yield call(fetchFonts);

  yield put(setLoadedFontsAction(data));
}

function* workerFetchImages(action: IAction) {
  const {data} = yield call(fetchHolstImages);

  yield put(setHolstImagesAction(data));
}

export default function* watcherSaga() {
  yield takeEvery(Actions.FETCH_TEMPLATES, workerFetchTemplates);
  yield takeEvery(Actions.FETCH_CONTROLLERS, workerFetchControllers);
  yield takeEvery(Actions.FETCH_HOLSTS, workerFetchHolsts);
  yield takeEvery(Actions.FETCH_COLORS, workerFetchColors);
  yield takeEvery(Actions.FETCH_SHAPES_BORDER_MAP, workerFetchShapesBorderMap);
  yield takeEvery(Actions.FETCH_SHAPES_SEPARATOR, workerFetchShapesSeparator);
  yield takeEvery(Actions.FETCH_FONTS, workerFetchFonts);
  yield takeEvery(Actions.FETCH_HOLST_IMAGES, workerFetchImages);
}
