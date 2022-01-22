import {IAction} from "../../../types/types";
import { TLocationState } from "../../reducers/controllerLocationReducer";
import Actions from "../types/controllerLocationActionTypes";

export const setInitLocationAction = (data: TLocationState): IAction => ({
  type: Actions.INIT_STATE,
  payload: {data},
});

export const setColorAction = (data: string): IAction => ({
  type: Actions.SET_COLOR,
  payload: {data},
});

export const setSizeAction = (data: number): IAction => ({
  type: Actions.SET_SIZE,
  payload: {data},
});

export const setHasDateAction = (data: boolean): IAction => ({
  type: Actions.SET_HAS_DATE,
  payload: {data},
});

export const setHasTimeAction = (data: boolean): IAction => ({
  type: Actions.SET_HAS_TIME,
  payload: {data},
});

export const setHasLocationAction = (data: boolean): IAction => ({
  type: Actions.SET_HAS_LOCATION,
  payload: {data},
});

export const setHasCoordinatesAction = (data: boolean): IAction => ({
  type: Actions.SET_HAS_COORDINATES,
  payload: {data},
});

export const setIsChangeTextAction = (data: boolean): IAction => ({
  type: Actions.SET_IS_CHANGE_TEXT,
  payload: {data},
});

export const setUserLocationTextAction = (data: string): IAction => ({
  type: Actions.SET_USER_LOCATION_TEXT,
  payload: {data},
});

export const setFontLocationAction = (data: string): IAction => ({
  type: Actions.SET_FONT_LOCATION,
  payload: {data},
});
