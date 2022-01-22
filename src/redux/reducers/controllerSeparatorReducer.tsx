import {createObjByType} from "../../helper";
import {EShape, IAction, IShape} from "../../types/types";
import Actions from "../actions/types/controllerSeparatorActionTypes";

export type TSeparatorState = {
  shapeSeparatorId: number | null;
  sizeSeparator: number;
  hasSeparator: boolean;
  colorSeparator: string;
};

const initialState: TSeparatorState = {
  shapeSeparatorId: null,
  sizeSeparator: 0,
  hasSeparator: false,
  colorSeparator: "#000000",
};

const controllerSeparatorV1Reducer = (
  state = initialState,
  action: IAction,
): TSeparatorState => {
  switch (action.type) {
    case Actions.INIT_STATE:
      return {
        ...createObjByType<TSeparatorState>(state, action.payload.data),
      };
    case Actions.SET_SHAPE_SEPARATOR_ID:
      return {
        ...state,
        shapeSeparatorId: action.payload.data,
        hasSeparator: action.payload.data !== EShape.None, // TODO: Надо подумать
      };
    case Actions.SET_HAS_SEPARATOR:
      return {
        ...state,
        hasSeparator: action.payload.data,
      };
    case Actions.SET_SIZE_SEPARATOR:
      return {
        ...state,
        sizeSeparator: action.payload.data,
      };
    case Actions.SET_COLOR_SEPARATOR:
      return {
        ...state,
        colorSeparator: action.payload.data,
      };
    default:
      return state;
  }
};

export default controllerSeparatorV1Reducer;
