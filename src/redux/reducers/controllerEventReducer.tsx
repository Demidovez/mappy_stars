import moment from "moment";
import {createObjByType} from "../../helper";
import {EStatus, IAction, IVariant} from "../../types/types";
import Actions from "../actions/types/controllerEventActionTypes";

export type TEventState = {
  date: Date;
  location: string;
  latitude: number;
  longtitude: number;
  variants: IVariant[];
  status: EStatus;
};

const initialState: TEventState = {
  // date: moment("2021-11-20 10:05:00", "YYYY-MM-DD HH:mm:00").toDate(),
  date: moment(new Date()).toDate(),
  location: "",
  latitude: 55.755825, // 55.755825
  longtitude: 37.617298, // 37.617298
  variants: [],
  status: EStatus.None,
};

const controllerEventReducer = (
  state = initialState,
  action: IAction,
): TEventState => {
  switch (action.type) {
    case Actions.INIT_STATE:
      return {
        ...createObjByType<TEventState>(state, action.payload.data),
      };
    case Actions.SET_DATE:
      return {
        ...state,
        date: action.payload.data,
      };
    case Actions.SET_LOCATION:
      return {
        ...state,
        status: EStatus.None,
        location: action.payload.data,
      };
    case Actions.SET_LATITUDE:
      return {
        ...state,
        latitude: action.payload.data,
      };
    case Actions.SET_LONGTITUDE:
      return {
        ...state,
        longtitude: action.payload.data,
      };
    case Actions.FETCH_VARIANTS:
      return {
        ...state,
        status: EStatus.Loading,
      };
    case Actions.SET_VARIANTS:
      return {
        ...state,
        status: EStatus.Done,
        variants: action.payload.data,
      };
    case Actions.CLEAR_VARIANTS:
      return {
        ...state,
        status: EStatus.None,
        variants: [],
      };
    default:
      return state;
  }
};

export default controllerEventReducer;
