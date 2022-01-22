import React, {useMemo} from "react";
import {StyleSheet, View} from "react-native";
import {ISize} from "../../types/types";
import Svg, {G, Text} from "react-native-svg";
import Stars from "../MapLayers/Stars";
import MilkyWay from "../MapLayers/MilkyWay";
import Graticule from "../MapLayers/Graticule";
import Planets from "../MapLayers/Planets";
import NamesObjects from "../MapLayers/NamesObjects";
import useConstellationNames from "../../hooks/useConstellationNames";
import useConstellationsPath from "../../hooks/useConstellationsPath";
import useDashedGraticule from "../../hooks/useDashedGraticule";
import useFontSizeNames from "../../hooks/useFontSizeNames";
import useGeoMapPath from "../../hooks/useGeoMapPath";
import useGraticulePath from "../../hooks/useGraticulePath";
import useInitialSvgMapWidth from "../../hooks/useInitialSvgMapWidth";
import useLanguageNames from "../../hooks/useLanguageNames";
import useMilkyWaysPath from "../../hooks/useMilkyWaysPath";
import usePlanetNames from "../../hooks/usePlanetNames";
import usePlanetsPath from "../../hooks/usePlanetsPath";
import useStarNames from "../../hooks/useStarNames";
import useStarsPath from "../../hooks/useStarsPath";
import useStrokeWidthConstellations from "../../hooks/useStrokeWidthConstellations";
import useStrokeWidthGraticule from "../../hooks/useStrokeWidthGraticule";
import useTemplateOptions from "../../hooks/useTemplateOptions";
import useMapHalfSize from "../../hooks/useMapHalfSize";
import Lines from "../MapLayers/Lines";

interface IProps {
  size: ISize;
}

function MapStarV2({size}: IProps) {
  // console.log("MapStarV2");

  const {
    sizeStars,
    opacityStars,
    hasGraticule,
    colorGraticule,
    hasDashedGraticule,
    opacityGraticule,
    widthGraticule,
    hasMilkyWay,
    colorStars,
    hasConstellations,
    colorConstellations,
    opacityConstellations,
    widthConstellations,
    hasNames,
    colorNames,
    sizeNames,
    langNames,
    longtitude,
    latitude,
    date,
    mapColor,
  } = useTemplateOptions();

  const language = useLanguageNames(langNames);
  const mapSize = useMapHalfSize(size);
  const initialWidth = useInitialSvgMapWidth();
  const fontSize = useFontSizeNames(sizeNames);
  const geoMapPath = useGeoMapPath(longtitude, latitude, date);
  const starsPathData = useStarsPath(sizeStars, geoMapPath);
  const constellationsPath = useConstellationsPath(
    sizeStars,
    geoMapPath,
    hasConstellations,
  );
  const milkyWayData = useMilkyWaysPath(geoMapPath);
  const graticulePath = useGraticulePath(geoMapPath, hasGraticule);
  const strokeWidthGraticule = useStrokeWidthGraticule(widthGraticule);
  const dashedGraticule = useDashedGraticule(hasDashedGraticule);
  const strokeWidthConstellations =
    useStrokeWidthConstellations(widthConstellations);
  const planetsPath = usePlanetsPath(date, sizeStars, geoMapPath);
  const starNames = useStarNames(hasNames, geoMapPath, language);
  const planetNames = usePlanetNames(date, hasNames, geoMapPath, language);
  const constellationNames = useConstellationNames(
    hasNames,
    hasConstellations,
    geoMapPath,
    language,
  );

  // Итоговый стиль контейнера
  const styleContainer = useMemo(
    () => [
      {
        ...mapSize,
        backgroundColor: mapColor,
      },
    ],
    [mapSize, mapColor],
  );

  return (
    <View style={styles.container}>
      {mapSize.width > 0 && (
        <View style={styleContainer}>
          <Svg width="100%" height="100%">
            <G scale={mapSize.width / initialWidth}>
              <G
                opacity={hasConstellations ? opacityConstellations / 100 : 0}
                stroke={colorConstellations}
                strokeWidth={strokeWidthConstellations}>
                <Lines path={constellationsPath} />
              </G>
              <G opacity={hasMilkyWay ? 1 : 0}>
                <MilkyWay data={milkyWayData} color={colorStars} />
              </G>
              <G
                opacity={hasGraticule ? opacityGraticule / 100 : 0}
                stroke={colorGraticule}
                strokeWidth={strokeWidthGraticule}>
                <Graticule path={graticulePath} dashes={dashedGraticule} />
              </G>
              <G opacity={opacityStars / 100} fill={colorStars}>
                <Stars data={starsPathData} />
              </G>
              <G opacity={opacityStars / 100}>
                <Planets paths={planetsPath} />
              </G>
              <Text
                fontSize={fontSize}
                fontFamily="Nunito-Regular"
                stroke="none"
                textAnchor="middle">
                <G
                  opacity={hasNames ? 1 : 0}
                  fill={colorNames}
                  y={-fontSize * 0.7}>
                  <NamesObjects names={starNames} />
                  <NamesObjects names={planetNames} />
                </G>
                <G
                  opacity={hasNames && hasConstellations ? 1 : 0}
                  fill={colorNames}
                  y={-fontSize * 0.7}>
                  <NamesObjects names={constellationNames} />
                </G>
              </Text>
            </G>
          </Svg>
        </View>
      )}
    </View>
  );
}

export default React.memo(MapStarV2);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignSelf: "center",
    borderRadius: 99999,
    overflow: "hidden",
  },
});
