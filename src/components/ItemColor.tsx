import React, { useCallback, useMemo } from "react";
import {StyleSheet, View, Pressable} from "react-native";
import {useAppSelector} from "../hooks";
import {Selectors} from "../redux/selectors/selectors";

interface IItem {
  color: string;
  enabled?: boolean;
  isActive: boolean;
  isWhite: boolean;
  onPress: (color: string) => {};
}

function ItemColor({color, enabled = true, isActive, isWhite, onPress}: IItem) {
  // console.log("ItemColor", color);

  const theme = useAppSelector(Selectors.getTheme);

  const handlePress = useCallback(() => onPress(color), [color]);

  const style = useMemo(() => [
    styles.item,
    {
      backgroundColor: isWhite ? "#EEEEEE" : color,
      marginLeft: -5,
      borderColor: isActive ? theme.colors.primary : "transparent",
    },
  ], [isWhite, color, isActive, theme])

  return (
    <Pressable disabled={!enabled} onPress={handlePress}>
      <View
        style={style} />
    </Pressable>
  );
}

export default React.memo(ItemColor);

const styles = StyleSheet.create({
  item: {
    borderRadius: 48 / 2,
    width: 48,
    height: 48,
    marginRight: 18,
    marginBottom: 15,
    borderWidth: 3,
  },
});
