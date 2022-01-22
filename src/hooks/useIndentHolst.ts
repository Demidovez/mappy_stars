import {useEffect, useState} from "react";
import {ISize} from "../types/types";

// Определяем длину отступа по периметру холста
export default function useIndentHolst(
  viewSize: ISize,
  indentHolstBorder: number,
): number {
  const [indent, setIndent] = useState(0);

  useEffect(() => {
    const indent =
      (Math.min(viewSize.width, viewSize.height) * 0.25 * indentHolstBorder) /
      100;

    setIndent(indent);
  }, [viewSize, indentHolstBorder]);

  return indent;
}
