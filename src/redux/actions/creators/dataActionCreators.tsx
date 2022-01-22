import {
  IAction,
  IController,
  IHolst,
  IImage,
  IShape,
  ITemplate,
} from "../../../types/types";
import Actions from "../types/dataActionTypes";

export const fetchTemplatesAction = (): IAction => ({
  type: Actions.FETCH_TEMPLATES,
  payload: null,
});

export const setTemplatesAction = (data: ITemplate[]): IAction => ({
  type: Actions.SET_TEMPLATES,
  payload: {data},
});

export const fetchControllersAction = (): IAction => ({
  type: Actions.FETCH_CONTROLLERS,
  payload: null,
});

export const setControllersAction = (data: IController[]): IAction => ({
  type: Actions.SET_CONTROLLERS,
  payload: {data},
});

export const fetchHolstsAction = (): IAction => ({
  type: Actions.FETCH_HOLSTS,
  payload: null,
});

export const setHolstsAction = (data: IHolst[]): IAction => ({
  type: Actions.SET_HOLSTS,
  payload: {data},
});

export const fetchColorsAction = (): IAction => ({
  type: Actions.FETCH_COLORS,
  payload: null,
});

export const setColorsAction = (data: string[]): IAction => ({
  type: Actions.SET_COLORS,
  payload: {data},
});

export const fetchShapesBorderMapAction = (): IAction => ({
  type: Actions.FETCH_SHAPES_BORDER_MAP,
  payload: null,
});

export const setShapesBorderMapAction = (data: IShape[]): IAction => ({
  type: Actions.SET_SHAPES_BORDER_MAP,
  payload: {data},
});

export const fetchShapesSeparatorAction = (): IAction => ({
  type: Actions.FETCH_SHAPES_SEPARATOR,
  payload: null,
});

export const setShapesSeparatorAction = (data: IShape[]): IAction => ({
  type: Actions.SET_SHAPES_SEPARATOR,
  payload: {data},
});

export const fetchFontsAction = (): IAction => ({
  type: Actions.FETCH_FONTS,
  payload: null,
});

export const setLoadedFontsAction = (data: string[]): IAction => ({
  type: Actions.SET_LOADED_FONTS,
  payload: {data},
});

export const fetchHolstImagesAction = (): IAction => ({
  type: Actions.FETCH_HOLST_IMAGES,
  payload: null,
});

export const setHolstImagesAction = (data: IImage[]): IAction => {
  return {
    type: Actions.SET_HOLST_IMAGES,
    payload: {data},
  };
};

export const setInitDataAction = (data: ITemplate): IAction => {
  return {
    type: Actions.SET_ADDITINAL_DATA,
    payload: {data},
  };
};
