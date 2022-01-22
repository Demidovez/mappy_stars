import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Dimensions, StyleSheet, View} from "react-native";
import ModalWrapper from "./ModalWrapper";
import Label from "../Label";
import Input from "../Input";
import InputDescription from "../InputDescription";
import {TModalsStackScreenProps} from "../../navigation/modalsNavigator";
import {Routes} from "../../navigation/routes";
import ColorWheel from "../ColorWheel";
import {isCorrectColor} from "../../helper";
import useKeyboard from "../../hooks/useKeyboard";

interface IProps extends TModalsStackScreenProps<Routes.ModalPickerColor> {}

function ModalPickerColor({route, navigation}: IProps) {
  // console.log("ModalPickerColor");
  const {onSetColor, color, label} = route.params;

  const [currentInputColor, setCurrentInputColor] = useState(color);
  const [currentColor, setCurrentColor] = useState(color);
  const [isError, setIsError] = useState(false);
  // Проверяем нужно ли обновить цвет в пикере (возможно из-за изменения в поле ввода)
  const [isUpdateWheel, setIsUpdateWheel] = useState(true);

  const {isShowKeyboard} = useKeyboard();

  // Определяем текущий цвет
  const onSumbit = useCallback(() => {
    if (isCorrectColor(currentColor) && isCorrectColor(currentInputColor)) {
      onSetColor(currentColor);
      navigation.goBack();
    } else {
      setIsError(true);
    }
  }, [currentColor, currentInputColor]);

  const onChangeByWheel = useCallback((data: string) => {
    setIsUpdateWheel(false);
    setCurrentColor(data);
    setCurrentInputColor(data);
    setIsError(false);
  }, []);

  const onChangeByInput = useCallback((data: string) => {
    setIsUpdateWheel(true);
    setCurrentInputColor(data);
    setIsError(false);
  }, []);

  useEffect(() => {
    isCorrectColor(currentInputColor) && setCurrentColor(currentInputColor);
  }, [currentInputColor]);

  const stylePreview = useMemo(
    () => [
      styles.color_preview,
      {
        backgroundColor: currentColor,
      },
    ],
    [currentColor],
  );

  return (
    <ModalWrapper onSumbit={onSumbit}>
      <View style={styles.container}>
        <Label>{label}</Label>
        <ColorWheel
          initialColor={currentColor}
          isUpdate={isUpdateWheel}
          isHide={isShowKeyboard}
          thumbSize={30}
          thumbStyle={styles.wheel}
          onColorChange={onChangeByWheel}
          size={200}
        />
        <View style={styles.wrapper_input}>
          <View style={stylePreview} />
          <Input
            text={currentInputColor}
            onChange={onChangeByInput}
            maxLength={7}
            compact
            style={styles.input}
          />
        </View>
        <InputDescription text=" " isError={isError} align={"right"} />
      </View>
    </ModalWrapper>
  );
}

export default React.memo(ModalPickerColor);

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    minWidth: Dimensions.get("screen").width * 0.7,
  },
  wrapper_input: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  color_preview: {
    width: 48,
    height: 48,
    borderRadius: 6,
    marginRight: 10,
  },
  wheel: {height: 30, width: 30, borderRadius: 30},
  input: {marginTop: 0, marginBottom: 0, flex: 1},
});
