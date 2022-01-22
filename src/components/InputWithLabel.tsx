import React, { useCallback, useMemo } from "react";
import {Text, StyleSheet, View} from "react-native";
import {RectButton} from "react-native-gesture-handler";
import Style from "../style/Light";
import {Routes} from "../navigation/routes";
import * as RootNavigation from "../navigation/rootNavigation";
import Label from "./Label";

interface IInputWithLabel {
  label: string;
  text: string;
  modalName: Routes;
  style?: object;
  enabled?: boolean;
}

function InputWithLabel({
  label,
  text,
  modalName,
  style,
  enabled = true,
}: IInputWithLabel) {
  // console.log("InputWithLabel", label);

  const handlePress = useCallback( () => {
    RootNavigation.navigate(Routes.Modals, {
      screen: modalName,
    });
  }, [modalName]);

  const styleContainer = useMemo(() => [style, {opacity: enabled ? 1 : 0.5}], [style, enabled]);

  return (
    <View style={styleContainer}>
      <Label>{label}</Label>
      <RectButton
        enabled={enabled}
        onPress={handlePress}
        rippleColor={"#ffffff"}
        style={styles.button}>
        <Text style={styles.input}>{text}</Text>
      </RectButton>
    </View>
  );
}

export default React.memo(InputWithLabel);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#EDEEF1",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 6,
    marginBottom: 15,
  },
  input: {
    ...Style.font_bold,
    fontSize: 16,
  },
});
