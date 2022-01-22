import React, {useCallback, useEffect, useMemo, useState} from "react";
import {StyleSheet, View} from "react-native";
import {Selectors} from "../../redux/selectors/selectors";
import ModalWrapper from "./ModalWrapper";
import FlatListChooser from "../FlatListChooser";
import {IFlatListChooser} from "../../types/types";
import {useNavigation} from "@react-navigation/native";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {setLangNamesAction} from "../../redux/actions/creators/controllerStarsActionCreators";

function ModalPickerLangNames() {
  // console.log("ModalPickerLangNames");

  const dispatch = useAppDispatch();

  const navigation = useNavigation();

  const {langs, currentLang} = useAppSelector(Selectors.getLangsOfNames);

  const [langsData, setLangsData] = useState<IFlatListChooser[]>([]);

  const [langSelect, setLangSelect] = useState<string>();

  // Достаем текущий язык название
  useEffect(() => {
    setLangSelect(currentLang);
  }, [currentLang]);

  // Создаем список языков для FlatList
  useEffect(() => {
    const langsData = langs.map(
      (lang, index): IFlatListChooser => ({
        id: index,
        value: lang.lang,
        label: lang.label,
      }),
    );

    setLangsData(langsData);
  }, [langs]);

  // Определяем время события и закрываем окно
  const onSumbit = useCallback(() => {
    if (langSelect) {
      dispatch(setLangNamesAction(langSelect));
    }

    navigation.goBack();
  }, [langSelect]);

  // Запоминаем последний выбор языка
  const onChooseLang = useCallback((data: IFlatListChooser) => {
    setLangSelect(data.value as string);
  }, []);

  // Текущий индекс языка
  const initIndexLang = useMemo(() => {
    const index = langsData?.find(({value}) => value === langSelect)?.id;

    return index != undefined ? index : 0;
  }, [langsData, langSelect]);

  return (
    <ModalWrapper onSumbit={onSumbit} delay={500}>
      <View style={styles.container}>
        <View style={styles.lists}>
          <FlatListChooser
            data={langsData}
            initIndex={initIndexLang}
            heightItem={48}
            visibleItems={7}
            styleType="one"
            onChoosed={onChooseLang}
          />
        </View>
      </View>
    </ModalWrapper>
  );
}

export default React.memo(ModalPickerLangNames);

const styles = StyleSheet.create({
  container: {},
  lists: {
    flexDirection: "row",
    marginTop: 30,
  },
});
