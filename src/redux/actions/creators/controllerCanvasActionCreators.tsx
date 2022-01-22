import {IAction, IHolst} from "../../../types/types";
import {TCanvasState} from "../../reducers/controllerCanvasReducer";
import Actions from "../types/controllerCanvasActionTypes";

export const setInitCanvasAction = (data: TCanvasState): IAction => ({
  type: Actions.INIT_STATE,
  payload: {data},
});

export const setHolstIdAction = (data: number): IAction => ({
  type: Actions.SET_HOLST_ID,
  payload: {data},
});

export const setHolstColorAction = (data: string): IAction => ({
  type: Actions.SET_HOLST_COLOR,
  payload: {data},
});

export const setHasHolstBorderAction = (data: boolean): IAction => ({
  type: Actions.SET_HAS_HOLST_BORDER,
  payload: {data},
});

export const setIndentHolstBorderAction = (data: number): IAction => ({
  type: Actions.SET_INDENT_HOLST_BORDER,
  payload: {data},
});

export const setWidthHolstBorderAction = (data: number): IAction => ({
  type: Actions.SET_WIDTH_HOLST_BORDER,
  payload: {data},
});

export const setColorHolstBorderAction = (data: string): IAction => ({
  type: Actions.SET_COLOR_HOLST_BORDER,
  payload: {data},
});

export const setHolstImageIdAction = (data: number): IAction => ({
  type: Actions.SET_HOLST_IMAGE_ID,
  payload: {data},
});
