import {IAction, IShape} from "../../../types/types";
import {TSeparatorState} from "../../reducers/controllerSeparatorReducer";
import Actions from "../types/controllerSeparatorActionTypes";

export const setInitSeparatorAction = (data: TSeparatorState): IAction => ({
  type: Actions.INIT_STATE,
  payload: {data},
});

export const setColorSeparatorAction = (data: string): IAction => ({
  type: Actions.SET_COLOR_SEPARATOR,
  payload: {data},
});

export const setShapeSeparatorIdAction = (data: number): IAction => ({
  type: Actions.SET_SHAPE_SEPARATOR_ID,
  payload: {data},
});

export const setSizeSeparatorAction = (data: number): IAction => ({
  type: Actions.SET_SIZE_SEPARATOR,
  payload: {data},
});

export const setHasSeparatorAction = (data: boolean): IAction => ({
  type: Actions.SET_HAS_SEPARATOR,
  payload: {data},
});
