import React, {useCallback} from "react";
import {StyleSheet, View} from "react-native";
import Slider from "../Slider";
import {useAppDispatch, useAppSelector} from "../../hooks";
import Label from "../Label";
import {
  setColorBorderMapAction,
  setMapColorAction,
  setShapeBorderMapNameAction,
  setSizeMapAction,
  setMarginTopMapAction,
} from "../../redux/actions/creators/controllerMapActionCreators";
import ListColor from "../ListColor";
import ListCard from "../ListCard";
import ItemShape from "../ItemShape";
import {Selectors} from "../../redux/selectors/selectors";

function ControllerMapV1() {
  // console.log("ControllerMapV1");

  const {shapesBorderMap} = useAppSelector(Selectors.getShapeBorderMap);
  const {
    sizeMap,
    mapColor,
    hasBorderMap,
    colorBorderMap,
    shapeBorderMapName,
    marginTopMap,
  } = useAppSelector(state => state.map);
  const dispatch = useAppDispatch();

  const handleSizeMapChange = useCallback(
    (value: number) => dispatch(setSizeMapAction(value)),
    [],
  );
  const handleMapColor = useCallback(
    (color: string) => dispatch(setMapColorAction(color)),
    [],
  );
  const handleShapeBorderMap = useCallback(
    (value: any) => dispatch(setShapeBorderMapNameAction(value)),
    [],
  );
  const handleColorBorderMap = useCallback(
    (color: string) => dispatch(setColorBorderMapAction(color)),
    [],
  );
  const handleMarginTopMapChange = useCallback(
    (value: number) => dispatch(setMarginTopMapAction(value)),
    [],
  );

  return (
    <View style={styles.container}>
      <Label style={styles.label}>Размер карты</Label>
      <Slider
        style={styles.slider}
        value={sizeMap}
        onValueChange={handleSizeMapChange}
      />
      <Label style={styles.label}>Отступ карты</Label>
      <Slider
        style={styles.slider}
        value={marginTopMap}
        onValueChange={handleMarginTopMapChange}
      />
      <Label style={styles.label}>Цвет фона</Label>
      <ListColor currentColor={mapColor} onPress={handleMapColor} />
      <Label style={styles.label}>Форма рамки</Label>
      <ListCard
        value={shapeBorderMapName}
        data={shapesBorderMap}
        item={ItemShape}
        onPress={handleShapeBorderMap}
      />
      <Label style={styles.label} enabled={hasBorderMap}>
        Цвет рамки
      </Label>
      <ListColor
        enabled={hasBorderMap}
        currentColor={colorBorderMap}
        onPress={handleColorBorderMap}
      />
    </View>
  );
}

export default React.memo(ControllerMapV1);

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
