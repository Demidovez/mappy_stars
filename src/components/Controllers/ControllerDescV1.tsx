import React, {useCallback} from "react";
import {StyleSheet, View} from "react-native";
import Slider from "../Slider";
import {useAppDispatch, useAppSelector} from "../../hooks";
import Label from "../Label";
import ListColor from "../ListColor";
import {
  setColorDescAction,
  setSizeDescAction,
  setTextDescAction,
} from "../../redux/actions/creators/controllerDescActionCreators";
import InputWithLabel from "../InputWithLabel";
import TextareaWithLabel from "../TextareaWithLabel";
import {Routes} from "../../navigation/routes";
import * as RootNavigation from "../../navigation/rootNavigation";
import {Selectors} from "../../redux/selectors/selectors";

function ControllerDescV1() {
  // console.log("ControllerDescV1");

  const {textDesc, fontDesc, colorDesc, sizeDesc} = useAppSelector(
    Selectors.getDescInfo,
  );
  const dispatch = useAppDispatch();

  const handleColorDesc = useCallback(
    (color: string) => dispatch(setColorDescAction(color)),
    [],
  );
  const handleSizeDescChange = useCallback(
    (value: number) => dispatch(setSizeDescAction(value)),
    [],
  );
  const handleTextDescChange = useCallback(
    (value: string) => dispatch(setTextDescAction(value)),
    [],
  );

  const handlePressTextArea = useCallback(() => {
    RootNavigation.navigate(Routes.Modals, {
      screen: Routes.ModalTextArea,
      params: {
        onSetText: handleTextDescChange,
        label: "Текст события",
        text: textDesc,
      },
    });
  }, [textDesc]);

  return (
    <View style={styles.container}>
      <TextareaWithLabel
        label={"Текст события"}
        text={textDesc}
        onPress={handlePressTextArea}
        style={styles.label}
      />
      <InputWithLabel
        label={"Шрифт текста"}
        text={fontDesc}
        modalName={Routes.ModalPickerFontDesc}
        style={styles.label}
      />
      <Label style={styles.label}>Цвет текста</Label>
      <ListColor currentColor={colorDesc} onPress={handleColorDesc} />
      <Label style={styles.label}>Размер текста</Label>
      <Slider
        style={styles.slider}
        value={sizeDesc}
        onValueChange={handleSizeDescChange}
      />
    </View>
  );
}

export default React.memo(ControllerDescV1);

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
  slider: {
    paddingLeft: 18,
    paddingRight: 18,
  },
});
