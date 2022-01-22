import {useEffect, useState} from "react";
import {useAppSelector} from ".";
import {ISize} from "../types/types";

// Отступ карты от верха холста
export default function useIndentMapTop(viewSize: ISize): number {
  const [indentMap, setIndentMap] = useState(0);
  const marginTopMap = useAppSelector(state => state.map.marginTopMap);

  useEffect(() => {
    const indentMap = (viewSize.height * 0.5 * marginTopMap) / 100;

    setIndentMap(indentMap);
  }, [marginTopMap, viewSize]);

  return indentMap;
}
