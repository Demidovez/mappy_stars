import React, {useCallback, useMemo, useState} from "react";
import {Text, StyleSheet, View} from "react-native";
import {Slider} from "@miblanchard/react-native-slider";
import Style from "../style/Light";
import {useAppSelector} from "../hooks";
import {Selectors} from "../redux/selectors/selectors";

interface IProps {
  value: number;
  enabled?: boolean;
  onValueChange: (value: number) => void;
  style?: object;
}

function SliderCustom({style, value, enabled = true, onValueChange}: IProps) {
  // console.log("Slider");

  const theme = useAppSelector(Selectors.getTheme);

  const [textValue, setTextValue] = useState(value);

  const styleContainer = useMemo(() => [styles.container, style], [style]);
  const styleValueSlider = useMemo(
    () => [
      styles.value,
      {
        backgroundColor: theme.colors.background,
        opacity: enabled ? 1 : 0.5,
      },
    ],
    [theme, enabled],
  );

  const onChange = useCallback(value => {
    const result = Array.isArray(value) ? value[0] : value;
    setTextValue(result); // TODO: А нужен отдельный стейт? наверное достаточно одного props.value
    onValueChange(result);
  }, []);

  return (
    <View style={styleContainer}>
      <View style={styleValueSlider}>
        <Text style={styles.text}>{Math.round(textValue)}</Text>
      </View>
      <View style={styles.slider}>
        <Slider
          disabled={!enabled}
          value={textValue}
          onValueChange={onChange}
          step={0.1} // TODO: Уменьшение шага возможно добавит плавности слайдеру
          trackStyle={styles.track}
          minimumValue={0}
          maximumValue={100}
          thumbStyle={styles.thumb}
          thumbTintColor={
            enabled ? theme.colors.primary : theme.colors.primaryLight
          }
          minimumTrackTintColor={
            enabled ? theme.colors.primary : theme.colors.primaryLight
          }
          maximumTrackTintColor={theme.colors.background}
        />
      </View>
    </View>
  );
}

export default React.memo(SliderCustom);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 20,
  },
  value: {
    borderRadius: 6,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  text: {
    ...Style.font_bold,
    fontSize: 16,
  },
  slider: {
    flex: 1,
    justifyContent: "center",
  },
  track: {marginLeft: 8, marginRight: 8},
  thumb: {width: 16, height: 16},
});
