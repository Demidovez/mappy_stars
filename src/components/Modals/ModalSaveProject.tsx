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
import useSaveToProject from "../../hooks/useSaveToProject";

interface IProps extends TModalsStackScreenProps<Routes.ModalTextArea> {}

function ModalSaveProject({navigation}: IProps) {
  // console.log("ModalSaveProject");

  const showToast = useShowToast();

  const [nameProject, setNameProject] = useState("");
  const [descProject, setDescProject] = useState("");
  const [saveStatus, setSaveStatus] = useState<EStatus>(EStatus.None);

  useSaveToProject(saveStatus, nameProject, descProject, setSaveStatus);

  useEffect(() => {
    switch (saveStatus) {
      case EStatus.Done:
        // Если проблема отправлена
        showToast({
          type: EToast.Success,
          text1: "Проект сохранен!",
        });
        navigation.goBack();
        break;
      case EStatus.Error:
        showToast({
          type: EToast.Error,
          text1: "Ошибка сохранения!",
          text2: "Попробуйте еще раз...",
        });
        break;
    }
  }, [saveStatus]);

  const onSumbit = useCallback(() => {
    setSaveStatus(EStatus.Loading);
  }, []);

  return (
    <ModalWrapper
      onSumbit={onSumbit}
      isDisabled={saveStatus === EStatus.Loading}
      okTextBtn="Сохранить">
      <View style={styles.container}>
        <View style={styles.label_loader}>
          <Label>Сохранить в мои проекты</Label>
          {saveStatus === EStatus.Loading && (
            <ActivityIndicator size="small" color="#A2A6AA" />
          )}
        </View>

        <View style={styles.text_wrapper}>
          <TextInput
            style={styles.input}
            onChangeText={setNameProject}
            value={nameProject}
            multiline={true}
            numberOfLines={1}
            spellCheck={false}
            placeholder={"Название..."}
            autoCapitalize={"none"}
          />
        </View>
        <View style={styles.text_wrapper}>
          <TextInput
            style={styles.inputArea}
            onChangeText={setDescProject}
            value={descProject}
            multiline={true}
            numberOfLines={6}
            spellCheck={false}
            placeholder={"Описание..."}
            autoCapitalize={"none"}
          />
        </View>
      </View>
    </ModalWrapper>
  );
}

export default React.memo(ModalSaveProject);

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
