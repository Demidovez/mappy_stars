import {createObjByType} from "../../helper";
import {IAction, IFont} from "../../types/types";
import Actions from "../actions/types/controllerDescActionTypes";

export type TDescState = {
  textDesc: string;
  fontDesc: string;
  colorDesc: string;
  sizeDesc: number;
};

const initialState: TDescState = {
  textDesc: "",
  fontDesc: "Nunito-Regular",
  colorDesc: "#000000",
  sizeDesc: 0,
};

const controllerDescReducer = (
  state = initialState,
  action: IAction,
): TDescState => {
  switch (action.type) {
    case Actions.INIT_STATE:
      return {
        ...createObjByType<TDescState>(state, action.payload.data),
      };
    case Actions.SET_TEXT_DESC:
      return {
        ...state,
        textDesc: action.payload.data,
      };
    case Actions.SET_FONT_DESC:
      return {
        ...state,
        fontDesc: action.payload.data,
      };
    case Actions.SET_COLOR_DESC:
      return {
        ...state,
        colorDesc: action.payload.data,
      };
    case Actions.SET_SIZE_DESC:
      return {
        ...state,
        sizeDesc: action.payload.data,
      };
    default:
      return state;
  }
};

export default controllerDescReducer;
