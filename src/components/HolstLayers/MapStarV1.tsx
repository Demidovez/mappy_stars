import React from "react";
import {Circle, G, Text} from "react-native-svg";
import Lines from "../MapLayers/Lines";
import MilkyWay from "../MapLayers/MilkyWay";
import Graticule from "../MapLayers/Graticule";
import Stars from "../MapLayers/Stars";
import Planets from "../MapLayers/Planets";
import NamesObjects from "../MapLayers/NamesObjects";
import useGeoMapPath from "../../hooks/useGeoMapPath";
import useFontSizeNames from "../../hooks/useFontSizeNames";
import useLanguageNames from "../../hooks/useLanguageNames";
import useStarsPath from "../../hooks/useStarsPath";
import usePlanetsPath from "../../hooks/usePlanetsPath";
import useConstellationsPath from "../../hooks/useConstellationsPath";
import useMilkyWaysPath from "../../hooks/useMilkyWaysPath";
import useGraticulePath from "../../hooks/useGraticulePath";
import useStrokeWidthGraticule from "../../hooks/useStrokeWidthGraticule";
import useStrokeWidthConstellations from "../../hooks/useStrokeWidthConstellations";
import useDashedGraticule from "../../hooks/useDashedGraticule";
import useStarNames from "../../hooks/useStarNames";
import usePlanetNames from "../../hooks/usePlanetNames";
import useConstellationNames from "../../hooks/useConstellationNames";
import useInitialSvgMapWidth from "../../hooks/useInitialSvgMapWidth";
import useTemplateOptions from "../../hooks/useTemplateOptions";

function MapStarV1() {
  // console.log("MapStarV1");

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

  return (
    <G>
      <Circle
        cx={initialWidth / 2}
        cy={initialWidth / 2}
        r={initialWidth / 2}
        fill={mapColor}
      />
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
        <G opacity={hasNames ? 1 : 0} fill={colorNames} y={-fontSize * 0.7}>
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
  );
}

export default React.memo(MapStarV1);
