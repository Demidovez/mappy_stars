import {useCallback} from "react";
import {ToastShowOptions} from "react-native-toast-message";
import {useAppDispatch} from ".";
import {setToastAction} from "../redux/actions/creators/toastActionCreators";

type TFunction = (options: ToastShowOptions) => void;

// TODO: Проверить везде ли используется хук
// Запуск тоаста
export default function useShowToast(): TFunction {
  const dispatch = useAppDispatch();

  const showToast = useCallback(
    (options: ToastShowOptions) => dispatch(setToastAction(options)),
    [],
  );

  return showToast;
}
