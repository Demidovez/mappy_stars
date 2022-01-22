import {useEffect, useState} from "react";
import {ISize} from "../types/types";

// Определяем размеры карты
export default function useMapHalfSize(size: ISize): ISize {
  const [mapSize, setMapSize] = useState<ISize>({width: 0, height: 0});

  useEffect(() => {
    if (size.width) {
      const width = size.width * Math.sqrt(2);
      const height = size.width * Math.sqrt(2);

      setMapSize({
        width,
        height,
      });
    }
  }, [size]);

  return mapSize;
}
