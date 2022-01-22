import {useEffect, useState} from "react";
import {useAppSelector} from "./index";
import usePreviewSize from "./usePreviewSize";

export default function useIndentBorder(): number {
  const [indent, setIndent] = useState(0);

  const sizePreview = usePreviewSize();
  const indentHolstBorder = useAppSelector(
    state => state.canvas.indentHolstBorder,
  );

  useEffect(() => {
    // Определяем длину отступа
    const indent =
      (Math.min(sizePreview.width, sizePreview.height) *
        0.5 *
        indentHolstBorder) /
      100;

    setIndent(indent);
  }, [sizePreview, indentHolstBorder]);

  return indent;
}
