import {IAction} from "../../types/types";
import Actions from "../actions/types/projectsActionTypes";

export const RESULT = {
  ADDED: 0,
  ERROR: 1,
  DELETED: 2,
  EDITED: 3,
};

const initialState = {
  isLoading: false,
  data: [],
};

const projectsReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case Actions.FETCH_PROJECTS:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.SET_PROJECTS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
      };
    default:
      return state;
  }
};

export default projectsReducer;
