import React, {useCallback, useMemo} from "react";
import {Pressable, StyleProp, View, ViewStyle} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {useAppSelector} from "../hooks";
import SvgChecked from "../../assets/icons/check.svg";
import {Selectors} from "../redux/selectors/selectors";

interface IProps {
  isChecked: boolean;
  enabled?: boolean;
  onPress: () => void;
}

function Checkbox({isChecked, enabled = true, onPress}: IProps) {
  // console.log("Checkbox");

  const theme = useAppSelector(Selectors.getTheme);

  const size = 30;
  const borderWidth = 3;
  const borderRadius = 5;

  const styleComponent = useMemo(
    (): StyleProp<ViewStyle> => ({
      width: size - 2 * borderWidth + 1,
      height: size - 2 * borderWidth + 1,
      backgroundColor: theme.colors.primary,
      justifyContent: "center",
      alignItems: "center",
    }),
    [theme],
  );

  const ImageComponent = useCallback(
    () => (
      <View style={styleComponent}>
        <SvgChecked width={size * 0.5} height={size * 0.5} fill="#FFFFFF" />
      </View>
    ),
    [styleComponent],
  );

  const iconStyle = useMemo(
    () => ({
      borderColor: theme.colors.primary,
      borderRadius: borderRadius,
      borderWidth: borderWidth,
    }),
    [theme],
  );

  return (
    <BouncyCheckbox
      TouchableComponent={Pressable}
      disabled={!enabled}
      ImageComponent={ImageComponent}
      size={size}
      fillColor={theme.colors.primary}
      unfillColor="#ffffff"
      isChecked={isChecked}
      disableText={true}
      disableBuiltInState
      iconStyle={iconStyle}
      textStyle={{fontFamily: "JosefinSans-Regular"}}
      onPress={onPress}
    />
  );
}

export default React.memo(Checkbox);
