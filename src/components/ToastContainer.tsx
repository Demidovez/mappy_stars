import React, {useEffect, useRef} from "react";
import {Text, StyleSheet, View, TouchableWithoutFeedback} from "react-native";
import Toast, {BaseToastProps} from "react-native-toast-message";
import Style from "../style/Light";
import SvgImage from "./SvgImage";
import LottieView from "lottie-react-native";
import {useAppDispatch, useAppSelector} from "../hooks";
import {setToastResetAction} from "../redux/actions/creators/toastActionCreators";

function ToastContainer() {
  // console.log("ToastContainer");

  const toast = useAppSelector(state => state.toast);
  const dispatch = useAppDispatch();

  const lottieRef = useRef<LottieView>(null);

  useEffect(() => {
    if (toast.type) {
      lottieRef?.current!!.resume();

      Toast.show({
        ...toast,
        onPress: () => {
          toast.onPress?.();

          Toast.hide();
        },
        onHide: () => {
          toast.onHide?.();

          dispatch(setToastResetAction());
        },
      });
    }
  }, [toast]);

  const toastConfig = {
    success: ({text1, text2, onPress}: BaseToastProps) => (
      <View style={styles.container}>
        <View style={styles.icon}>
          <LottieView
            source={require("../../assets/icons/success.json")}
            ref={lottieRef}
            loop={false}
            autoPlay={false}
          />
        </View>
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={styles.content}>
            <Text style={styles.text1}>{text1}</Text>
            {text2 && <Text style={styles.text2}>{text2}</Text>}
          </View>
        </TouchableWithoutFeedback>
        {toast.onPress && (
          <TouchableWithoutFeedback onPress={Toast.hide}>
            <View style={styles.close}>
              <SvgImage width={20} height={20} name="close" />
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    ),
    error: ({text1, text2}: BaseToastProps) => (
      <View style={styles.container}>
        <View style={styles.icon}>
          <LottieView
            source={require("../../assets/icons/error.json")}
            ref={lottieRef}
            loop={false}
            autoPlay={false}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.text1}>{text1}</Text>
          {text2 && <Text style={styles.text2}>{text2}</Text>}
        </View>
      </View>
    ),
  };

  return <Toast ref={ref => Toast.setRef(ref)} config={toastConfig} />;
}

export default React.memo(ToastContainer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 30,
    height: 80,
    borderLeftWidth: 0,
    backgroundColor: "white",
    borderRadius: 6,
    width: "90%",
    elevation: 5,
  },
  icon: {
    width: 70,
    height: 45,
  },
  content: {
    flex: 1,
    paddingRight: 30,
    paddingVertical: 10,
  },
  text1: {
    ...Style.font,
    fontSize: 16,
    fontWeight: "400",
    color: "#4a5660",
    textAlign: "left",
  },
  text2: {
    ...Style.font,
    fontSize: 14,
    fontWeight: "400",
    color: "#A2A6AA",
    textAlign: "left",
  },
  close: {
    width: 50,
    paddingVertical: 20,
    paddingHorizontal: 30,
    alignItems: "center",
  },
});
