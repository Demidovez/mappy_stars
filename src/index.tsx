import React, {useEffect, useMemo} from "react";
import {StyleSheet, SafeAreaView, StatusBar} from "react-native";
import Navigate from "./navigation/mainNavigator";
import {useAppDispatch} from "./hooks";
import {
  fetchColorsAction,
  fetchControllersAction,
  fetchHolstsAction,
  fetchTemplatesAction,
  fetchShapesBorderMapAction,
  fetchShapesSeparatorAction,
  fetchFontsAction,
  fetchHolstImagesAction,
} from "./redux/actions/creators/dataActionCreators";
import {useAppSelector} from "./hooks";
import {Selectors} from "./redux/selectors/selectors";
import ToastContainer from "./components/ToastContainer";
import * as TransparentStatusAndNavigationBar from "react-native-transparent-status-and-navigation-bar";
import moment from "moment";
TransparentStatusAndNavigationBar.init();

export default function App() {
  // console.log("App");
  const dispatch = useAppDispatch();

  const theme = useAppSelector(Selectors.getTheme);
  const langApplication = useAppSelector(Selectors.getLanguage);

  // Определяем локаль для даты исходя из языка интерфейса
  useEffect(() => {
    try {
      moment.locale(langApplication);
    } catch {
      console.log("Error Moment.js");
    }
  }, [langApplication]);

  useEffect(() => {
    TransparentStatusAndNavigationBar.setBarsStyle(true, "dark-content");

    dispatch(fetchTemplatesAction());
    dispatch(fetchControllersAction());
    dispatch(fetchHolstsAction());
    dispatch(fetchColorsAction());
    dispatch(fetchShapesBorderMapAction());
    dispatch(fetchShapesSeparatorAction());
    dispatch(fetchFontsAction());
    dispatch(fetchHolstImagesAction());
  }, []);

  const style = useMemo(
    () => [
      styles.container,
      {
        backgroundColor: theme.colors.background,
      },
    ],
    [theme],
  );

  return (
    <SafeAreaView style={style}>
      <StatusBar animated={true} barStyle="dark-content" />
      <Navigate />
      <ToastContainer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
