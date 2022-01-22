import {useEffect, useState} from "react";
import {has} from "../star-library/scripts";
import {IName} from "../types/types";
import constellationsNamesData from "../star-library/data/constellations.json";

// Создаем список названий созвездий
export default function useConstellationNames(
  hasNames: boolean,
  hasConstellations: boolean,
  geoMapPath: Function,
  language: string,
): IName[] {
  const [constellationNames, setConstellationNames] = useState<IName[]>([]);

  useEffect(() => {
    if (geoMapPath && hasNames && hasConstellations) {
      new Promise((resolve: Function) => {
        const names: IName[] = [];

        constellationsNamesData.forEach((constell: any) => {
          const feature = {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: constell.coords,
            },
          };

          const pointPath = geoMapPath(feature) as string;

          const name = has(constell.prop, language)
            ? constell.prop[language]
            : constell.prop.name;

          if (name && pointPath) {
            const x = parseFloat(pointPath.split(",")[0].substring(1));
            const y = parseFloat(pointPath.split(",")[1].slice(0, -2));

            names.push({
              name,
              x,
              y,
            });
          }
        });

        setConstellationNames(names);
        resolve();
      });
    }
  }, [hasNames, hasConstellations, geoMapPath, language]);

  return constellationNames;
}
