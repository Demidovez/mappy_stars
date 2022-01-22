import {useEffect, useState} from "react";
import useInitialSvgMapWidth from "./useInitialSvgMapWidth";

// Определяем размер текста названий
export default function useFontSize(sizeNames: number): number {
  const initialWidth = useInitialSvgMapWidth();
  const [fontSize, setFontSize] = useState(0);

  useEffect(() => {
    setFontSize(
      initialWidth * 0.015 + (initialWidth * 0.025 * sizeNames) / 100,
    );
  }, [sizeNames, initialWidth]);

  return fontSize;
}
