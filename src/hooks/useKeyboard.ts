import {useEffect, useState} from "react";
import {Keyboard} from "react-native";

interface IResult {
  isShowKeyboard: boolean;
  heightKeyboard: number;
}

// Слушаем появление клавиатуры
export default function useKeyboard(): IResult {
  const [keyboardInfo, setKeyboardInfo] = useState({
    isShowKeyboard: false,
    heightKeyboard: 0,
  });

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener(
      "keyboardDidShow",
      ({endCoordinates}) => {
        setKeyboardInfo({
          isShowKeyboard: true,
          heightKeyboard: endCoordinates.height,
        });
      },
    );
    const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardInfo({isShowKeyboard: false, heightKeyboard: 0});
    });

    return () => {
      keyboardHideListener.remove();
      keyboardShowListener.remove();
    };
  }, []);

  return keyboardInfo;
}
