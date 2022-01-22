import {createObjByType} from "../../helper";
import {IAction, IHolst} from "../../types/types";
import Actions from "../actions/types/controllerCanvasActionTypes";

export type TCanvasState = {
  holstId: number | null;
  holstColor: string;
  hasHolstBorder: boolean;
  indentHolstBorder: number;
  widthHolstBorder: number;
  colorHolstBorder: string;
  holstImageId: number | null;
};

const initialState: TCanvasState = {
  holstId: null,
  holstColor: "#FFFFFF",
  hasHolstBorder: false,
  indentHolstBorder: 0,
  widthHolstBorder: 0,
  colorHolstBorder: "#000000",
  holstImageId: 0,
};

const controllerCanvasReducer = (
  state = initialState,
  action: IAction,
): TCanvasState => {
  switch (action.type) {
    case Actions.INIT_STATE:
      return {
        ...createObjByType<TCanvasState>(state, action.payload.data),
      };
    case Actions.SET_HOLST_ID:
      return {
        ...state,
        holstId: action.payload.data,
      };
    case Actions.SET_HOLST_COLOR:
      return {
        ...state,
        holstColor: action.payload.data,
      };
    case Actions.SET_HAS_HOLST_BORDER:
      return {
        ...state,
        hasHolstBorder: action.payload.data,
      };
    case Actions.SET_INDENT_HOLST_BORDER:
      return {
        ...state,
        indentHolstBorder: action.payload.data,
      };
    case Actions.SET_WIDTH_HOLST_BORDER:
      return {
        ...state,
        widthHolstBorder: action.payload.data,
      };
    case Actions.SET_COLOR_HOLST_BORDER:
      return {
        ...state,
        colorHolstBorder: action.payload.data,
      };
    case Actions.SET_HOLST_IMAGE_ID:
      return {
        ...state,
        holstImageId: action.payload.data,
      };
    default:
      return state;
  }
};

export default controllerCanvasReducer;
