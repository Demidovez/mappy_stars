import React, {useMemo, useRef} from "react";
import {StyleSheet, View, Animated} from "react-native";
import Style from "../style/Light";
import {useState} from "react";
import {useEffect} from "react";

interface IProps {
  children: React.ReactNode;
}

// Задержка на появления элемента (100мс)
function Delay({children}: IProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const animOpacity = useRef(new Animated.Value(0)).current;
  const animOpacityLoader = useRef(new Animated.Value(0)).current;

  // Изменяем флаг готовности через 100 мс
  useEffect(() => {
    Animated.timing(animOpacityLoader, {
      toValue: 0.5,
      duration: 200,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
  }, []);

  // Изменяем значение видимости
  useEffect(() => {
    isLoaded &&
      Animated.timing(animOpacity, {
        toValue: 1,
        delay: 350,
        duration: 350,
        useNativeDriver: true,
      }).start();
  }, [isLoaded]);

  // Стиль анимации
  const styleAnim = useMemo(() => ({opacity: animOpacity}), [animOpacity]);
  const styleAnimLoader = useMemo(
    () => [styles.loader, {opacity: animOpacityLoader}],
    [animOpacityLoader],
  );

  return (
    <View style={styles.container}>
      <Animated.Text style={styleAnimLoader}>Загрузка...</Animated.Text>
      <Animated.View style={styleAnim}>{isLoaded && children}</Animated.View>
    </View>
  );
}

export default React.memo(Delay);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
  },
  loader: {
    ...Style.font_bold,
    fontSize: 16,
    alignSelf: "center",
    position: "absolute",
  },
});
