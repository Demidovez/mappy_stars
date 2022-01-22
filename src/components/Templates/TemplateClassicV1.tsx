import React, {useState} from "react";
import HolstV1 from "../HolstLayers/HolstV1";
import BorderV1 from "../HolstLayers/BorderV1";
import MapBorderV1 from "../HolstLayers/MapBorderV1";
import DescTextV1 from "../HolstLayers/DescTextV1";
import SeparatorV1 from "../HolstLayers/SeparatorV1";
import LocationTextV1 from "../HolstLayers/LocationTextV1";
import MapStarV1 from "../HolstLayers/MapStarV1";
import usePreviewSize from "../../hooks/usePreviewSize";
import Svg, {G, Rect} from "react-native-svg";
import useIndentMapTop from "../../hooks/useIndentMapTop";
import useMapScale from "../../hooks/useMapScale";
import useInitialSvgMapWidth from "../../hooks/useInitialSvgMapWidth";
import {useAppSelector} from "../../hooks";
import {Selectors} from "../../redux/selectors/selectors";
import useShapeMapBorder from "../../hooks/useShapeMapBorder";
import useIndentBorder from "../../hooks/useIndentBorder";
import useBorderWidth from "../../hooks/useBorderWidth";
import useHeightSeparator from "../../hooks/useHeightSeparator";
import TemplateWrapper from "./TemplateWrapper";

function TemplateClassicV1() {
  // console.log("TemplateClassicV1");

  const sizePreview = usePreviewSize();
  const indentMap = useIndentMapTop(sizePreview);
  const initialWidth = useInitialSvgMapWidth();
  const {sizeMap, hasBorderMap, shapeBorderMapName} = useAppSelector(
    Selectors.getMapBorderInfo,
  );
  const ratioMapBorder = useShapeMapBorder(shapeBorderMapName);
  const mapScale = useMapScale(sizeMap, sizePreview, initialWidth);
  const indent = useIndentBorder();
  const borderWidth = useBorderWidth();
  const heightSeparator = useHeightSeparator();
  const [heightDescText, setHeightDescText] = useState(0);
  const [heightLocationText, setHeightLocationText] = useState(0);

  const heightContent =
    sizePreview.height -
    (indent + borderWidth + indent * 0.25) -
    indentMap -
    mapScale * (initialWidth + initialWidth * ratioMapBorder * 0.5);

  const heightSpaceContent =
    (heightContent - heightSeparator - heightDescText - heightLocationText) / 3;

  const centerXforMap = sizePreview.width / 2 - (mapScale * initialWidth) / 2;

  const offsetBorderMap = (-initialWidth * ratioMapBorder) / 2;

  const offsetContent =
    sizePreview.height - (indent + borderWidth) - heightContent;

  return (
    <TemplateWrapper>
      <G scale={1}>
        <HolstV1 />
        <BorderV1 />
        <G scale={mapScale} x={centerXforMap} y={indentMap}>
          <G y={offsetBorderMap} scale={1 + ratioMapBorder} x={offsetBorderMap}>
            <MapBorderV1 />
          </G>

          <MapStarV1 />
        </G>

        <G y={offsetContent}>
          <G y={heightSpaceContent}>
            <Rect
              x={0}
              y={0}
              height={heightDescText}
              width={sizePreview.width}
            />
            <DescTextV1 onHeightText={setHeightDescText} />
          </G>

          <G y={2 * heightSpaceContent + heightDescText}>
            <Rect
              x={0}
              y={0}
              height={heightSeparator}
              width={sizePreview.width}
            />
            <SeparatorV1 />
          </G>
          <G y={3 * heightSpaceContent + heightDescText + heightSeparator}>
            <Rect
              x={0}
              y={0}
              height={heightLocationText}
              width={sizePreview.width}
            />
            <LocationTextV1 onHeightText={setHeightLocationText} />
          </G>
        </G>
      </G>
    </TemplateWrapper>
  );
}

export default React.memo(TemplateClassicV1);
