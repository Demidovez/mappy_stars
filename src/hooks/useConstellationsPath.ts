import {useEffect, useState} from "react";
import {useAppSelector} from ".";
import {offsetLinePath} from "../helper";
import starsData from "../star-library/data/stars.lines.json";
import useInitialSvgMapWidth from "./useInitialSvgMapWidth";
import constellationLinesData from "../star-library/data/constellations.lines.json";
import useStrokeWidthConstellations from "./useStrokeWidthConstellations";
import {TStarLine} from "../types/types";

interface IStarLine {
  path: string;
  mag: number;
}

// Создаем один большой Path-SVG-слой созвездий
export default function useConstellationsPath(
  sizeStars: number,
  geoMapPath: Function,
  hasConstellations: boolean,
): string {
  const widthConstellations = useAppSelector(
    state => state.stars.widthConstellations,
  );
  const strokeWidth = useStrokeWidthConstellations(widthConstellations);
  const [constellationsPath, setConstellationsPath] = useState("");
  const [starsPath, setStarsPath] = useState<IStarLine[]>([]);
  const initialWidth = useInitialSvgMapWidth();

  useEffect(() => {
    const stars: IStarLine[] = [];

    starsData.map(([mag, lat, lon]: TStarLine) => {
      const feature = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [lat, lon],
        },
      };

      const path = geoMapPath(feature);

      if (path) {
        stars.push({
          path: geoMapPath(feature).substring(1).split("m")[0],
          mag,
        });
      }
    });

    setStarsPath(stars);
  }, [geoMapPath]);

  useEffect(() => {
    if (geoMapPath && hasConstellations) {
      new Promise((resolve: Function) => {
        const path = constellationLinesData
          .map((constellation: any) => {
            const feature = {
              type: "Feature",
              geometry: {
                type: "MultiLineString",
                coordinates: constellation,
              },
            };

            const polylinePath: string = geoMapPath(feature);

            if (polylinePath) {
              const pathsWithM: string[] = polylinePath.substring(1).split("M");

              let newPolyLinePath = "";

              for (let i = 0; i < pathsWithM.length; i++) {
                const points: any[] = pathsWithM[i].split("L");

                for (let y = 0; y < points.length - 1; y++) {
                  const magStart = (
                    starsPath.find((star: any) => star.path == points[y]) || {
                      mag: 0,
                    }
                  ).mag;

                  const magEnd = (
                    starsPath.find(
                      (star: any) => star.path == points[y + 1],
                    ) || {mag: 0}
                  ).mag;

                  const point = offsetLinePath(
                    points[y],
                    points[y + 1],
                    magStart,
                    magEnd,
                    strokeWidth,
                    initialWidth,
                    sizeStars,
                  );

                  newPolyLinePath += `M${point[0][0]},${point[0][1]}L${point[1][0]},${point[1][1]}`;
                }
              }

              return newPolyLinePath;
            } else {
              return "";
            }
          })
          .join(" ");

        setConstellationsPath(path as string);
        resolve();
      });
    }
  }, [geoMapPath, hasConstellations, sizeStars, strokeWidth]);

  return constellationsPath;
}
