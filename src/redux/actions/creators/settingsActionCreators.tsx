import Actions from "../types/settingsActionTypes";

export const setColorAction = (data: string[]) => ({
  type: Actions.SET_COLORS,
  payload: {data},
});
