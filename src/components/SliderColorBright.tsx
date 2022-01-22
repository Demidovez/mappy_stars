import React, {useCallback, useEffect, useMemo, useState} from "react";
import {StyleSheet, View} from "react-native";
import {Slider} from "@miblanchard/react-native-slider";
import Style from "../style/Light";
import colorsys from "colorsys";
import Svg, {Defs, LinearGradient, Rect, Stop} from "react-native-svg";

interface IProps {
  initialValue: number;
  color: string;
  onValueChange: (value: number) => void;
  isUpdate: boolean;
}

function SliderColorBright({
  initialValue,
  onValueChange,
  color,
  isUpdate,
}: IProps) {
  // console.log("SliderColorBright");

  const [currentBright, setCurrentBright] = useState<number>();
  const [currentColor, setCurrentColor] = useState(color);
  const [currentResultColor, setCurrentResultColor] = useState();

  const handleSlidingStart = useCallback(
    (value: number) => setCurrentBright(value),
    [],
  );

  // Определяем цвет для цветной части слайдера
  useEffect(() => {
    const {h, s} = colorsys.hex2Hsv(color);
    const newHsv = {h, s, v: 100};
    setCurrentColor(colorsys.hsv2Hex(newHsv));
  }, [color]);

  useEffect(() => {
    currentBright && onValueChange(currentBright);
  }, [currentBright]);

  useEffect(() => {
    isUpdate && setCurrentBright(initialValue);
  }, [initialValue]);

  // Определяем результирующий цвет (для ползунка)
  useEffect(() => {
    const {h, s} = colorsys.hex2Hsv(currentColor);
    const newHsv = {h, s, v: currentBright};

    setCurrentResultColor(colorsys.hsv2Hex(newHsv));
  }, [currentBright, currentColor]);

  const styleSlider = useMemo(
    () => ({backgroundColor: currentColor}),
    [currentColor],
  );

  const onSlidingStart = useCallback(
    value => handleSlidingStart(Array.isArray(value) ? value[0] : value),
    [],
  );

  const touchSize = useMemo(
    () => ({
      width: 40,
      height: 40,
    }),
    [],
  );

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.line}>
          <Svg height={10} width={"100%"} style={styleSlider}>
            <Defs>
              <LinearGradient id="grad" x1="100%" y1="0" x2="0" y2="0">
                <Stop offset="100%" stopColor="black" stopOpacity="1" />
                <Stop offset="0" stopColor="white" stopOpacity="0" />
              </LinearGradient>
            </Defs>
            <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
          </Svg>
        </View>
        <Slider
          value={currentBright}
          onSlidingStart={onSlidingStart}
          step={0.1}
          trackStyle={styles.trackStyle}
          minimumValue={0}
          maximumValue={100}
          thumbTouchSize={touchSize}
          trackClickable={true}
          thumbStyle={styles.thumbStyle}
          thumbTintColor={currentResultColor}
          minimumTrackTintColor={"transparent"}
          maximumTrackTintColor={"transparent"}
        />
      </View>
    </View>
  );
}

export default React.memo(SliderColorBright);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 0,
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
  wrapper: {
    flex: 1,
    justifyContent: "center",
    height: 40,
    borderRadius: 20,
  },
  line: {
    height: 10,
    marginHorizontal: 10,
    overflow: "hidden",
    position: "absolute",
    top: 20 - 5,
    left: 0,
    right: 0,
    borderRadius: 20,
  },
  thumbStyle: {
    width: 30,
    height: 30,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "white",
  },
  trackStyle: {
    marginLeft: 8,
    marginRight: 8,
    height: 10,
    borderRadius: 20,
  },
});
