import React, {useCallback, useEffect, useMemo, useState} from "react";
import {StyleSheet, View} from "react-native";
import {Selectors} from "../../redux/selectors/selectors";
import ModalWrapper from "./ModalWrapper";
import FlatListChooser from "../FlatListChooser";
import {IFlatListChooser} from "../../types/types";
import {useNavigation} from "@react-navigation/native";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {setFontDescAction} from "../../redux/actions/creators/controllerDescActionCreators";

function ModalPickerFontDesc() {
  // console.log("ModalPickerFontDesc");

  const dispatch = useAppDispatch();

  const navigation = useNavigation();

  const {fonts, currentFont} = useAppSelector(Selectors.getFontsDesc);

  const [fontsData, setFontsData] = useState<IFlatListChooser[]>([]);
  const [fontSelect, setFontSelect] = useState<string>();

  // Достаем текущий шрифт
  useEffect(() => {
    setFontSelect(currentFont);
  }, [currentFont]);

  // Создаем список шрифтов для FlatList
  useEffect(() => {
    const fontsData = fonts.map(
      (font, index): IFlatListChooser => ({
        id: index,
        value: font,
        label: font,
        font,
      }),
    );

    setFontsData(fontsData);
  }, [fonts]);

  // Определяем шрифт и закрываем окно
  const onSumbit = useCallback(() => {
    if (fontSelect) {
      dispatch(setFontDescAction(fontSelect));
    }

    navigation.goBack();
  }, [fontSelect]);

  // Запоминаем последний выбор шрифта
  const onChooseFont = useCallback((data: IFlatListChooser) => {
    setFontSelect(data.value as string);
  }, []);

  // Текущий индекс шрифта
  const initIndexFont = useMemo(() => {
    const index = fontsData?.find(({value}) => value === fontSelect)?.id;

    return index != undefined ? index : -1;
  }, [fontsData]);

  return (
    <ModalWrapper delay={400} onSumbit={onSumbit}>
      <View style={styles.container}>
        <View style={styles.lists}>
          <FlatListChooser
            data={fontsData}
            initIndex={initIndexFont}
            heightItem={48}
            visibleItems={9}
            styleType="one"
            onChoosed={onChooseFont}
          />
        </View>
      </View>
    </ModalWrapper>
  );
}

export default React.memo(ModalPickerFontDesc);

const styles = StyleSheet.create({
  container: {},
  lists: {
    flexDirection: "row",
    marginTop: 30,
  },
});
