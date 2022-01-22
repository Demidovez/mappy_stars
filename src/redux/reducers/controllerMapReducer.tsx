import {createObjByType} from "../../helper";
import {EShape, IAction} from "../../types/types";
import Actions from "../actions/types/controllerMapActionTypes";

export type TMapState = {
  sizeMap: number;
  mapColor: string;
  shapeBorderMapName: EShape;
  hasBorderMap: boolean;
  colorBorderMap: string;
  marginTopMap: number;
};

const initialState: TMapState = {
  sizeMap: 0,
  mapColor: "#000000",
  shapeBorderMapName: EShape.None,
  hasBorderMap: false, // TODO: Зачем? если есть EShape.None
  colorBorderMap: "#000000",
  marginTopMap: 0,
};

const controllerMapReducer = (
  state = initialState,
  action: IAction,
): TMapState => {
  switch (action.type) {
    case Actions.INIT_STATE:
      return {
        ...createObjByType<TMapState>(state, action.payload.data),
      };
    case Actions.SET_SIZE_MAP:
      return {
        ...state,
        sizeMap: action.payload.data,
      };
    case Actions.SET_MAP_COLOR:
      return {
        ...state,
        mapColor: action.payload.data,
      };
    case Actions.SET_SHAPE_BORDER_MAP_NAME:
      return {
        ...state,
        shapeBorderMapName: action.payload.data,
        hasBorderMap: action.payload.data !== EShape.None,
      };
    case Actions.SET_HAS_BORDER_MAP:
      return {
        ...state,
        hasBorderMap: action.payload.data,
      };
    case Actions.SET_COLOR_BORDER_MAP:
      return {
        ...state,
        colorBorderMap: action.payload.data,
      };
    case Actions.SET_MARGIN_TOP_MAP:
      return {
        ...state,
        marginTopMap: action.payload.data,
      };
    default:
      return state;
  }
};

export default controllerMapReducer;
