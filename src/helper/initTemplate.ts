import {setInitCanvasAction} from "../redux/actions/creators/controllerCanvasActionCreators";
import {setInitDescAction} from "../redux/actions/creators/controllerDescActionCreators";
import {setInitEventAction} from "../redux/actions/creators/controllerEventActionCreators";
import {setInitLocationAction} from "../redux/actions/creators/controllerLocationActionCreators";
import {setInitMapAction} from "../redux/actions/creators/controllerMapActionCreators";
import {setInitSeparatorAction} from "../redux/actions/creators/controllerSeparatorActionCreators";
import {setInitStarsAction} from "../redux/actions/creators/controllerStarsActionCreators";
import {setInitDataAction} from "../redux/actions/creators/dataActionCreators";
import {ITemplate} from "../types/types";

// Инициализируем шаблона первоначальными данными
export default function initTemplate(template: ITemplate, dispatch: Function) {
  new Promise((resolve: Function) => {
    dispatch(setInitCanvasAction(template));
    dispatch(setInitDescAction(template));
    dispatch(setInitEventAction(template));
    dispatch(setInitLocationAction(template));
    dispatch(setInitMapAction(template));
    dispatch(setInitSeparatorAction(template));
    dispatch(setInitStarsAction(template));
    dispatch(setInitDataAction(template));

    resolve();
  });
}
