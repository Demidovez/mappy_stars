import React, {useCallback, useEffect} from "react";
import {StyleSheet, View} from "react-native";
import {useAppDispatch, useAppSelector} from "../../hooks";
import Slider from "../Slider";
import {Routes} from "../../navigation/routes";
import {
  setColorAction,
  setSizeAction,
  setHasDateAction,
  setHasTimeAction,
  setHasLocationAction,
  setHasCoordinatesAction,
  setIsChangeTextAction,
  setUserLocationTextAction,
} from "../../redux/actions/creators/controllerLocationActionCreators";
import InputWithLabel from "../InputWithLabel";
import Label from "../Label";
import ListColor from "../ListColor";
import TextareaWithLabel from "../TextareaWithLabel";
import CheckboxWithLabel from "../CheckboxWithLabel";
import * as RootNavigation from "../../navigation/rootNavigation";
import useFullLocationText from "../../hooks/useFullLocationText";

function ControllerLocationV1() {
  // console.log("ControllerLocationV1");

  const dispatch = useAppDispatch();

  const {
    fontLocation,
    colorLocation,
    sizeLocation,
    hasDateLocation,
    hasTimeLocation,
    hasLocation,
    hasCoordinates,
    isChangeTextLocation,
    userTextLocation,
  } = useAppSelector(state => state.location);

  const resultText = useFullLocationText();

  const handleColor = useCallback(
    (color: string) => dispatch(setColorAction(color)),
    [],
  );
  const handleSizeChange = useCallback(
    (value: number) => dispatch(setSizeAction(value)),
    [],
  );
  const handleSetHasDate = useCallback(
    () => dispatch(setHasDateAction(!hasDateLocation)),
    [hasDateLocation],
  );
  const handleSetHasTime = useCallback(
    () => dispatch(setHasTimeAction(!hasTimeLocation)),
    [hasTimeLocation],
  );
  const handleSetHasLocation = useCallback(
    () => dispatch(setHasLocationAction(!hasLocation)),
    [hasLocation],
  );
  const handleSetHasCoordinates = useCallback(
    () => dispatch(setHasCoordinatesAction(!hasCoordinates)),
    [hasCoordinates],
  );
  const handleSetIsChangeText = useCallback(
    () => dispatch(setIsChangeTextAction(!isChangeTextLocation)),
    [isChangeTextLocation],
  );
  const handleTextLocationChange = useCallback(
    (value: string) => dispatch(setUserLocationTextAction(value)),
    [],
  );

  const handlePressTextArea = useCallback(() => {
    RootNavigation.navigate(Routes.Modals, {
      screen: Routes.ModalTextArea,
      params: {
        onSetText: handleTextLocationChange,
        label: "Текст локации",
        text: userTextLocation,
      },
    });
  }, [userTextLocation]);

  // Каждое изменение записываем в пользовательский текст, пока не нажата галочка "Изменить текст"
  useEffect(() => {
    if (resultText !== undefined && !isChangeTextLocation) {
      dispatch(setUserLocationTextAction(resultText));
    }
  }, [resultText, isChangeTextLocation]);

  return (
    <View style={styles.container}>
      <InputWithLabel
        label={"Шрифт текста"}
        text={fontLocation}
        modalName={Routes.ModalPickerFontLocation}
        style={styles.label}
      />
      <Label style={styles.label}>Цвет текста</Label>
      <ListColor currentColor={colorLocation} onPress={handleColor} />
      <Label style={styles.label}>Размер текста</Label>
      <Slider
        style={styles.slider}
        value={sizeLocation}
        onValueChange={handleSizeChange}
      />
      <CheckboxWithLabel
        isChecked={hasDateLocation}
        onPress={handleSetHasDate}
        label="Добавить дату"
      />
      <CheckboxWithLabel
        isChecked={hasTimeLocation}
        onPress={handleSetHasTime}
        label="Добавить время"
      />
      <CheckboxWithLabel
        isChecked={hasLocation}
        onPress={handleSetHasLocation}
        label="Добавить место"
      />
      <CheckboxWithLabel
        isChecked={hasCoordinates}
        onPress={handleSetHasCoordinates}
        label="Добавить координаты"
      />
      <CheckboxWithLabel
        isChecked={isChangeTextLocation}
        onPress={handleSetIsChangeText}
        label="Изменить текст"
      />
      <TextareaWithLabel
        enabled={isChangeTextLocation}
        text={userTextLocation || ""}
        onPress={handlePressTextArea}
        style={styles.textarea}
      />
    </View>
  );
}

export default React.memo(ControllerLocationV1);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 15,
  },
  label: {
    paddingLeft: 18,
    paddingRight: 18,
  },
  textarea: {
    paddingLeft: 18,
    paddingRight: 18,
    marginTop: 10,
  },
  slider: {
    paddingLeft: 18,
    paddingRight: 18,
  },
});
