import React, { useMemo } from "react";
import {StyleSheet, View, Pressable} from "react-native";
import Label from "./Label";
import Checkbox from "./Checkbox";

interface ICheckboxWithLabel {
  label: string;
  enabled?: boolean;
  isChecked: boolean;
  onPress: () => void;
}

function CheckboxWithLabel({
  label,
  enabled = true,
  isChecked,
  onPress,
}: ICheckboxWithLabel) {
  // console.log("CheckboxWithLabel");

  const style = useMemo(() => [
    styles.horizontal_2,
    {opacity: enabled ? 1 : 0.5},
  ], [enabled])

  return (
    <View
      style={style}>
      <Pressable style={styles.label_wrap} onPress={onPress} disabled={!enabled}>
        <Label style={styles.label}>{label}</Label>
      </Pressable>
      <View style={styles.checkbox_wrap}>
        <Checkbox enabled={enabled} isChecked={isChecked} onPress={onPress} />
      </View>
    </View>
  );
}

export default React.memo(CheckboxWithLabel);

const styles = StyleSheet.create({
  horizontal_2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    marginTop: 10, 
    marginBottom: 15, 
  },
  label_wrap: {flex: 2},
  label: {
    paddingLeft: 18,
    paddingRight: 18,
    marginBottom: 3
  },
  checkbox_wrap: {flex: 1}
});
