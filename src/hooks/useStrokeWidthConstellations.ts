import {useEffect, useState} from "react";
import useInitialSvgMapWidth from "./useInitialSvgMapWidth";

// Определяем толщину линий созвездий
export default function useStrokeWidthConstellations(
  widthConstellations: number,
): number {
  const initialWidth = useInitialSvgMapWidth();
  const [strokeWidthConstellations, setStrokeWidthConstellations] =
    useState<number>(0);

  useEffect(() => {
    setStrokeWidthConstellations(
      (initialWidth * 0.02 * widthConstellations) / 100,
    );
  }, [widthConstellations]);

  return strokeWidthConstellations;
}
