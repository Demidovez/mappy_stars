import {useEffect, useState} from "react";
import {
  createEntry,
  getPlanetNames,
  transformDeg,
} from "../star-library/scripts";
import {IEntry, IName} from "../types/types";
import planetsData from "../star-library/data/planets.json";

// Создаем список названий планет
export default function usePlanetNames(
  date: Date,
  hasNames: boolean,
  geoMapPath: Function,
  language: string,
): IName[] {
  const [planetNames, setPlanetNames] = useState<IName[]>([]);

  useEffect(() => {
    if (geoMapPath && hasNames) {
      new Promise((resolve: Function) => {
        // Создаем список названий планет
        const {planets, origin} = getPlanetNames(planetsData, language);

        const o = origin(date).spherical();
        const jPlanets: {name: string; planet: IEntry}[] = [];

        planets.map(({planet, name}) => {
          const p = planet(date).equatorial(o);

          p.ephemeris.pos = transformDeg(p.ephemeris.pos, undefined);

          jPlanets.push({name, planet: createEntry(p)});
        });

        const planetsList = jPlanets
          .map(({name, planet}) => {
            const pointPath = geoMapPath(planet);

            if (name && pointPath) {
              const x = pointPath.split(",")[0].substr(1);
              const y = pointPath.split(",")[1].slice(0, -2);
              return {
                name,
                x,
                y,
              };
            } else {
              return {
                name: "",
                x: 0,
                y: 0,
              };
            }
          })
          .filter((obj: any) => obj.name != "");

        setPlanetNames(planetsList);
        resolve();
      });
    }
  }, [hasNames, geoMapPath, language]);

  return planetNames;
}
