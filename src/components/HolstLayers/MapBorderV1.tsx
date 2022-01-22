import React from "react";
import {G} from "react-native-svg";
import {useAppSelector} from "../../hooks";
import useInitialSvgMapWidth from "../../hooks/useInitialSvgMapWidth";
import {Selectors} from "../../redux/selectors/selectors";
import SvgImage from "../SvgImage";

function MapBorderV1() {
  // console.log("MapBorderV1");

  const {colorBorderMap, shapeBorderMapName} = useAppSelector(
    Selectors.getMapBorderInfo,
  );

  const initialWidth = useInitialSvgMapWidth();

  return (
    <G>
      <SvgImage
        width={initialWidth}
        height={initialWidth}
        fill={colorBorderMap}
        name={shapeBorderMapName}
      />
    </G>
  );
}

export default React.memo(MapBorderV1);
