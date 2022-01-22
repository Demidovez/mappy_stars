import React, {useMemo} from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  Text,
} from "react-native";
import Svg, {Defs, LinearGradient, Rect, Stop} from "react-native-svg";
import Style from "../style/Light";
import Label from "./Label";

const WIDTH = Dimensions.get("window").width;

interface ITextareaWithLabel {
  label?: string;
  text: string;
  style?: object;
  enabled?: boolean;
  onPress: () => void;
}

function TextareaWithLabel({
  label,
  text,
  style,
  enabled = true,
  onPress,
}: ITextareaWithLabel) {
  // console.log("TextareaWithLabel");

  const styleContainer = useMemo(
    () => [style, {opacity: enabled ? 1 : 0.5}],
    [style, enabled],
  );

  return (
    <View style={styleContainer}>
      {label && <Label>{label}</Label>}
      <TouchableWithoutFeedback disabled={!enabled} onPress={onPress}>
        <View style={styles.wrapper}>
          <Text style={styles.input}>{text + "\n"}</Text>
          <Svg height={20} width={WIDTH} style={styles.gradient}>
            <Defs>
              <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="100%">
                <Stop offset="100%" stopColor="#EDEEF1" stopOpacity="1" />
                <Stop offset="0%" stopColor="white" stopOpacity="0" />
              </LinearGradient>
            </Defs>
            <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
          </Svg>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

export default React.memo(TextareaWithLabel);

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#EDEEF1",
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 6,
    marginBottom: 15,
    overflow: "hidden",
  },
  input: {
    ...Style.font_bold,
    fontSize: 16,
    textAlignVertical: "top",
    paddingBottom: 0,
    maxHeight: 4 * 23,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
