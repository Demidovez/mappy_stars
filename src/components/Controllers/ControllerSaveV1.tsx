import React, {useCallback, useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {RectButton} from "react-native-gesture-handler";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {setFormatAction} from "../../redux/actions/creators/controllerSaveActionCreators";
import ItemCardSimple from "../ItemCardSimple";
import Label from "../Label";
import ListCard from "../ListCard";
import Style from "../../style/Light";
import {Selectors} from "../../redux/selectors/selectors";
import {EFormat, EStatusDownload} from "../../types/types";
import useSaveTemplate from "../../hooks/useSaveTemplate";
import {Routes} from "../../navigation/routes";
import * as RootNavigation from "../../navigation/rootNavigation";

function ControllerSaveV1() {
  // console.log("ControllerSaveV1");

  const dispatch = useAppDispatch();

  const {formatFile, formats} = useAppSelector(state => state.save);
  const theme = useAppSelector(Selectors.getTheme);

  const [statusDownload, setStatusDownload] = useState(EStatusDownload.IDLE);

  // Процедура сохранения начнется, когда статус будет отличным от IDLE
  const isDownloaded = useSaveTemplate(statusDownload);

  // Когда шаблон сохранен меняем статус на IDLE
  useEffect(() => {
    isDownloaded && setStatusDownload(EStatusDownload.IDLE);
  }, [isDownloaded]);

  const handleSetFormat = useCallback(
    (format: EFormat) => dispatch(setFormatAction(format)),
    [],
  );

  const handleShare = useCallback(() => {
    setStatusDownload(EStatusDownload.SHARING);
  }, []);

  const handleDownload = useCallback(() => {
    setStatusDownload(EStatusDownload.DOWNLOADING);
  }, []);

  const handleSave = useCallback(() => {
    RootNavigation.navigate(Routes.Modals, {
      screen: Routes.ModalSaveProject,
    });
  }, []);
  const handleDelete = useCallback(() => {}, []);

  return (
    <View style={styles.container}>
      <Label style={styles.label}>Формат файла</Label>
      <ListCard
        data={formats}
        item={ItemCardSimple}
        onPress={handleSetFormat}
        value={formatFile}
      />
      <View style={styles.row_buttons}>
        <View style={styles.button_share_wrapper}>
          <RectButton
            onPress={handleShare}
            rippleColor={theme.colors.buttonRipple}>
            <Text style={styles.button}>
              {statusDownload == EStatusDownload.SHARING
                ? "Загрузка..."
                : "Поделиться"}
            </Text>
          </RectButton>
        </View>
        <Text style={styles.or_text}>или</Text>
        <View style={styles.button_save_wrapper}>
          <RectButton
            onPress={handleSave}
            rippleColor={theme.colors.buttonRipple}>
            <Text style={styles.button}>Сохранить</Text>
          </RectButton>
        </View>
      </View>
      {1 != 1 && (
        <View style={styles.button_remove_wrapper}>
          <RectButton
            onPress={handleDelete}
            rippleColor={theme.colors.buttonRipple}>
            <Text style={styles.button}>Удалить</Text>
          </RectButton>
        </View>
      )}
      <View style={styles.button_download_wrapper}>
        <RectButton
          onPress={handleDownload}
          rippleColor={theme.colors.buttonRipple}>
          <Text style={styles.button}>
            {statusDownload == EStatusDownload.DOWNLOADING
              ? "Загрузка..."
              : "Скачать"}
          </Text>
        </RectButton>
      </View>
    </View>
  );
}

export default React.memo(ControllerSaveV1);

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
  or_text: {
    ...Style.font,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 16,
  },
  button_save_wrapper: {
    flex: 1,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#55616c",
  },
  button_remove_wrapper: {
    flex: 1,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#e1563e",
    margin: 18,
    marginTop: 0,
  },
  button_download_wrapper: {
    flex: 1,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#75caf5",
    margin: 18,
    marginTop: 0,
    marginBottom: 0,
  },
  button_share_wrapper: {
    flex: 1,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#55616c",
  },
  row_buttons: {
    flex: 1,
    padding: 18,
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    ...Style.font,
    color: "#FFFFFF",
    fontSize: 15,
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
});
