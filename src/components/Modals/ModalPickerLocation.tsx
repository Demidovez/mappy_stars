import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import ModalWrapper from "./ModalWrapper";
import Style from "../../style/Light";
import {useNavigation} from "@react-navigation/native";
import Label from "../Label";
import {
  clearVariantsAction,
  getVariantsAction,
  setLatitudeAction,
  setLocationAction,
  setLongtitudeAction,
} from "../../redux/actions/creators/controllerEventActionCreators";
import {useAppDispatch, useAppSelector} from "../../hooks";
import SvgImage from "../SvgImage";
import {EStatus, IVariant} from "../../types/types";
import {Selectors} from "../../redux/selectors/selectors";
import LottieView from "lottie-react-native";
import loader from "../../../assets/icons/loading.json";
import {FlatList} from "react-native-gesture-handler";
import {setIsChangeTextAction} from "../../redux/actions/creators/controllerLocationActionCreators";

function ModalPickerLocation() {
  // console.log("ModalPickerLocation");

  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const timerRef: {current: NodeJS.Timeout | null} =
    useRef<NodeJS.Timeout>(null);

  const {location, variants, language, status} = useAppSelector(
    Selectors.getLocationData,
  );

  const [resultText, setResultText] = useState(location);
  const [listVariants, setListVariants] = useState<IVariant[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(clearVariantsAction());
  }, []);

  // Поиск локации через 500 мс после изменения текста
  useEffect(() => {
    // Удаляем предыдущий таймер
    timerRef.current && clearTimeout(timerRef.current);

    if (resultText) {
      timerRef.current = setTimeout(
        () => dispatch(getVariantsAction(resultText, language)),
        500,
      );
    }

    return () => {
      timerRef.current && clearTimeout(timerRef.current);
    };
  }, [resultText]);

  // Устанавливаем список найденных вариантов локации
  useEffect(() => {
    setListVariants(variants);
  }, [variants]);

  // Определяем загружены ли варианты
  useEffect(() => {
    if (status === EStatus.Done) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [status]);

  // Изменяем текст в инпуте
  const onChangeText = useCallback((text: string) => {
    setResultText(text);
  }, []);

  // Определяем текущую локацию и ее координаты
  const onSetVariants = useCallback(
    ({location, latitude, longitude}: IVariant) => {
      dispatch(setLatitudeAction(latitude));
      dispatch(setLongtitudeAction(longitude));
      dispatch(setLocationAction(location));
      dispatch(setIsChangeTextAction(false));
      navigation.goBack();
    },
    [],
  );

  // Очищаем текст в инпуте, при нажатии кнопки Х
  const onClearLocation = useCallback(() => setResultText(""), []);

  const Item = useCallback(
    ({item}: any) => {
      return (
        <Text style={styles.variant} onPress={() => onSetVariants(item)}>
          {item.location}
        </Text>
      );
    },
    [onSetVariants],
  );

  const SepatatorItem = useCallback(
    () => <View style={styles.separator} />,
    [],
  );

  const styleLoader = useMemo(
    (): StyleProp<ViewStyle> => [
      styles.lottie,
      {display: !isLoaded ? "flex" : "none"},
    ],
    [isLoaded],
  );

  const keyExtractor = useCallback(item => item.id, []);

  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Label>Место события</Label>
        <View style={styles.text_wrapper}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={resultText}
            multiline={false}
            numberOfLines={1}
            spellCheck={false}
            placeholder={"Введите место..."}
            autoCapitalize={"none"}
          />
          {resultText != "" && (
            <TouchableWithoutFeedback onPress={onClearLocation}>
              <View style={styles.close}>
                <SvgImage
                  width={20}
                  height={20}
                  name={"close"}
                  fill="#9fa7ad"
                />
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
        <View style={styles.content}>
          {isLoaded && listVariants.length > 0 && (
            <View style={styles.list}>
              <FlatList
                keyboardShouldPersistTaps="always"
                data={listVariants}
                renderItem={Item}
                keyExtractor={keyExtractor}
                ItemSeparatorComponent={SepatatorItem}
              />
            </View>
          )}
          {isLoaded && listVariants.length == 0 && (
            <Text style={styles.not_found}>Ничего не найдено :(</Text>
          )}
          <LottieView source={loader} loop autoPlay style={styleLoader} />
        </View>
      </View>
    </ModalWrapper>
  );
}

export default React.memo(ModalPickerLocation);

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    minWidth: "100%",
  },
  text_wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    backgroundColor: "#EDEEF1",
    marginTop: 5,
    paddingLeft: 10,
    borderRadius: 6,
    marginBottom: 0,
  },
  input: {
    ...Style.font_bold,
    flex: 1,
    fontSize: 16,
  },
  close: {
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  variant: {
    ...Style.font_bold,
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  content: {
    marginTop: 10,
    height: Dimensions.get("window").height * 0.3,
    justifyContent: "center",
    overflow: "hidden",
  },
  list: {flex: 1},
  separator: {
    borderBottomWidth: 1,
    borderColor: "gray",
    opacity: 0.2,
    width: "95%",
    alignSelf: "center",
  },
  not_found: {
    ...Style.font,
    fontSize: 15,
    textAlign: "center",
    opacity: 0.5,
  },
  lottie: {
    height: 80,
    alignSelf: "center",
    position: "absolute",
  },
});
