import React, {useCallback, useEffect, useState} from "react";
import {Dimensions, StyleSheet, View} from "react-native";
import ModalWrapper from "./ModalWrapper";
import {useNavigation} from "@react-navigation/native";
import {useAppDispatch, useAppSelector} from "../../hooks";
import Label from "../Label";
import Input from "../Input";
import InputDescription from "../InputDescription";
import {setLongtitudeAction} from "../../redux/actions/creators/controllerEventActionCreators";

function ModalPickerLongitude() {
  // console.log("ModalPickerLongitude");

  const dispatch = useAppDispatch();

  const longtitude = useAppSelector(state => state.event.longtitude);
  const [currentLongtitudeStr, setCurrentLongtitudeStr] = useState<string>();
  const [isError, setIsError] = useState(false);

  const navigation = useNavigation();

  useEffect(() => setCurrentLongtitudeStr(longtitude.toString()), [longtitude]);

  // Определяем широту и закрываем окно
  const onSumbit = useCallback(() => {
    const reg = new RegExp(
      /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/,
    );
    const isCorrect =
      currentLongtitudeStr && reg.exec(currentLongtitudeStr.trim());

    if (isCorrect) {
      const currentLongtitude = parseFloat(currentLongtitudeStr.trim());

      if (Math.abs(currentLongtitude) <= 180) {
        dispatch(setLongtitudeAction(currentLongtitude));
        navigation.goBack();
      } else {
        setIsError(true);
      }
    } else {
      setIsError(true);
    }
  }, [currentLongtitudeStr]);

  const onChange = useCallback((data: string) => {
    setCurrentLongtitudeStr(data);
    setIsError(false);
  }, []);

  return (
    <ModalWrapper onSumbit={onSumbit}>
      <View style={styles.container}>
        <Label>Долгота места события</Label>
        <Input
          text={currentLongtitudeStr}
          onChange={onChange}
          maxLength={10}
          type={"numeric"}
        />
        <InputDescription text="Значение от -180 до +180" isError={isError} />
      </View>
    </ModalWrapper>
  );
}

export default React.memo(ModalPickerLongitude);

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    minWidth: Dimensions.get("screen").width * 0.7,
  },
});
