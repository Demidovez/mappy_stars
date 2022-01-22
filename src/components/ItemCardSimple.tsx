import React, { useCallback, useMemo } from "react";
import {Text, StyleSheet, View, Pressable} from "react-native";
import {useAppSelector} from "../hooks";
import {Selectors} from "../redux/selectors/selectors";
import Style from "../style/Light";
import {IListItem} from "../types/types";

function ItemCardSimple({
  id,
  isFirstItem,
  data = [],
  isActive,
  onPress,
}: IListItem) {
  // console.log("ItemCardSimple");

  const theme = useAppSelector(Selectors.getTheme);
  const item = useMemo(() => data.find(item => item.id === id), [data, id]);

  const handlePress = useCallback(() => onPress(item?.name), [item]);

  const styleContainer = useMemo(() => [
    styles.item,
    {
      marginLeft: isFirstItem ? 18 : -5,
      borderColor: isActive ? theme.colors.primary : "transparent",
    },
  ], [isFirstItem, isActive, theme]);

  const styleContent = useMemo(() => [
    styles.inner_border,
    {
      borderColor: isActive
        ? "transparent"
        : theme.colors.primary + "44",
    },
  ], [isActive, theme]);

  return (
    <Pressable onPress={handlePress}>
      <View
        style={styleContainer}>
        <View
          style={styleContent}>
          <Text style={styles.title}>{item?.name}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default React.memo(
  ItemCardSimple
);

const styles = StyleSheet.create({
  item: {
    borderRadius: 6,
    marginRight: 18,
    marginBottom: 15,
    borderWidth: 3,
  },
  inner_border: {
    borderRadius: 6,
    padding: 15,
    borderWidth: 1,
  },
  title: {
    ...Style.font_bold,
    fontSize: 16,
    textAlign: "center",
  },
});
