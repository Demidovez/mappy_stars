import {useEffect, useState} from "react";
import {ISize} from "../types/types";
import useInitialSvgMapWidth from "./useInitialSvgMapWidth";

// Определяем размеры карты
export default function useMapScale(
  sizeMap: number,
  size: ISize,
  initialWidth: number,
): number {
  const [mapScale, setMapScale] = useState(1);

  useEffect(() => {
    const scale =
      (initialWidth + ((size.width - initialWidth) * sizeMap) / 100) /
      initialWidth;

    setMapScale(scale);
  }, [sizeMap, size, initialWidth]);

  return mapScale;
}
