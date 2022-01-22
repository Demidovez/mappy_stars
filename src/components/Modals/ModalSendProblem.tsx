import React, {useCallback, useEffect, useMemo, useState} from "react";
import {
  Dimensions,
  StyleSheet,
  TextInput,
  View,
  ActivityIndicator,
} from "react-native";
import ModalWrapper from "./ModalWrapper";
import {TModalsStackScreenProps} from "../../navigation/modalsNavigator";
import {Routes} from "../../navigation/routes";
import Label from "../Label";
import Style from "../../style/Light";
import {EStatus, EToast} from "../../types/types";
import useShowToast from "../../hooks/useShowToast";
import axios from "axios";
import {useAppSelector} from "../../hooks";

interface IProps extends TModalsStackScreenProps<Routes.ModalTextArea> {}

function ModalSendProblem({navigation}: IProps) {
  // console.log("ModalSendProblem");

  const showToast = useShowToast();

  const [textProblem, setTextProblem] = useState("");
  const [contactUser, setContactUser] = useState("");
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [isError, setIsError] = useState(false);
  const [sentStatus, setSentStatus] = useState<EStatus>(EStatus.None);
  const server = useAppSelector(state => state.settings.serverApi);

  useEffect(() => {
    // Если начали вводить текст и есть ошибка, то ошибку убираем
    if (textProblem.trim() && isError) {
      setIsError(false);
    }
  }, [textProblem]);

  useEffect(() => {
    // Очищаем таймер если произошло размонтирование компонента
    return () => timer && clearTimeout(timer);
  }, [timer]);

  useEffect(() => {
    switch (sentStatus) {
      case EStatus.Done:
        // Если проблема отправлена
        showToast({
          type: EToast.Success,
          text1: "Отправлено!",
          text2: "Спасибо за сообщение!",
        });
        navigation.goBack();
        break;
      case EStatus.Error:
        // Если произошла какая-то ошибка оптравки проблемы
        timer && clearTimeout(timer);

        showToast({
          type: EToast.Error,
          text1: "Проблема с интернетом!",
          text2: "Попробуйте еще раз...",
        });
        break;
    }
  }, [sentStatus]);

  const sendProblem = useCallback(() => {
    try {
      // Изменяем статус отправки и запускает таймер на ожидание 10 сек
      setSentStatus(EStatus.Loading);
      setTimer(
        setTimeout(() => {
          setSentStatus(EStatus.Error);
        }, 10000),
      );

      // Отправляем на сервер
      axios
        .post(server + "send_problem", {
          user: contactUser,
          contact: textProblem,
        })
        .then(() => {
          timer && clearTimeout(timer);
          setSentStatus(EStatus.Done);
        });
    } catch {
      // Изменяем статус на Ошибка если что-то не так произошло
      setSentStatus(EStatus.Error);
    }
  }, [textProblem, contactUser, timer]);

  const onSumbit = useCallback(() => {
    // Если текст проблемы есть - отправляем, или ошибка
    if (textProblem.trim()) {
      sendProblem();
    } else {
      setIsError(true);
    }
  }, [textProblem, sendProblem]);

  const stylelabel = useMemo(() => [isError && {color: "#e74c3c"}], [isError]);

  return (
    <ModalWrapper
      onSumbit={onSumbit}
      isDisabled={sentStatus === EStatus.Loading}>
      <View style={styles.container}>
        <View style={styles.label_loader}>
          <Label style={stylelabel}>
            {isError ? "Заполните описание!" : "Сообщение о проблеме"}
          </Label>
          {sentStatus === EStatus.Loading && (
            <ActivityIndicator size="small" color="#A2A6AA" />
          )}
        </View>

        <View style={styles.text_wrapper}>
          <TextInput
            style={styles.input}
            onChangeText={setContactUser}
            value={contactUser}
            multiline={true}
            numberOfLines={1}
            spellCheck={false}
            placeholder={"Ваш контакт для связи"}
            autoCapitalize={"none"}
          />
        </View>
        <View style={styles.text_wrapper}>
          <TextInput
            style={styles.inputArea}
            onChangeText={setTextProblem}
            value={textProblem}
            multiline={true}
            numberOfLines={6}
            spellCheck={false}
            placeholder={"Введите описание проблемы..."}
            autoCapitalize={"none"}
          />
        </View>
      </View>
    </ModalWrapper>
  );
}

export default React.memo(ModalSendProblem);

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
    maxHeight: 9 * 30,
  },
  inputArea: {
    ...Style.font_bold,
    fontSize: 16,
    textAlignVertical: "top",
    paddingBottom: 0,
    maxHeight: 9 * 30,
  },
  label_loader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
