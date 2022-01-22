import React, {useCallback, useEffect, useMemo, useState} from "react";
import {StyleSheet, View, Pressable} from "react-native";
import {useAppSelector} from "../hooks";
import {Routes} from "../navigation/routes";
import * as RootNavigation from "../navigation/rootNavigation";
import SvgColors from "../../assets/icons/colors.svg";
import {Selectors} from "../redux/selectors/selectors";

interface IProps {
  currentColor: string;
  onPress: (color: string) => {};
}

function ItemColorPicker({currentColor, onPress}: IProps) {
  // console.log("ItemColorPicker");

  const theme = useAppSelector(Selectors.getTheme);
  const colors = useAppSelector(Selectors.getColors);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(!colors.includes(currentColor));
  }, [currentColor]);

  const handlePress = useCallback(() => {
    RootNavigation.navigate(Routes.Modals, {
      screen: Routes.ModalPickerColor,
      params: {
        onSetColor: onPress,
        color: currentColor,
        label: "Цвет фона холста",
      },
    });
  }, [onPress, currentColor]);

  const style = useMemo(() => [
    styles.item,
    {
      marginLeft: 18,
      borderColor: isActive ? theme.colors.primary : "transparent",
    },
  ], [isActive, theme])

  return (
    <Pressable onPress={handlePress}>
      <View
        style={style}>
        <SvgColors width={42} height={42} />
      </View>
    </Pressable>
  );
}

export default React.memo(ItemColorPicker);

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
