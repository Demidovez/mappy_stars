import React from "react";
import {G, Rect} from "react-native-svg";
import {useAppSelector} from "../../hooks";
import useBorderWidth from "../../hooks/useBorderWidth";
import useIndentBorder from "../../hooks/useIndentBorder";
import usePreviewSize from "../../hooks/usePreviewSize";
import {Selectors} from "../../redux/selectors/selectors";

function BorderV1() {
  // console.log("BorderV1");

  const sizePreview = usePreviewSize();

  const {colorHolstBorder, hasHolstBorder} = useAppSelector(
    Selectors.getBolderHolstInfo,
  );

  const indent = useIndentBorder();
  const borderWidth = useBorderWidth();

  return (
    <G>
      {hasHolstBorder && (
        <Rect
          x={indent + borderWidth / 2}
          y={indent + borderWidth / 2}
          width={sizePreview.width - borderWidth - indent * 2}
          height={sizePreview.height - borderWidth - indent * 2}
          fill="none"
          stroke={colorHolstBorder}
          strokeWidth={borderWidth}
        />
      )}
    </G>
  );
}

export default React.memo(BorderV1);
