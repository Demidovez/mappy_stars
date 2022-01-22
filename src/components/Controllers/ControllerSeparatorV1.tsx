import React, {useCallback} from "react";
import {StyleSheet, View} from "react-native";
import Slider from "../Slider";
import {useAppDispatch, useAppSelector} from "../../hooks";
import Label from "../Label";
import ListColor from "../ListColor";
import {
  setColorSeparatorAction,
  setShapeSeparatorIdAction,
  setSizeSeparatorAction,
} from "../../redux/actions/creators/controllerSeparatorActionCreators";
import ListCard from "../ListCard";
import ItemShape from "../ItemShape";
import {Selectors} from "../../redux/selectors/selectors";

function ControllerSeparatorV1() {
  // console.log("ControllerSeparatorV1");
  const dispatch = useAppDispatch();

  const {shapesSeparator} = useAppSelector(Selectors.getShapesSeparator);
  const {sizeSeparator, hasSeparator, colorSeparator} = useAppSelector(
    state => state.separator,
  );
  const shapeSeparator = useAppSelector(Selectors.getShape);

  const handleShapeSeparator = useCallback(
    (name: string) => {
      const shape =
        shapesSeparator.find(shape => shape.name == name) || shapesSeparator[0];

      dispatch(setShapeSeparatorIdAction(shape.id));
    },
    [shapesSeparator],
  );

  const handleColorSeparator = useCallback(
    (color: string) => dispatch(setColorSeparatorAction(color)),
    [],
  );
  const handleSizeSeparatorChange = useCallback(
    (value: number) => dispatch(setSizeSeparatorAction(value)),
    [],
  );

  return (
    <View style={styles.container}>
      <Label style={styles.label}>Форма разделителя</Label>
      <ListCard
        data={shapesSeparator}
        value={shapeSeparator?.name}
        item={ItemShape}
        onPress={handleShapeSeparator}
      />
      <Label style={styles.label} enabled={hasSeparator}>
        Цвет разделителя
      </Label>
      <ListColor
        enabled={hasSeparator}
        currentColor={colorSeparator}
        onPress={handleColorSeparator}
      />
      <Label style={styles.label} enabled={hasSeparator}>
        Размер разделителя
      </Label>
      <Slider
        enabled={hasSeparator}
        style={styles.slider}
        value={sizeSeparator}
        onValueChange={handleSizeSeparatorChange}
      />
    </View>
  );
}

export default React.memo(ControllerSeparatorV1);

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
