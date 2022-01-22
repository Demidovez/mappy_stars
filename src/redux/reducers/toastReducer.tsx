import {ToastShowOptions} from "react-native-toast-message";
import {IAction} from "../../types/types";
import Actions from "../actions/types/toastActionTypes";

const initialState: ToastShowOptions = {
  type: "",
  position: undefined,
  text1: undefined,
  text2: undefined,
  visibilityTime: undefined,
  autoHide: undefined,
  topOffset: undefined,
  bottomOffset: undefined,
  props: undefined,
  onShow: undefined,
  onHide: undefined,
  onPress: undefined,
};

const toastReducer = (
  state = initialState,
  action: IAction,
): ToastShowOptions => {
  switch (action.type) {
    case Actions.SET_TOAST:
      return {
        ...action.payload,
      };
    case Actions.SET_TOAST_RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default toastReducer;
