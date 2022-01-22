import {createObjByType} from "../../helper";
import {IAction} from "../../types/types";
import Actions from "../actions/types/controllerLocationActionTypes";

export type TLocationState = {
  fontLocation: string;
  colorLocation: string;
  sizeLocation: number;
  hasDateLocation: boolean;
  hasTimeLocation: boolean;
  hasLocation: boolean;
  hasCoordinates: boolean;
  isChangeTextLocation: boolean;
  userTextLocation: string;
};

const initialState: TLocationState = {
  fontLocation: "Nunito-Regular",
  colorLocation: "#000000",
  sizeLocation: 0,
  hasDateLocation: false,
  hasTimeLocation: false,
  hasLocation: false,
  hasCoordinates: false,
  isChangeTextLocation: false,
  userTextLocation: "",
};

const controllerLocationReducer = (
  state = initialState,
  action: IAction,
): TLocationState => {
  switch (action.type) {
    case Actions.INIT_STATE:
      return {
        ...createObjByType<TLocationState>(state, action.payload.data),
      };
    case Actions.SET_FONT_LOCATION:
      return {
        ...state,
        fontLocation: action.payload.data,
      };
    case Actions.SET_COLOR:
      return {
        ...state,
        colorLocation: action.payload.data,
      };
    case Actions.SET_SIZE:
      return {
        ...state,
        sizeLocation: action.payload.data,
      };
    case Actions.SET_HAS_DATE:
      return {
        ...state,
        hasDateLocation: action.payload.data,
      };
    case Actions.SET_HAS_TIME:
      return {
        ...state,
        hasTimeLocation: action.payload.data,
      };
    case Actions.SET_HAS_LOCATION:
      return {
        ...state,
        hasLocation: action.payload.data,
      };
    case Actions.SET_HAS_COORDINATES:
      return {
        ...state,
        hasCoordinates: action.payload.data,
      };
    case Actions.SET_IS_CHANGE_TEXT:
      return {
        ...state,
        isChangeTextLocation: action.payload.data,
      };
    case Actions.SET_USER_LOCATION_TEXT:
      return {
        ...state,
        userTextLocation: action.payload.data,
      };
    default:
      return state;
  }
};

export default controllerLocationReducer;
