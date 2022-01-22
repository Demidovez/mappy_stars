import {View} from "react-native";
import {SvgProps} from "react-native-svg";
import {EFormat, IAction} from "../../../types/types";
import Actions from "../types/controllerSaveActionTypes";

export const setFormatAction = (data: EFormat): IAction => ({
  type: Actions.SET_FORMAT,
  payload: {data},
});

export const setRefTemplateAction = (
  data: React.RefObject<React.Component<SvgProps, any, any>>,
): IAction => ({
  type: Actions.SET_REF_TEMPLATE,
  payload: {data},
});
