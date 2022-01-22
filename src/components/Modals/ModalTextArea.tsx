import React, {useCallback, useState} from "react";
import {Dimensions, StyleSheet, TextInput, View} from "react-native";
import ModalWrapper from "./ModalWrapper";
import {TModalsStackScreenProps} from "../../navigation/modalsNavigator";
import {Routes} from "../../navigation/routes";
import Label from "../Label";
import Style from "../../style/Light";

interface IProps extends TModalsStackScreenProps<Routes.ModalTextArea> {}

function ModalTextArea({route, navigation}: IProps) {
  // console.log("ModalTextArea");

  const {onSetText, label, text} = route.params;

  const [resultText, setResultText] = useState(text);

  const onSumbit = useCallback(() => {
    onSetText(resultText);
    navigation.goBack();
  }, [resultText]);

  const onChangeText = useCallback((text: string) => {
    setResultText(text);
  }, []);

  return (
    <ModalWrapper onSumbit={onSumbit}>
      <View style={styles.container}>
        <Label>{label}</Label>
        <View style={styles.text_wrapper}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={resultText}
            multiline={true}
            numberOfLines={4}
            spellCheck={false}
            placeholder={"Введите текст..."}
            autoCapitalize={"none"}
          />
        </View>
      </View>
    </ModalWrapper>
  );
}

export default React.memo(ModalTextArea);

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    minWidth: Dimensions.get("screen").width * 0.7,
  },
  text_wrapper: {
    backgroundColor: "#EDEEF1",
    marginTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 6,
    marginBottom: 15,
  },
  input: {
    ...Style.font_bold,
    fontSize: 16,
    textAlignVertical: "top",
    paddingBottom: 0,
    maxHeight: 7 * 30,
  },
});
