import React from "react";
import {useAppSelector} from "../../hooks";
import SvgImage from "../SvgImage";
import usePreviewSize from "../../hooks/usePreviewSize";
import {G} from "react-native-svg";
import useHeightSeparator from "../../hooks/useHeightSeparator";
import {Selectors} from "../../redux/selectors/selectors";

function SeparatorV1() {
  // console.log("SeparatorV1");

  const {colorSeparator, hasSeparator} = useAppSelector(
    state => state.separator,
  );
  const shapeSeparator = useAppSelector(Selectors.getShape);
  const sizePreview = usePreviewSize();

  const height = useHeightSeparator();

  // TODO: Иногда дергается
  return (
    <G>
      {hasSeparator && shapeSeparator && (
        <SvgImage
          width={sizePreview.width}
          height={height}
          fill={colorSeparator}
          name={shapeSeparator.name}
        />
      )}
    </G>
  );
}

export default React.memo(SeparatorV1);
