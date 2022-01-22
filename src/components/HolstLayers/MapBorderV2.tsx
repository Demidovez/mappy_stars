import React, {useEffect, useMemo, useState} from "react";
import {StyleSheet, View} from "react-native";
import {useAppSelector} from "../../hooks";
import useShapeMapBorder from "../../hooks/useShapeMapBorder";
import {Selectors} from "../../redux/selectors/selectors";
import {ISize} from "../../types/types";
import SvgImage from "../SvgImage";

interface IProps {
  size: ISize;
}

function MapBorderV2({size}: IProps) {
  // console.log("MapBorderV2");

  const {colorBorderMap, hasBorderMap, shapeBorderMapName} = useAppSelector(
    Selectors.getMapBorderInfo,
  );

  const [mapSize, setMapSize] = useState<ISize>({
    width: 0,
    height: 0,
  });
  const ratio = useShapeMapBorder(shapeBorderMapName);

  useEffect(() => {
    const width = size.width * Math.sqrt(2);
    const height = size.width * Math.sqrt(2);

    setMapSize({
      width,
      height,
    });
  }, [size]);

  const styleContainer = useMemo(
    () => [
      styles.container,
      {
        width: mapSize.width + mapSize.width * ratio,
        height: mapSize.height + mapSize.height * ratio,
      },
    ],
    [shapeBorderMapName, mapSize, ratio],
  );

  return (
    <View style={styleContainer}>
      <View style={styles.content}>
        {hasBorderMap && (
          <SvgImage
            width="100%"
            height="100%"
            fill={colorBorderMap}
            name={shapeBorderMapName}
          />
        )}
      </View>
    </View>
  );
}

export default React.memo(MapBorderV2);

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    borderRadius: 99999,
  },
  content: {position: "absolute"},
});
