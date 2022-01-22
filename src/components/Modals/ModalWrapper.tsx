import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  Text,
  Animated,
} from "react-native";
import {useNavigation} from "@react-navigation/native";
import LottieView from "lottie-react-native";
import {RectButton} from "react-native-gesture-handler";
import Style from "../../style/Light";
import useKeyboard from "../../hooks/useKeyboard";

interface IProps {
  children: React.ReactNode;
  delay?: number;
  onSumbit?: () => void;
  isDisabled?: boolean;
  okTextBtn?: string;
}

function ModalWrapper({
  children,
  delay,
  onSumbit,
  isDisabled = false,
  okTextBtn,
}: IProps) {
  // console.log("ModalWrapper");

  const navigation = useNavigation();

  // Значение плавности для opacity (если delay неопределен то opacity равен 1)
  const animOpacity = useRef(new Animated.Value(delay ? 0 : 1)).current;
  // Значение плавности для сдвига окна
  const animMoveModal = useRef(new Animated.Value(0)).current;

  const [isLoaded, setIsLoaded] = useState(!delay);

  const {isShowKeyboard, heightKeyboard} = useKeyboard();

  // Отмена. Закрываем окно
  const onCancel = useCallback(() => {
    navigation.goBack();
  }, []);

  // Убираем лоадер через delay мс
  useEffect(() => {
    if (delay) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [delay]);

  // Плавно изменяем opacity
  useEffect(() => {
    if (isLoaded && delay) {
      Animated.timing(animOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isLoaded]);

  // Плавно сдвигаем модальное окно
  useEffect(() => {
    if (isShowKeyboard) {
      Animated.timing(animMoveModal, {
        toValue: heightKeyboard,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      animMoveModal.setValue(0);
    }
  }, [isShowKeyboard]);

  const styleContainer = useMemo(
    () => [styles.container, isShowKeyboard && {marginBottom: animMoveModal}],
    [isShowKeyboard, animMoveModal],
  );

  const handlePress = useCallback(() => navigation.goBack(), []);

  const styleModal = useMemo(
    () => [styles.modal, {opacity: animOpacity}],
    [animOpacity],
  );

  const styleChild = useMemo(
    () => [styles.child, !onSumbit && {marginBottom: 15}],
    [onSumbit],
  );

  return (
    <Animated.View style={styleContainer}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.press_background} />
      </TouchableWithoutFeedback>
      <Animated.View style={styleModal} needsOffscreenAlphaCompositing>
        <View>
          <View style={styleChild}>{children}</View>
          {onSumbit && (
            <View style={styles.buttons}>
              <RectButton
                onPress={onCancel}
                rippleColor={"#ffffff"}
                style={styles.button}>
                <Text style={styles.button_text}>Отмена</Text>
              </RectButton>
              <RectButton
                onPress={onSumbit}
                rippleColor={"#ffffff"}
                enabled={!isDisabled}
                style={[styles.button, {opacity: isDisabled ? 0.5 : 1}]}>
                <Text style={styles.button_text}>
                  {okTextBtn ? okTextBtn : "OK"}
                </Text>
              </RectButton>
            </View>
          )}
        </View>
      </Animated.View>
      {!isLoaded && (
        <View style={styles.loader}>
          <LottieView
            source={require("../../../assets/icons/loading.json")}
            loop
            autoPlay
            style={styles.loader_view}
          />
        </View>
      )}
    </Animated.View>
  );
}

export default React.memo(ModalWrapper);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  child: {
    paddingHorizontal: 20,
  },
  press_background: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.4)",
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },
  loader: {
    position: "absolute",
    top: 0,
    height: "100%",
    justifyContent: "center",
    borderRadius: 10,
    margin: 0,
  },
  loader_view: {
    width: "60%",
    alignSelf: "center",
  },
  buttons: {
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginBottom: 5,
  },
  button_text: {
    ...Style.font_bold,
    fontSize: 16,
  },
});
