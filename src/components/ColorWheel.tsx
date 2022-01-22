import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {
  StyleSheet,
  View,
  Animated,
  PanResponder,
  Dimensions,
  Image,
  ViewStyle,
  StyleProp,
} from "react-native";
import colorsys from "colorsys";
import SliderColorBright from "./SliderColorBright";
import {isCorrectColor} from "../helper";

const WINDOW_HEIGHT = Dimensions.get("window").height;

interface IProps {
  initialColor: string;
  thumbSize: number;
  thumbStyle: StyleProp<ViewStyle>;
  onColorChange: (color: string) => void;
  size: number;
  isUpdate: boolean;
  isHide?: boolean;
}

const ColorWheel = ({
  initialColor,
  thumbSize,
  thumbStyle,
  onColorChange,
  size,
  isUpdate,
  isHide = false,
}: IProps) => {
  // console.log("ColorWheel");

  // Текущий цвет
  const [currentColor, setCurrentColor] = useState("#FFFFFF");
  // Текущая яркость
  const [currentBright, setCurrentBright] = useState(100);
  // Текущий итоговый цвет
  const [currentResultColor, setCurrentResultColor] = useState<string>();

  const [panHandlerReady, setPanHandlerReady] = useState(false);
  const [offset, setOffset] = useState({x: 0, y: 0});
  const [radius] = useState(size / 2);
  const [height] = useState(size);
  const [width] = useState(size);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);

  const pan = useRef(new Animated.ValueXY()).current;
  const self = useRef<View>(null);

  // Инициализируем цвет и яркость
  useEffect(() => {
    if (isUpdate && initialColor && isCorrectColor(initialColor)) {
      setCurrentColor(initialColor);
      setCurrentBright(colorsys.hex2Hsv(initialColor).v);
    }
  }, [isUpdate, initialColor, currentColor]);

  // Определяем текущий итоговый цвет
  useEffect(() => {
    const {h, s} = colorsys.hex2Hsv(currentColor);
    const newHsv = {h, s, v: currentBright};

    setCurrentResultColor(colorsys.hsv2Hex(newHsv));
  }, [currentColor, currentBright]);

  // Отдаем итоговый цвет родителю
  useEffect(() => {
    currentResultColor && onColorChange(currentResultColor);
  }, [currentResultColor]);

  // Определяем параметры позиции указателя относительно круга палитры (градус и радиус)
  const calcPolar = useCallback(
    gestureState => {
      const {pageX, pageY, moveX, moveY} = gestureState;
      const [x, y] = [pageX || moveX, pageY || moveY];
      const [dx, dy] = [x - offset.x, y - offset.y];
      return {
        deg: Math.atan2(dy, dx) * (-180 / Math.PI),
        radius: Math.sqrt(dy * dy + dx * dx) / radius,
      };
    },
    [offset.x, offset.y, radius],
  );

  // Определяем выход указателя за границу круга
  const outBounds = useCallback(
    gestureState => {
      const {radius} = calcPolar(gestureState);
      return radius > 1;
    },
    [calcPolar],
  );

  // Предотвращаем излишний сдвиг указателя цвета
  const resetPanHandler = useCallback(() => {
    if (!panHandlerReady) return false;
    setPanHandlerReady(false);

    pan.setOffset({
      x: (pan.x as any)._value,
      y: (pan.y as any)._value,
    });
    pan.setValue({x: 0, y: 0});
  }, [panHandlerReady, pan]);

  // Определяем систему координат
  const calcCartesian = useCallback(
    (deg, newRadius) => {
      const rad = (Math.PI * deg) / 180;
      const r = newRadius * radius;
      const x = r * Math.cos(rad);
      const y = r * Math.sin(rad);

      return {
        left: width / 2 + x,
        top: height / 2 - y,
      };
    },
    [radius, width, height],
  );

  // Определяем цвет исходя из позиции
  const updateColor = useCallback(
    ({nativeEvent}) => {
      const {deg, radius} = calcPolar(nativeEvent);
      const newHsv = {h: deg, s: 100 * radius, v: 100};
      setCurrentColor(colorsys.hsv2Hex(newHsv));
    },
    [calcPolar],
  );

  // Определяем позицию указателя исходя из цвета
  const forceUpdate = useCallback(
    color => {
      const {h, s} = colorsys.hex2Hsv(color);
      const {left, top} = calcCartesian(h, s / 100);

      pan.setValue({
        x: left - thumbSize / 2,
        y: top - thumbSize / 2,
      });
    },
    [calcCartesian, pan, thumbSize],
  );

  // Создаем объект объединения жестов
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponderCapture: ({nativeEvent}) => {
          if (outBounds(nativeEvent)) return false;
          updateColor({nativeEvent});
          setPanHandlerReady(true);

          pan.setValue({
            x: -left + nativeEvent.pageX - thumbSize / 2,
            y: -top + nativeEvent.pageY - thumbSize / 2,
          });
          return true;
        },
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderGrant: () => true,
        onPanResponderMove: (event, gestureState) => {
          if (outBounds(gestureState)) return false;
          resetPanHandler();

          return Animated.event([null, {dx: pan.x, dy: pan.y}], {
            listener: updateColor,
            useNativeDriver: false,
          })(event, gestureState);
        },
        onMoveShouldSetPanResponder: () => true,
        onPanResponderRelease: () => {
          setPanHandlerReady(true);

          pan.flattenOffset();
        },
      }),
    [resetPanHandler, updateColor, thumbSize, outBounds, left, pan, top],
  );

  // Определяем отправную точку указателя цвета
  const onLayout = useCallback(
    () =>
      self?.current?.measureInWindow((x: number, y: number) => {
        const absX = x % width;
        const absY = y % WINDOW_HEIGHT;
        const newOffset = {x: absX + width / 2, y: absY + height / 2};
        setOffset(newOffset);
        setLeft(absX);
        setTop(absY);
        forceUpdate(currentColor);
      }),
    [forceUpdate, width, height, currentColor],
  );

  // Объеденяем "жесты"
  const panHandlers = useMemo(
    () => (panResponder && panResponder.panHandlers) || {},
    [panResponder],
  );

  // Определяем итоговый стиль указателя цвета
  const CustomThumbStyle = useMemo(
    () => ({
      width: thumbSize,
      height: thumbSize,
      borderRadius: thumbSize / 2,
      backgroundColor: currentResultColor,
    }),
    [thumbSize, currentResultColor],
  );

  // Изменяем яркость
  const onChangeBright = useCallback(value => setCurrentBright(value), []);

  const styleWheelWrap = useMemo(() => ({width, height}), [width, height]);
  const styleImage = useMemo(() => [styles.img, {height, width}], [height, width]);
  
  const styleWheelSelector = useMemo(() => [
    pan.getLayout(),
    styles.circle,
    thumbStyle,
    CustomThumbStyle,
  ], [pan, thumbStyle, CustomThumbStyle]);
  
  
  return (
    <View style={styles.coverResponder}>
      {!isHide && (
        <View
          ref={self}
          {...panHandlers}
          onLayout={onLayout}
          style={styleWheelWrap}>
          <Image
            style={styleImage}
            source={require("../../assets/images/color-wheel.png")}
          />
          <Animated.View
            style={styleWheelSelector}
          />
        </View>
      )}
      {currentColor && (
        <SliderColorBright
          initialValue={currentBright}
          isUpdate={isUpdate}
          onValueChange={onChangeBright}
          color={currentColor}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  coverResponder: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  img: {
    alignSelf: "center",
  },
  circle: {
    position: "absolute",
    borderWidth: 3,
    borderColor: "white",
  },
});

export default ColorWheel;
