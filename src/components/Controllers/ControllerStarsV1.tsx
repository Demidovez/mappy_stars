import React, {useCallback, useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import {useAppDispatch, useAppSelector} from "../../hooks";
import Slider from "../Slider";
import {
  setColorConstellationsAction,
  setColorGraticuleAction,
  setColorNamesAction,
  setColorStarsAction,
  setHasConstellationsAction,
  setHasDashedGraticuleAction,
  setHasGraticuleAction,
  setHasMilkyWayAction,
  setHasNamesAction,
  setOpacityConstellationsAction,
  setOpacityGraticuleAction,
  setOpacityStarsAction,
  setSizeNamesAction,
  setSizeStarsAction,
  setWidthConstellationsAction,
  setWidthGraticuleAction,
} from "../../redux/actions/creators/controllerStarsActionCreators";
import CheckboxWithLabel from "../CheckboxWithLabel";
import Label from "../Label";
import ListColor from "../ListColor";
import InputWithLabel from "../InputWithLabel";
import {Routes} from "../../navigation/routes";
import {Selectors} from "../../redux/selectors/selectors";

function ControllerStarsV1() {
  // console.log("ControllerStarsV1");

  const {
    hasGraticule,
    hasDashedGraticule,
    colorGraticule,
    opacityGraticule,
    widthGraticule,
    hasMilkyWay,
    colorStars,
    opacityStars,
    sizeStars,
    hasConstellations,
    colorConstellations,
    opacityConstellations,
    widthConstellations,
    hasNames,
    colorNames,
    sizeNames,
    langNames,
  } = useAppSelector(state => state.stars);

  const {langs} = useAppSelector(Selectors.getLangsOfNames);

  const dispatch = useAppDispatch();

  const [currentLang, setCurrentLang] = useState<string>("");

  const handleSetHasGraticule = useCallback(
    () => dispatch(setHasGraticuleAction(!hasGraticule)),
    [hasGraticule],
  );
  const handleColorGraticule = useCallback(
    (color: string) => dispatch(setColorGraticuleAction(color)),
    [],
  );
  const handleHasDashedGraticule = useCallback(
    () => dispatch(setHasDashedGraticuleAction(!hasDashedGraticule)),
    [hasDashedGraticule],
  );
  const handleOpacityGraticuleChange = useCallback(
    (value: number) => dispatch(setOpacityGraticuleAction(value)),
    [],
  );
  const handleWidthGraticuleChange = useCallback(
    (value: number) => dispatch(setWidthGraticuleAction(value)),
    [],
  );
  const handleHasMilkyWay = useCallback(
    () => dispatch(setHasMilkyWayAction(!hasMilkyWay)),
    [hasMilkyWay],
  );
  const handleColorStars = useCallback(
    (color: string) => dispatch(setColorStarsAction(color)),
    [],
  );
  const handleOpacityStarsChange = useCallback(
    (value: number) => dispatch(setOpacityStarsAction(value)),
    [],
  );
  const handleSizeStarsChange = useCallback(
    (value: number) => dispatch(setSizeStarsAction(value)),
    [],
  );
  const handleSetHasConstellations = useCallback(
    () => dispatch(setHasConstellationsAction(!hasConstellations)),
    [hasConstellations],
  );
  const handleColorConstellations = useCallback(
    (color: string) => dispatch(setColorConstellationsAction(color)),
    [],
  );
  const handleOpacityConstellationsChange = useCallback(
    (value: number) => dispatch(setOpacityConstellationsAction(value)),
    [],
  );
  const handleWidthConstellationsChange = useCallback(
    (value: number) => dispatch(setWidthConstellationsAction(value)),
    [],
  );
  const handleSetHasNames = useCallback(
    () => dispatch(setHasNamesAction(!hasNames)),
    [hasNames],
  );
  const handleColorNames = useCallback(
    (color: string) => dispatch(setColorNamesAction(color)),
    [],
  );
  const handleSizeNamesChange = useCallback(
    (value: number) => dispatch(setSizeNamesAction(value)),
    [],
  );

  useEffect(() => {
    if (langNames && langs) {
      setCurrentLang(langs.find(lang => lang.lang === langNames)?.label || "");
    }
  }, [langNames, langs]);

  return (
    <View style={styles.container}>
      <CheckboxWithLabel
        isChecked={hasGraticule}
        onPress={handleSetHasGraticule}
        label="Добавить сеть координат"
      />
      <Label style={styles.label} enabled={hasGraticule}>
        Цвет сети
      </Label>
      <ListColor
        enabled={hasGraticule}
        currentColor={colorGraticule}
        onPress={handleColorGraticule}
      />
      <CheckboxWithLabel
        enabled={hasGraticule}
        isChecked={hasDashedGraticule}
        onPress={handleHasDashedGraticule}
        label="Прерывистые линии"
      />
      <Label style={styles.label} enabled={hasGraticule}>
        Яркость сети
      </Label>
      <Slider
        enabled={hasGraticule}
        style={styles.slider}
        value={opacityGraticule}
        onValueChange={handleOpacityGraticuleChange}
      />
      <Label style={styles.label} enabled={hasGraticule}>
        Толщина сети
      </Label>
      <Slider
        enabled={hasGraticule}
        style={styles.slider}
        value={widthGraticule}
        onValueChange={handleWidthGraticuleChange}
      />
      <CheckboxWithLabel
        isChecked={hasMilkyWay}
        onPress={handleHasMilkyWay}
        label="Добавить млечный путь"
      />
      <Label style={styles.label}>Цвет звезд</Label>
      <ListColor currentColor={colorStars} onPress={handleColorStars} />
      <Label style={styles.label}>Яркость звезд</Label>
      <Slider
        style={styles.slider}
        value={opacityStars}
        onValueChange={handleOpacityStarsChange}
      />
      <Label style={styles.label}>Размер звезд</Label>
      <Slider
        style={styles.slider}
        value={sizeStars}
        onValueChange={handleSizeStarsChange}
      />
      <CheckboxWithLabel
        isChecked={hasConstellations}
        onPress={handleSetHasConstellations}
        label="Добавить линии созвездий"
      />
      <Label style={styles.label} enabled={hasConstellations}>
        Цвет линий созвездий
      </Label>
      <ListColor
        enabled={hasConstellations}
        currentColor={colorConstellations}
        onPress={handleColorConstellations}
      />
      <Label style={styles.label} enabled={hasConstellations}>
        Яркость линий созвездий
      </Label>
      <Slider
        enabled={hasConstellations}
        style={styles.slider}
        value={opacityConstellations}
        onValueChange={handleOpacityConstellationsChange}
      />
      <Label style={styles.label} enabled={hasConstellations}>
        Толщина линий созвездий
      </Label>
      <Slider
        enabled={hasConstellations}
        style={styles.slider}
        value={widthConstellations}
        onValueChange={handleWidthConstellationsChange}
      />
      <CheckboxWithLabel
        isChecked={hasNames}
        onPress={handleSetHasNames}
        label="Названия объектов"
      />
      <Label style={styles.label} enabled={hasNames}>
        Цвет названий
      </Label>
      <ListColor
        enabled={hasNames}
        currentColor={colorNames}
        onPress={handleColorNames}
      />
      <Label style={styles.label} enabled={hasNames}>
        Размер названий
      </Label>
      <Slider
        enabled={hasNames}
        style={styles.slider}
        value={sizeNames}
        onValueChange={handleSizeNamesChange}
      />
      <InputWithLabel
        enabled={hasNames}
        label={"Язык названий"}
        text={currentLang}
        modalName={Routes.ModalPickerLangNames}
        style={styles.label}
      />
    </View>
  );
}

export default React.memo(ControllerStarsV1);

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
