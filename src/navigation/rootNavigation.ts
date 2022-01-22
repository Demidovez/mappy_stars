import {createNavigationContainerRef} from "@react-navigation/native";
import {TMainStackParamList} from "./mainNavigator";
import {Routes} from "./routes";

export const navigationRef =
  createNavigationContainerRef<TMainStackParamList>();

export function navigate(
  screen: keyof TMainStackParamList,
  params: {screen: Routes; params?: object},
) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(screen, params);
  }
}
