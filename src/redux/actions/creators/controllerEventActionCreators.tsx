import {IAction, IVariant} from "../../../types/types";
import { TEventState } from "../../reducers/controllerEventReducer";
import Actions from "../types/controllerEventActionTypes";

export const setInitEventAction = (data: TEventState): IAction => ({
  type: Actions.INIT_STATE,
  payload: {data},
});

export const setDateAction = (data: Date): IAction => ({
  type: Actions.SET_DATE,
  payload: {data},
});

export const setLocationAction = (data: string): IAction => ({
  type: Actions.SET_LOCATION,
  payload: {data},
});

export const setLatitudeAction = (data: number): IAction => {
  return {
    type: Actions.SET_LATITUDE,
    payload: {data},
  };
};

export const setLongtitudeAction = (data: number): IAction => ({
  type: Actions.SET_LONGTITUDE,
  payload: {data},
});

export const setVariantsAction = (data: IVariant[]): IAction => ({
  type: Actions.SET_VARIANTS,
  payload: {data},
});

export const getVariantsAction = (search: string, lang: string): IAction => ({
  type: Actions.FETCH_VARIANTS,
  payload: {search, lang},
});

export const clearVariantsAction = (): IAction => ({
  type: Actions.CLEAR_VARIANTS,
  payload: null,
});
