import {useEffect, useState} from "react";
import {Selectors} from "../redux/selectors/selectors";
import usePreviewSize from "./usePreviewSize";
import {useAppSelector} from "./index";

// Определяем ширину рамки
export default function useBorderWidth(): number {
  const [borderWidth, setBorderWidth] = useState(0);

  const sizePreview = usePreviewSize();
  const widthHolstBorder = useAppSelector(
    state => state.canvas.widthHolstBorder,
  );

  useEffect(() => {
    setBorderWidth(
      Math.min(sizePreview.width, sizePreview.height) *
        0.1 *
        (widthHolstBorder / 100),
    );
  }, [sizePreview, widthHolstBorder]);

  return borderWidth;
}
