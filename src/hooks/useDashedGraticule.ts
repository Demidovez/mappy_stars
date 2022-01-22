import {useEffect, useState} from "react";
import useInitialSvgMapWidth from "./useInitialSvgMapWidth";

// Определяем шаги прерывистой сетки
export default function useDashedGraticule(
  hasDashedGraticule: boolean,
): [number, number, number] {
  const initialWidth = useInitialSvgMapWidth();

  const [dashedGraticule, setDashedGraticule] = useState<
    [number, number, number]
  >([0, 0, 0]);

  useEffect(() => {
    const step = initialWidth * 0.007;
    setDashedGraticule(hasDashedGraticule ? [step, step, step] : [0, 0, 0]);
  }, [hasDashedGraticule]);

  return dashedGraticule;
}
