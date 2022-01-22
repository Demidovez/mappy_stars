import React, {useCallback, useEffect, useState} from "react";
import {Dimensions, StyleSheet, View} from "react-native";
import ModalWrapper from "./ModalWrapper";
import {useNavigation} from "@react-navigation/native";
import {useAppDispatch, useAppSelector} from "../../hooks";
import Label from "../Label";
import Input from "../Input";
import InputDescription from "../InputDescription";
import {setLatitudeAction} from "../../redux/actions/creators/controllerEventActionCreators";

function ModalPickerLatitude() {
  // console.log("ModalPickerLatitude");

  const dispatch = useAppDispatch();

  const latitude = useAppSelector(state => state.event.latitude);
  const [currentLatitudeStr, setCurrentLatitudeStr] = useState<string>();
  const [isError, setIsError] = useState(false);

  const navigation = useNavigation();

  useEffect(() => setCurrentLatitudeStr(latitude.toString()), [latitude]);

  // Определяем широту и закрываем окно
  const onSumbit = useCallback(() => {
    const reg = new RegExp(
      /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/,
    );
    const isCorrect = currentLatitudeStr && reg.exec(currentLatitudeStr.trim());

    if (isCorrect) {
      const currentLatitude = parseFloat(currentLatitudeStr.trim());

      if (Math.abs(currentLatitude) <= 90) {
        dispatch(setLatitudeAction(currentLatitude));
        navigation.goBack();
      } else {
        setIsError(true);
      }
    } else {
      setIsError(true);
    }
  }, [currentLatitudeStr]);

  const onChange = useCallback((data: string) => {
    setCurrentLatitudeStr(data);
    setIsError(false);
  }, []);

  return (
    <ModalWrapper onSumbit={onSumbit}>
      <View style={styles.container}>
        <Label>Широта места события</Label>
        <Input
          text={currentLatitudeStr}
          onChange={onChange}
          maxLength={9}
          type={"numeric"}
        />
        <InputDescription text="Значение от -90 до +90" isError={isError} />
      </View>
    </ModalWrapper>
  );
}

export default React.memo(ModalPickerLatitude);

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    minWidth: Dimensions.get("screen").width * 0.7,
  },
});
