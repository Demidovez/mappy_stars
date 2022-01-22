import React, { useMemo } from "react";
import {StyleSheet, View, TextInput, ViewStyle, StyleProp} from "react-native";
import Style from "../style/Light";

interface IProps {
  text: string | undefined;
  maxLength?: number;
  onChange: (data: string) => void;
  type?: "numeric";
  compact?: boolean;
  style?: StyleProp<ViewStyle>;
}

function Input({text, maxLength, type, compact, onChange, style}: IProps) {
  // console.log("Input");

  const styleContainer = useMemo(() => [styles.container, compact && styles.container_compact, style], [compact, style]);
  const styleInput = useMemo(() => [styles.input, compact && styles.input_compact], [compact]);


  return (
    <View
      style={styleContainer}>
      <TextInput
        onChangeText={onChange}
        value={text}
        style={styleInput}
        selectionColor={"#4a5660"}
        placeholder={"Введите..."}
        keyboardType={type}
        contextMenuHidden={true}
        maxLength={maxLength}
      />
    </View>
  );
}

export default React.memo(Input);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EDEEF1",
    borderRadius: 6,
    paddingHorizontal: 8,
    marginTop: 10,
    marginBottom: 5,
  },
  container_compact: {
    paddingHorizontal: 6,
  },
  input: {
    ...Style.font_bold,
    fontSize: 19,
  },
  input_compact: {
    fontSize: 16,
  },
});
