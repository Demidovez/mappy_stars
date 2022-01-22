import React, {useCallback, useMemo} from "react";
import {StyleSheet, View, Pressable} from "react-native";
import {useAppSelector} from "../hooks";
import {Selectors} from "../redux/selectors/selectors";
import Style from "../style/Light";
import {IListItem} from "../types/types";
import SvgImage from "./SvgImage";

function ItemShape({id, isFirstItem, onPress, data = [], isActive}: IListItem) {
  // console.log("ItemShape");

  const theme = useAppSelector(Selectors.getTheme);
  const shape = useMemo(() => data.find(shape => shape.id === id), [data, id]);

  const handlePress = useCallback(() => onPress(shape?.name), [shape]);

  const styleContainer = useMemo(
    () => [
      styles.item,
      {
        marginLeft: isFirstItem ? 18 : -5,
        borderColor: isActive ? theme.colors.primary : "transparent",
      },
    ],
    [isFirstItem, isActive, theme],
  );

  const styleContent = useMemo(
    () => [
      styles.inner_border,
      {
        borderColor: isActive ? "transparent" : theme.colors.primary + "44",
      },
    ],
    [isActive, theme],
  );

  return (
    <Pressable onPress={handlePress}>
      <View style={styleContainer}>
        <View style={styleContent}>
          <SvgImage width={30} height={30} name={shape?.icon} />
        </View>
      </View>
    </Pressable>
  );
}

export default React.memo(
  ItemShape,
  (prevProps, nextProps) => prevProps.isActive === nextProps.isActive,
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
    padding: 10,
    borderWidth: 1,
  },
  title: {
    ...Style.font_bold,
    fontSize: 16,
    textAlign: "center",
  },
  subtitle: {
    ...Style.font,
    fontSize: 12,
    textAlign: "center",
    opacity: 0.7,
  },
});
