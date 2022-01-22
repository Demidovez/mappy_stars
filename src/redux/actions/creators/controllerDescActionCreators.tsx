import {IAction} from "../../../types/types";
import { TDescState } from "../../reducers/controllerDescReducer";
import Actions from "../types/controllerDescActionTypes";

export const setInitDescAction = (data: TDescState): IAction => ({
  type: Actions.INIT_STATE,
  payload: {data},
});

export const setTextDescAction = (data: string): IAction => ({
  type: Actions.SET_TEXT_DESC,
  payload: {data},
});

export const setFontDescAction = (data: string): IAction => ({
  type: Actions.SET_FONT_DESC,
  payload: {data},
});

export const setSizeDescAction = (data: number): IAction => ({
  type: Actions.SET_SIZE_DESC,
  payload: {data},
});

export const setColorDescAction = (data: string): IAction => ({
  type: Actions.SET_COLOR_DESC,
  payload: {data},
});
