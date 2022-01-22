import {useNavigation} from "@react-navigation/native";
import React from "react";
import {TouchableWithoutFeedback, StyleSheet, View} from "react-native";
import {useAppSelector} from "../hooks";
import {Selectors} from "../redux/selectors/selectors";
import SvgBack from "../../assets/icons/back.svg";

function ArrowBack() {
  // console.log("ArrowBack");

  const navigation = useNavigation();
  const theme = useAppSelector(Selectors.getTheme);

  return (
    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
      <View style={styles.back_button}>
        <SvgBack
          width={25}
          height={25}
          style={{margin: 10}}
          fill={theme.colors.primary}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

export default React.memo(ArrowBack);

const styles = StyleSheet.create({
  container: {},
  back_button: {
    paddingTop: 7,
    paddingLeft: 0,
    paddingRight: 7,
    paddingBottom: 7,
    position: "absolute",
    zIndex: 1, // TODO: Проверить для iOS
  },
});
