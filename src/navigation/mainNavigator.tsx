import React from "react";
import {NavigationContainer, DefaultTheme} from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import {Routes} from "./routes";
import Tabs from "./tabsNavigator";
import Anothers from "./anothersNavigator";
import Modals from "./modalsNavigator";
import {navigationRef} from "./rootNavigation";
import {useMemo} from "react";

export type TMainStackParamList = {
  [Routes.Tabs]: {screen: Routes; params?: object};
  [Routes.Anothers]: {screen: Routes; params?: object};
  [Routes.Modals]: {screen: Routes; params?: object};
};

export type TMainStackScreenProps<Screen extends keyof TMainStackParamList> =
  NativeStackScreenProps<TMainStackParamList, Screen>;

const MainStack = createNativeStackNavigator<TMainStackParamList>();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

export default function Navigate() {
  // console.log("Navigate");

  const optionsNavigator = useMemo(
    () => ({
      headerShown: false,
    }),
    [],
  );

  const optionsModals = useMemo(
    (): any => ({
      presentation: "transparentModal",
      animation: "fade",
    }),
    [],
  );

  return (
    <NavigationContainer ref={navigationRef} theme={theme}>
      <MainStack.Navigator screenOptions={optionsNavigator}>
        <MainStack.Screen name={Routes.Tabs} component={Tabs} />
        <MainStack.Screen name={Routes.Anothers} component={Anothers} />
        <MainStack.Group screenOptions={optionsModals}>
          <MainStack.Screen name={Routes.Modals} component={Modals} />
        </MainStack.Group>
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
