import React, {useCallback} from "react";
import {StyleSheet, View} from "react-native";
import {useAppDispatch, useAppSelector} from "../../hooks";
import Label from "../Label";
import Slider from "../Slider";
import {
  setHasHolstBorderAction,
  setHolstColorAction,
  setColorHolstBorderAction,
  setHolstIdAction,
  setIndentHolstBorderAction,
  setWidthHolstBorderAction,
} from "../../redux/actions/creators/controllerCanvasActionCreators";
import ListColor from "../ListColor";
import ListCard from "../ListCard";
import CheckboxWithLabel from "../CheckboxWithLabel";
import {Selectors} from "../../redux/selectors/selectors";
import ItemCard from "../ItemCard";
import {IHolst} from "../../types/types";

function ControllerCanvasV1() {
  // console.log("ControllerCanvasV1");

  const {
    holst,
    hasHolstBorder,
    indentHolstBorder,
    widthHolstBorder,
    holstColor,
    colorHolstBorder,
    holsts,
  } = useAppSelector(Selectors.getCanvasInfo);

  const dispatch = useAppDispatch();

  const handleSetHasBolder = useCallback(
    () => dispatch(setHasHolstBorderAction(!hasHolstBorder)),
    [hasHolstBorder],
  );
  const handleIndentHolstBorderChange = useCallback(
    (value: number) => dispatch(setIndentHolstBorderAction(value)),
    [],
  );
  const handleWidthHolstBorderChange = useCallback(
    (value: number) => dispatch(setWidthHolstBorderAction(value)),
    [],
  );
  const handleHolstColor = useCallback(
    (color: string) => dispatch(setHolstColorAction(color)),
    [],
  );
  const handleHolstColorBorder = useCallback(
    (color: string) => dispatch(setColorHolstBorderAction(color)),
    [],
  );
  const handleSetHolst = useCallback(
    (holst: IHolst) => dispatch(setHolstIdAction(holst.id)),
    [],
  );

  return (
    <View style={styles.container}>
      <Label style={styles.label}>Размер холста</Label>
      <ListCard
        data={holsts}
        item={ItemCard}
        onPress={handleSetHolst}
        value={holst?.name}
      />
      <Label style={styles.label}>Цвет фона</Label>
      <ListColor currentColor={holstColor} onPress={handleHolstColor} />
      <CheckboxWithLabel
        isChecked={hasHolstBorder}
        onPress={handleSetHasBolder}
        label="Добавить рамку"
      />
      <Label style={styles.label} enabled={hasHolstBorder}>
        Отступ для рамки
      </Label>
      <Slider
        enabled={hasHolstBorder}
        style={styles.slider}
        value={indentHolstBorder}
        onValueChange={handleIndentHolstBorderChange}
      />
      <Label style={styles.label} enabled={hasHolstBorder}>
        Размер рамки
      </Label>
      <Slider
        enabled={hasHolstBorder}
        style={styles.slider}
        value={widthHolstBorder}
        onValueChange={handleWidthHolstBorderChange}
      />
      <Label style={styles.label} enabled={hasHolstBorder}>
        Цвет рамки
      </Label>
      <ListColor
        enabled={hasHolstBorder}
        currentColor={colorHolstBorder}
        onPress={handleHolstColorBorder}
      />
    </View>
  );
}

export default React.memo(ControllerCanvasV1);

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
  horizontal_2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
});
