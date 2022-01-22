import {useEffect, useState} from "react";
import {IName, TStar} from "../types/types";
import stars6Data from "../star-library/data/stars.6.json";
import {starPropername} from "../star-library/scripts";

// Список названий звезд
export default function useStarNames(
  hasNames: boolean,
  geoMapPath: Function,
  language: string,
): IName[] {
  const [starNames, setStarNames] = useState<IName[]>([]);

  useEffect(() => {
    if (geoMapPath && hasNames) {
      new Promise((resolve: Function) => {
        const names: IName[] = [];

        stars6Data.forEach(([id, mag, lat, lon]: TStar) => {
          if (mag <= 3) {
            const feature = {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [lat, lon],
              },
            };

            const pointPath = geoMapPath(feature) as string;

            const name = starPropername(id, language);

            if (name && pointPath) {
              const x = parseFloat(pointPath.split(",")[0].substring(1));
              const y = parseFloat(pointPath.split(",")[1].slice(0, -2));

              names.push({
                name,
                x,
                y,
              });
            }
          }
        });

        setStarNames(names);
        resolve();
      });
    }
  }, [hasNames, geoMapPath, language]);

  return starNames;
}
