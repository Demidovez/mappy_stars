import {combineReducers} from "redux";
import dataReducer from "./dataReducer";
import projectsReducer from "./projectsReducer";
import settingsReducer from "./settingsReducer";
import toastReducer from "./toastReducer";
import controllerEventReducer from "./controllerEventReducer";
import controllerCanvasReducer from "./controllerCanvasReducer";
import controllerDescReducer from "./controllerDescReducer";
import controllerLocationReducer from "./controllerLocationReducer";
import controllerMapReducer from "./controllerMapReducer";
import controllerSaveReducer from "./controllerSaveReducer";
import controllerSeparatorReducer from "./controllerSeparatorReducer";
import controllerStarsReducer from "./controllerStarsReducer";

const rootReducer = combineReducers({
  data: dataReducer,
  projects: projectsReducer,
  settings: settingsReducer,
  event: controllerEventReducer,
  canvas: controllerCanvasReducer,
  desc: controllerDescReducer,
  location: controllerLocationReducer,
  map: controllerMapReducer,
  save: controllerSaveReducer,
  separator: controllerSeparatorReducer,
  stars: controllerStarsReducer,
  toast: toastReducer,
});

export default rootReducer;
