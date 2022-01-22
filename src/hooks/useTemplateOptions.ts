import {useEffect, useState} from "react";
import {useAppSelector} from ".";
import {Selectors} from "../redux/selectors/selectors";

// Загружаем опции шаблона с задержкой, чтобы успели прогрузиться прочие параметры
export default function useTemplateOptions() {
  const options = useAppSelector(Selectors.getMapStarInfo);
  const [delayOptions, setDelayOptions] = useState(options);

  useEffect(() => {
    setTimeout(() => {
      setDelayOptions(options);
    }, 0);
  }, [options]);

  return delayOptions;
}
