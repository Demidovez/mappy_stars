import {EShape, IAction} from "../../../types/types";
import { TMapState } from "../../reducers/controllerMapReducer";
import Actions from "../types/controllerMapActionTypes";

export const setInitMapAction = (data: TMapState): IAction => ({
  type: Actions.INIT_STATE,
  payload: {data},
});


export const setColorBorderMapAction = (data: string): IAction => ({
  type: Actions.SET_COLOR_BORDER_MAP,
  payload: {data},
});

export const setHasBorderMapAction = (data: boolean): IAction => ({
  type: Actions.SET_HAS_BORDER_MAP,
  payload: {data},
});

export const setMapColorAction = (data: string): IAction => ({
  type: Actions.SET_MAP_COLOR,
  payload: {data},
});

export const setShapeBorderMapNameAction = (data: EShape): IAction => ({
  type: Actions.SET_SHAPE_BORDER_MAP_NAME,
  payload: {data},
});

export const setSizeMapAction = (data: number): IAction => ({
  type: Actions.SET_SIZE_MAP,
  payload: {data},
});

export const setMarginTopMapAction = (data: number): IAction => ({
  type: Actions.SET_MARGIN_TOP_MAP,
  payload: {data},
});
