import React, {useMemo} from "react";
import {Text, StyleSheet} from "react-native";
import Style from "../style/Light";

interface IProps {
  children: React.ReactNode;
  enabled?: boolean;
  style?: object;
}

function Label({children, style, enabled = true}: IProps) {
  // console.log("Label", children);

  const styleContainer = useMemo(
    () => [styles.container, style, {opacity: enabled ? 1 : 0.5}],
    [style, enabled],
  );

  return <Text style={styleContainer}>{children}</Text>;
}

export default React.memo(Label);

const styles = StyleSheet.create({
  container: {
    ...Style.font_bold,
    fontSize: 16,
    marginBottom: 8,
  },
});
