import React from "react";
import {StyleSheet, View} from "react-native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import ModalPickerDate from "../components/Modals/ModalPickerDate";
import ModalPickerTime from "../components/Modals/ModalPickerTime";
import {Routes} from "./routes";
import ModalPickerLangNames from "../components/Modals/ModalPickerLangNames";
import ModalPickerFontLocation from "../components/Modals/ModalPickerFontLocation";
import ModalPickerFontDesc from "../components/Modals/ModalPickerFontDesc";
import ModalPickerLatitude from "../components/Modals/ModalPickerLatitude";
import ModalPickerLongitude from "../components/Modals/ModalPickerLongitude";
import ModalPickerColor from "../components/Modals/ModalPickerColor";
import ModalTextArea from "../components/Modals/ModalTextArea";
import ModalPickerLocation from "../components/Modals/ModalPickerLocation";
import {useMemo} from "react";
import ModalSendProblem from "../components/Modals/ModalSendProblem";
import ModalSaveProject from "../components/Modals/ModalSaveProject";

export type TModalsStackParamList = {
  [Routes.ModalPickerDate]: undefined;
  [Routes.ModalPickerTime]: undefined;
  [Routes.ModalPickerLangNames]: undefined;
  [Routes.ModalPickerFontLocation]: undefined;
  [Routes.ModalPickerFontDesc]: undefined;
  [Routes.ModalPickerLatitude]: undefined;
  [Routes.ModalPickerLongitude]: undefined;
  [Routes.ModalPickerColor]: {
    onSetColor: (color: string) => void;
    color: string;
    label: string;
  };
  [Routes.ModalTextArea]: {
    onSetText: (text: string) => void;
    label: string;
    text: string;
  };
  [Routes.ModalPickerLocation]: undefined;
  [Routes.ModalSendProblem]: undefined;
  [Routes.ModalSaveProject]: undefined;
};

export type TModalsStackScreenProps<
  Screen extends keyof TModalsStackParamList,
> = NativeStackScreenProps<TModalsStackParamList, Screen>;

const ModalsStack = createNativeStackNavigator<TModalsStackParamList>();

export default function Modals() {
  // console.log("Modals");

  const options = useMemo(
    () => ({
      headerShown: false,
    }),
    [],
  );

  return (
    <View style={styles.container}>
      <ModalsStack.Navigator screenOptions={options}>
        <ModalsStack.Screen
          name={Routes.ModalPickerDate}
          component={ModalPickerDate}
        />
        <ModalsStack.Screen
          name={Routes.ModalPickerTime}
          component={ModalPickerTime}
        />
        <ModalsStack.Screen
          name={Routes.ModalPickerLangNames}
          component={ModalPickerLangNames}
        />
        <ModalsStack.Screen
          name={Routes.ModalPickerFontLocation}
          component={ModalPickerFontLocation}
        />
        <ModalsStack.Screen
          name={Routes.ModalPickerFontDesc}
          component={ModalPickerFontDesc}
        />
        <ModalsStack.Screen
          name={Routes.ModalPickerLatitude}
          component={ModalPickerLatitude}
        />
        <ModalsStack.Screen
          name={Routes.ModalPickerLongitude}
          component={ModalPickerLongitude}
        />
        <ModalsStack.Screen
          name={Routes.ModalPickerColor}
          component={ModalPickerColor}
        />
        <ModalsStack.Screen
          name={Routes.ModalTextArea}
          component={ModalTextArea}
        />
        <ModalsStack.Screen
          name={Routes.ModalPickerLocation}
          component={ModalPickerLocation}
        />
        <ModalsStack.Screen
          name={Routes.ModalSendProblem}
          component={ModalSendProblem}
        />
        <ModalsStack.Screen
          name={Routes.ModalSaveProject}
          component={ModalSaveProject}
        />
      </ModalsStack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
});
