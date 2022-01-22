import React, {useCallback, useEffect, useLayoutEffect} from "react";
import {Image, StyleSheet, View} from "react-native";
import {useAppDispatch, useAppSelector} from "../../hooks";
import Label from "../Label";
import Slider from "../Slider";
import {
  setHasHolstBorderAction,
  setColorHolstBorderAction,
  setHolstIdAction,
  setIndentHolstBorderAction,
  setWidthHolstBorderAction,
  setHolstImageIdAction,
} from "../../redux/actions/creators/controllerCanvasActionCreators";
import ListColor from "../ListColor";
import ListCard from "../ListCard";
import CheckboxWithLabel from "../CheckboxWithLabel";
import {Selectors} from "../../redux/selectors/selectors";
import ItemCard from "../ItemCard";
import {IHolst} from "../../types/types";
import ListImages from "../ListImages";

function ControllerCanvasV2() {
  // console.log("ControllerCanvasV2");

  const {
    holst,
    hasHolstBorder,
    indentHolstBorder,
    widthHolstBorder,
    colorHolstBorder,
    holsts,
    holstImageId,
    holstImages,
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
  const handleHolstImage = useCallback(
    (id: number) => dispatch(setHolstImageIdAction(id)),
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
      <Label style={styles.label}>Изображение фона</Label>
      <ListImages
        data={holstImages}
        onPress={handleHolstImage}
        imageId={holstImageId}
      />
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

export default React.memo(ControllerCanvasV2);

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
