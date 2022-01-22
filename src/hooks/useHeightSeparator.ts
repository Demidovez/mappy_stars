import {useEffect, useState} from "react";
import {useAppSelector} from ".";
import {Selectors} from "../redux/selectors/selectors";
import usePreviewSize from "./usePreviewSize";

export default function useHeightSeparator(): number {
  const [height, setHeight] = useState(0);

  const sizePreview = usePreviewSize();

  const {sizeSeparator, hasSeparator} = useAppSelector(
    state => state.separator,
  );

  const shapeSeparator = useAppSelector(Selectors.getShape);

  useEffect(() => {
    if (hasSeparator && shapeSeparator) {
      setHeight(
        (sizePreview.height *
          0.1 *
          (shapeSeparator.ratio || 1) *
          sizeSeparator) /
          100,
      );
    }
  }, [sizeSeparator, sizePreview, shapeSeparator, hasSeparator]);

  return height;
}
