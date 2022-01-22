import {useEffect, useState} from "react";
import {Dimensions, StatusBar} from "react-native";
import {ISize} from "../types/types";

const SCREEN = Dimensions.get("screen");
const WIDTH = SCREEN.width;
const HEIGHT = SCREEN.height - (StatusBar.currentHeight || 0);

// Опеределяем размеры превью шаблона и контроллеров (табов)
export default function useLayoutSize(): [ISize, ISize] {
  const [previewSize, setPreviewSize] = useState<ISize>({width: 0, height: 0});
  const [tabsSize, setTabsSize] = useState<ISize>({width: 0, height: 0});

  useEffect(() => {
    setPreviewSize({
      width: WIDTH,
      height: HEIGHT * 0.55,
    });

    setTabsSize({
      width: WIDTH,
      height: HEIGHT * 0.45,
    });
  }, []);

  return [previewSize, tabsSize];
}
