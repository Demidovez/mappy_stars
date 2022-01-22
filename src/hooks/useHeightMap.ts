import {useEffect, useState} from "react";
import {ISize} from "../types/types";

// Определяем высоту карты
export default function useHeightMap(
  marginTopMap: number,
  viewSize: ISize,
  radius: number,
): number {
  const [indentMap, setIndentMap] = useState(0);

  useEffect(() => {
    const indentMap =
      2 * radius - (2 * radius * 0.5 + 2 * radius * 0.5 * (marginTopMap / 100));

    setIndentMap(indentMap);
  }, [marginTopMap, viewSize, radius]);

  return indentMap;
}
