import {IAction} from "../../../types/types";
import {TStarsState} from "../../reducers/controllerStarsReducer";
import Actions from "../types/controllerStarsActionTypes";

export const setInitStarsAction = (data: TStarsState): IAction => ({
  type: Actions.INIT_STATE,
  payload: {data},
});

export const setHasConstellationsAction = (data: boolean): IAction => ({
  type: Actions.SET_HAS_CONSTELLATIONS,
  payload: {data},
});

export const setHasDashedGraticuleAction = (data: boolean): IAction => ({
  type: Actions.SET_HAS_DASHED_GRATICULE,
  payload: {data},
});

export const setHasMilkyWayAction = (data: boolean): IAction => ({
  type: Actions.SET_HAS_MILKY_WAY,
  payload: {data},
});

export const setHasNamesAction = (data: boolean): IAction => ({
  type: Actions.SET_HAS_NAMES,
  payload: {data},
});

export const setLangNamesAction = (data: string): IAction => ({
  type: Actions.SET_LANG_NAMES,
  payload: {data},
});

export const setOpacityConstellationsAction = (data: number): IAction => ({
  type: Actions.SET_OPACITY_CONSTELLATIONS,
  payload: {data},
});

export const setOpacityGraticuleAction = (data: number): IAction => ({
  type: Actions.SET_OPACITY_GRATICULE,
  payload: {data},
});

export const setOpacityStarsAction = (data: number): IAction => ({
  type: Actions.SET_OPACITY_STARS,
  payload: {data},
});

export const setSizeNamesAction = (data: number): IAction => ({
  type: Actions.SET_SIZE_NAMES,
  payload: {data},
});

export const setSizeStarsAction = (data: number): IAction => ({
  type: Actions.SET_SIZE_STARS,
  payload: {data},
});

export const setWidthConstellationsAction = (data: number): IAction => ({
  type: Actions.SET_WIDTH_CONSTELLATIONS,
  payload: {data},
});

export const setWidthGraticuleAction = (data: number): IAction => ({
  type: Actions.SET_WIDTH_GRATICULE,
  payload: {data},
});

export const setColorConstellationsAction = (data: string): IAction => ({
  type: Actions.SET_COLOR_CONSTELLATIONS,
  payload: {data},
});

export const setColorGraticuleAction = (data: string): IAction => ({
  type: Actions.SET_COLOR_GRATICULE,
  payload: {data},
});

export const setColorNamesAction = (data: string): IAction => ({
  type: Actions.SET_COLOR_NAMES,
  payload: {data},
});

export const setColorStarsAction = (data: string): IAction => ({
  type: Actions.SET_COLOR_STARS,
  payload: {data},
});

export const setHasGraticuleAction = (data: boolean): IAction => ({
  type: Actions.SET_HAS_GRATICULE,
  payload: {data},
});
