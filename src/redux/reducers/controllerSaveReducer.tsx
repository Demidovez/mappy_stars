import {SvgProps} from "react-native-svg";
import {EFormat, IAction} from "../../types/types";
import Actions from "../actions/types/controllerSaveActionTypes";

interface IFormatFile {
  id: number;
  name: EFormat;
}

interface ISaveV1State {
  formatFile: EFormat;
  formats: IFormatFile[];
  refTemplate: React.RefObject<React.Component<SvgProps, any, any>> | null;
}

const initialState: ISaveV1State = {
  formatFile: EFormat.JPG,
  formats: [
    {
      id: 0,
      name: EFormat.JPG,
    },
    {
      id: 1,
      name: EFormat.PDF,
    },
  ],
  refTemplate: null,
};

const controllerSaveReducer = (
  state = initialState,
  action: IAction,
): ISaveV1State => {
  switch (action.type) {
    case Actions.SET_FORMAT:
      return {
        ...state,
        formatFile: action.payload.data,
      };
    case Actions.SET_REF_TEMPLATE:
      return {
        ...state,
        refTemplate: action.payload.data,
      };
    default:
      return state;
  }
};

export default controllerSaveReducer;
