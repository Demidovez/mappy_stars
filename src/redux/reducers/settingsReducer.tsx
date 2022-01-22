import {IAction} from "../../types/types";
import Actions from "../actions/types/settingsActionTypes";

export const RESULT = {
  ADDED: 0,
  ERROR: 1,
  DELETED: 2,
  EDITED: 3,
};

const initialState = {
  language: "ru",
  app_name: "Mappy Stars: Звездная карта",
  serverStatic: "http://178.21.11.220:8090/",
  serverApi: "http://178.21.11.220:8080/",
  share_message:
    "Mappy Stars: Звездная карта\n\nПриложение для создания звездных карт!\n\n",
  link_share_market:
    "https://play.google.com/store/apps/details?id=com.google.android.youtube.tv&hl=ru&gl=US", // TODO: Заменить нужное
  link_share_store: "https://apps.apple.com/us/app/su-yao/id1166499145?ls=1", // TODO: Заменить нужное
  link_app_market: "market://details?id=com.google.android.youtube", // TODO: Заменить нужное
  link_app_store: "market://details?id=com.google.android.youtube", // TODO: Заменить нужное
  link_policy: "https://mappy-stars-zvezdna.flycricket.io/privacy.html", // TODO: Надо переделать наверное. Убрать мое имя.
  link_telegram: "https://t.me/mappy_stars",
  theme: {
    colors: {
      headerBar: "#FFFFFF",
      primary: "#4a5660",
      primaryLight: "#9fa7ad",
      font: "#4a5660",
      selected: "#4a5660",
      unSelected: "#A2A6AA",
      backgroundItem: "#E0E0E0",
      background: "#EDEEF1",
      backgroundSettings: "#FFFFFF",
      button: "#5bc3f1",
      buttonRipple: "#DDDDDD",
    },
  },
};

const settingsReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case Actions.SET_COLORS:
      return {
        ...state,
        theme: {
          ...state.theme,
          colors: action.payload.colors,
        },
      };
    default:
      return state;
  }
};

export default settingsReducer;
