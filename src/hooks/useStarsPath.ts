import {useEffect, useState} from "react";
import stars6Data from "../star-library/data/stars.6.json";
import {starSize} from "../star-library/scripts";
import {IStarPathData, TStar} from "../types/types";
import useInitialSvgMapWidth from "./useInitialSvgMapWidth";

// Создаем один большой Path-SVG-слой звезд
export default function useStarsPath(
  sizeStars: number,
  geoMapPath: Function,
): IStarPathData {
  const initialWidth = useInitialSvgMapWidth();
  const [starsPathData, setStarsPathData] = useState<IStarPathData>({
    layer1: "",
    layer2: "",
    layer3: "",
  });

  useEffect(() => {
    if (geoMapPath) {
      // Создаем один большой Path-SVG-слой звезд
      new Promise((resolve: Function) => {
        const pathsL1: string[] = [];
        const pathsL2: string[] = [];
        const pathsL3: string[] = [];

        stars6Data.forEach(([_, mag, lat, lon]: TStar) => {
          const feature = {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [lat, lon],
            },
          };

          const pointPath = geoMapPath(feature);

          if (pointPath) {
            const r = starSize(initialWidth, sizeStars, mag);

            const newPath = pointPath.replace(
              "0,4.5a4.5,4.5 0 1,1 0,-9a4.5,4.5 0 1,1 0,9z",
              `0,${r}a${r},${r} 0 1,1 0,-${r * 2}a${r},${r} 0 1,1 0,${r * 2}z`,
            );

            if (mag <= 4) {
              pathsL1.push(newPath);
            } else if (mag <= 5) {
              pathsL2.push(newPath);
            } else {
              pathsL3.push(newPath);
            }
          }
        });

        setStarsPathData({
          layer1: pathsL1.join(" "),
          layer2: pathsL2.join(" "),
          layer3: pathsL3.join(" "),
        });
        resolve();
      });
    }
  }, [sizeStars, geoMapPath]);

  return starsPathData;
}
