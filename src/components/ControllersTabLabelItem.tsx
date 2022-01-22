import React, {useCallback, useEffect, useMemo, useState} from "react";
import {
  Animated,
  FlatList,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import {IController} from "../types/types";
import SvgImage from "./SvgImage";
import Style from "../style/Light";
import {useAppSelector} from "../hooks";
import {Selectors} from "../redux/selectors/selectors";
import {TouchableWithoutFeedback} from "react-native-gesture-handler";

interface IProps {
  item: IController;
  activeKey: string;
  onPress: (key: string) => void;
}

function ControllersTabLabelItem({item, activeKey, onPress}: IProps) {
  // console.log("ControllersTabLabelItem");

  const theme = useAppSelector(Selectors.getTheme);

  const [animation, setAnimation] = useState(new Animated.Value(0));
  const isActive = useMemo(() => item.key === activeKey, [item, activeKey]);

  const interpolationBackground = useMemo(
    () =>
      animation.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.colors.background, "white"],
      }),
    [theme, animation],
  );

  const handleParess = useCallback(() => {
    onPress(item.key);

    Animated.timing(animation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [onPress, isActive, animation]);

  useEffect(() => {
    if (isActive) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 0,
        useNativeDriver: false,
      }).start();
    }
  }, []);

  useEffect(() => {
    if (!isActive) {
      setAnimation(new Animated.Value(0));
    }
  }, [isActive]);

  const styleContent = useMemo(
    () => [
      styles.content,
      {
        backgroundColor: isActive
          ? interpolationBackground
          : theme.colors.background,
      },
    ],
    [isActive, theme],
  );

  const styleLabel = useMemo(
    () => [styles.label, {color: theme.colors.selected}],
    [theme],
  );

  const styleOpacity = useMemo(
    (): StyleProp<ViewStyle> => ({
      flexDirection: "row",
      opacity: isActive ? 1 : 0.7,
    }),
    [isActive],
  );

  return (
    <TouchableWithoutFeedback onPress={handleParess}>
      <Animated.View style={styleContent}>
        <View style={styleOpacity}>
          <SvgImage
            width={20}
            height={20}
            fill={theme.colors.selected}
            name={item.icon}
          />
          <Text style={styleLabel}>{item.title}</Text>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

export default React.memo(ControllersTabLabelItem);

const styles = StyleSheet.create({
  content: {
    paddingLeft: 10,
    paddingRight: 15,
    paddingVertical: 7,
  },
  label: {
    ...Style.font_bold,
    fontSize: 15,
    paddingLeft: 7,
  },
});
