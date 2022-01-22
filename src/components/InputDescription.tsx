import React, { useMemo } from "react";
import {Text, StyleSheet} from "react-native";
import Style from "../style/Light";

interface IProps {
  text: string;
  isError?: boolean;
  align?: "right" | "left";
}

function InputDescription({text, isError = false, align = "left"}: IProps) {
  // console.log("InputDescription");

  const style = useMemo(() => [styles.container, isError && styles.error, {textAlign: align}] , [isError, align])

  return (
    <Text
      style={style}>
      {isError ? "Неверное значение!" : text}
    </Text>
  );
}

export default React.memo(InputDescription);

const styles = StyleSheet.create({
  container: {
    ...Style.font,
    fontSize: 14,
    color: "#A2A6AA",
  },
  error: {
    color: "#e74c3c",
  },
});
