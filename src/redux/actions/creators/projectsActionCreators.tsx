import {IAction, ITemplate} from "../../../types/types";
import Actions from "../types/projectsActionTypes";

export const fetchProjectsAction = (): IAction => ({
  type: Actions.FETCH_PROJECTS,
  payload: null,
});

export const setProjectsAction = (data: any[]): IAction => ({
  type: Actions.SET_PROJECTS,
  payload: {data},
});
