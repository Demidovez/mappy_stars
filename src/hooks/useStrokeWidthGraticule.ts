import {useEffect, useState} from "react";
import useInitialSvgMapWidth from "./useInitialSvgMapWidth";

// Определяем толщину сетки
export default function useStrokeWidthGraticule(
  widthGraticule: number,
): number {
  const initialWidth = useInitialSvgMapWidth();
  const [strokeWidthGraticule, setStrokeWidthGraticule] = useState<number>(0);

  useEffect(() => {
    setStrokeWidthGraticule((initialWidth * 0.015 * widthGraticule) / 100);
  }, [widthGraticule]);

  return strokeWidthGraticule;
}
