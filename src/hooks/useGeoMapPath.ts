import {useCallback} from "react";
import {geoOrthographicRaw, geoPath} from "../star-library/d3-geo";
import {getAzimutPoint, getProjectionMap} from "../star-library/scripts";
import useInitialSvgMapWidth from "./useInitialSvgMapWidth";

// Определяем функцию для трансформации координат в path
export default function useGeoMapPath(
  longtitude: number,
  latitude: number,
  date: Date,
): Function {
  const initialWidth = useInitialSvgMapWidth();

  const geoMapPath = useCallback(
    (obj: any) => {
      var zenith = getAzimutPoint(date, [90, 0], [latitude, longtitude]);

      const projection = (
        getProjectionMap(geoOrthographicRaw).scale(initialWidth / 2) as any
      )
        .clipAngle(90)
        .translate([initialWidth / 2, initialWidth / 2])
        .rotate([-zenith[0], -zenith[1], 0]);

      return geoPath().projection(projection)(obj);
    },
    [longtitude, latitude, date, initialWidth],
  );

  return geoMapPath;
}
