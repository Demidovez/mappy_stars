import {useEffect, useState} from "react";
import planetsData from "../star-library/data/planets.json";
import {
  createEntry,
  getPlanets,
  planetSize,
  transformDeg,
} from "../star-library/scripts";
import {IEntry, IPlanet} from "../types/types";
import useInitialSvgMapWidth from "./useInitialSvgMapWidth";

// Создаем один большой Path-SVG-слой список планет
export default function usePlanetsPath(
  date: Date,
  sizeStars: number,
  geoMapPath: Function,
): IPlanet[] {
  const initialWidth = useInitialSvgMapWidth();
  const [planetsPath, setPlanetsPath] = useState<IPlanet[]>([]);

  useEffect(() => {
    if (geoMapPath) {
      new Promise((resolve: Function) => {
        const {planets, origin} = getPlanets(planetsData);

        const o = origin(date).spherical();
        const jPlanets: {color: string; planet: IEntry}[] = [];

        planets.map(({planet, color}) => {
          const p = planet(date).equatorial(o);

          p.ephemeris.pos = transformDeg(p.ephemeris.pos, undefined);

          jPlanets.push({color, planet: createEntry(p)});
        });

        const planetsList = jPlanets
          .map(({color, planet}) => {
            const pointPath = geoMapPath(planet);

            if (pointPath) {
              const r = planetSize(initialWidth, sizeStars, planet);

              const newPath = pointPath.replace(
                "0,4.5a4.5,4.5 0 1,1 0,-9a4.5,4.5 0 1,1 0,9z",
                `0,${r}a${r},${r} 0 1,1 0,-${r * 2}a${r},${r} 0 1,1 0,${
                  r * 2
                }z`,
              );

              return {
                path: newPath,
                color,
              };
            } else {
              return {
                path: "",
                color,
              };
            }
          })
          .filter(obj => obj.path != "");

        setPlanetsPath(planetsList);
        resolve();
      });
    }
  }, [sizeStars, geoMapPath]);

  return planetsPath;
}
