import {useEffect, useState} from "react";
import {geoGraticule} from "../star-library/d3-geo";

// Создаем один большой Path-SVG-слой сетки
export default function useGraticulePath(
  geoMapPath: Function,
  hasGraticule: boolean,
): string {
  const [graticulePath, setGraticulePath] = useState("");

  useEffect(() => {
    if (geoMapPath && hasGraticule) {
      new Promise((resolve: Function) => {
        const path = geoGraticule()
          .stepMinor([15, 10])
          .lines()
          .map((graticule: any) => {
            const pointPath = geoMapPath(graticule);

            if (pointPath) {
              return pointPath;
            } else {
              return "";
            }
          })
          .join(" ");

        setGraticulePath(path);
        resolve();
      });
    }
  }, [geoMapPath, hasGraticule]);

  return graticulePath;
}
