import {createObjByType} from "../../helper";
import {IAction} from "../../types/types";
import Actions from "../actions/types/controllerStarsActionTypes";

export type TStarsState = {
  hasGraticule: boolean;
  colorGraticule: string;
  hasDashedGraticule: boolean;
  opacityGraticule: number;
  opacityStars: number;
  widthGraticule: number;
  hasMilkyWay: boolean;
  colorStars: string;
  sizeStars: number;
  hasConstellations: boolean;
  colorConstellations: string;
  opacityConstellations: number;
  widthConstellations: number;
  hasNames: boolean;
  colorNames: string;
  sizeNames: number;
  langNames: string;
};

const initialState: TStarsState = {
  hasGraticule: false,
  colorGraticule: "#FFFFFF",
  hasDashedGraticule: false,
  opacityGraticule: 0,
  opacityStars: 100,
  widthGraticule: 0,
  hasMilkyWay: false,
  colorStars: "#FFFFFF",
  sizeStars: 0,
  hasConstellations: false,
  colorConstellations: "#FFFFFF",
  opacityConstellations: 0,
  widthConstellations: 0,
  hasNames: false,
  colorNames: "#FFFFFF",
  sizeNames: 0,
  langNames: "en",
};

const controllerStarsReducer = (
  state = initialState,
  action: IAction,
): TStarsState => {
  switch (action.type) {
    case Actions.INIT_STATE:
      return {
        ...createObjByType<TStarsState>(state, action.payload.data),
      };
    case Actions.SET_HAS_GRATICULE:
      return {
        ...state,
        hasGraticule: action.payload.data,
      };
    case Actions.SET_COLOR_GRATICULE:
      return {
        ...state,
        colorGraticule: action.payload.data,
      };
    case Actions.SET_HAS_DASHED_GRATICULE:
      return {
        ...state,
        hasDashedGraticule: action.payload.data,
      };
    case Actions.SET_OPACITY_GRATICULE:
      return {
        ...state,
        opacityGraticule: action.payload.data,
      };
    case Actions.SET_OPACITY_STARS:
      return {
        ...state,
        opacityStars: action.payload.data,
      };
    case Actions.SET_WIDTH_GRATICULE:
      return {
        ...state,
        widthGraticule: action.payload.data,
      };
    case Actions.SET_HAS_MILKY_WAY:
      return {
        ...state,
        hasMilkyWay: action.payload.data,
      };
    case Actions.SET_COLOR_STARS:
      return {
        ...state,
        colorStars: action.payload.data,
      };
    case Actions.SET_SIZE_STARS:
      return {
        ...state,
        sizeStars: action.payload.data,
      };
    case Actions.SET_HAS_CONSTELLATIONS:
      return {
        ...state,
        hasConstellations: action.payload.data,
      };
    case Actions.SET_COLOR_CONSTELLATIONS:
      return {
        ...state,
        colorConstellations: action.payload.data,
      };
    case Actions.SET_OPACITY_CONSTELLATIONS:
      return {
        ...state,
        opacityConstellations: action.payload.data,
      };
    case Actions.SET_WIDTH_CONSTELLATIONS:
      return {
        ...state,
        widthConstellations: action.payload.data,
      };
    case Actions.SET_HAS_NAMES:
      return {
        ...state,
        hasNames: action.payload.data,
      };
    case Actions.SET_COLOR_NAMES:
      return {
        ...state,
        colorNames: action.payload.data,
      };
    case Actions.SET_SIZE_NAMES:
      return {
        ...state,
        sizeNames: action.payload.data,
      };
    case Actions.SET_LANG_NAMES:
      return {
        ...state,
        langNames: action.payload.data,
      };
    default:
      return state;
  }
};

export default controllerStarsReducer;
