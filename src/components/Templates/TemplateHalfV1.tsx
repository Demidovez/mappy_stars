import React, {useMemo, useState} from "react";
import {StyleSheet, View} from "react-native";
import {useAppSelector} from "../../hooks";
import HolstV1 from "../HolstLayers/HolstV1";
import BorderV1 from "../HolstLayers/BorderV1";
import DescTextV1 from "../HolstLayers/DescTextV1";
import SeparatorV1 from "../HolstLayers/SeparatorV1";
import LocationTextV1 from "../HolstLayers/LocationTextV1";
import MapStarV2 from "../HolstLayers/MapStarV2";
import MapBorderV2 from "../HolstLayers/MapBorderV2";
import useHeightMap from "../../hooks/useHeightMap";
import useIndentHolst from "../../hooks/useIndentHolst";
import useBorderWidth from "../../hooks/useBorderWidth";
import usePreviewSize from "../../hooks/usePreviewSize";
import {Selectors} from "../../redux/selectors/selectors";

function TemplateHalfV1() {
  // console.log("TemplateHalfV1");

  const {indentHolstBorder, hasHolstBorder, holstColor} = useAppSelector(
    state => state.canvas,
  );

  const radius = 1; // TODO: ???????????

  const marginTopMap = useAppSelector(state => state.map.marginTopMap);
  const [sizeBorderMap, setSizeBorderMap] = useState(20); // TODO: Заглушка

  const previewSize = usePreviewSize();
  const indent = useIndentHolst(previewSize, indentHolstBorder);
  const borderWidth = useBorderWidth();
  const indentMap = useHeightMap(marginTopMap, previewSize, radius);

  // Итоговый стиль
  const styleWrapper = useMemo(
    () => [
      styles.wrapper,
      {
        ...previewSize,
      },
    ],
    [previewSize],
  );

  // Итоговый стиль контента
  const styleContent = useMemo(
    () => [
      styles.content,
      {
        marginBottom:
          (hasHolstBorder ? indent + borderWidth : 0) +
          Math.min(previewSize.width, previewSize.height) * 0.035,
      },
    ],
    [previewSize, hasHolstBorder, indent, borderWidth],
  );

  // Итоговый стиль звездной карты
  const styleMap = useMemo(
    () => [
      styles.map_wrapper,
      {
        marginTop: -(radius - previewSize.width / 2) - indentMap,
        marginBottom: (previewSize.width * 0.05 * sizeBorderMap) / 100,
      },
    ],
    [indentMap, previewSize.width, radius, sizeBorderMap],
  );

  return (
    <View style={styles.container}>
      {/* <View style={styleWrapper}>
        <HolstV1 size={previewSize} color={holstColor} />
        <BorderV1 size={previewSize} />
        <View style={styleContent}>
          <View style={styleMap}>
            <MapBorderV2 size={viewSize} />
            <MapStarV2 size={viewSize} />
          </View>
          <DescTextV1 size={viewSize} />
          <SeparatorV1 size={viewSize} />
          <LocationTextV1 size={viewSize} />
        </View>
      </View> */}
    </View>
  );
}

export default React.memo(TemplateHalfV1);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  wrapper: {
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    overflow: "hidden",
  },
  map_wrapper: {
    justifyContent: "center",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    alignContent: "space-between",
  },
});
