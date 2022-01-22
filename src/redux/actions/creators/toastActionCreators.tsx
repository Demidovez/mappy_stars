import {ToastShowOptions} from "react-native-toast-message";
import Actions from "../types/toastActionTypes";

export const setToastAction = (options: ToastShowOptions) => ({
  type: Actions.SET_TOAST,
  payload: options,
});

export const setToastResetAction = () => ({
  type: Actions.SET_TOAST_RESET,
  payload: {},
});
