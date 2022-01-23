import {useEffect, useState} from 'react';
import mwData from '../star-library/data/mw.json';
import svgPathBbox, {BoundingBox} from 'svg-path-bbox';
import {getMwbackground} from '../star-library/scripts';
import {IMilkyData} from '../types/types';

// Создаем SVG-слои млечного пути
export default function useMilkyWaysPath(geoMapPath: Function): IMilkyData[] {
  const [data, setData] = useState<IMilkyData[]>([]);

  useEffect(() => {
    if (geoMapPath) {
      new Promise((resolve: Function) => {
        const data: IMilkyData[] = [];

        mwData.forEach((milkyWay: any) => {
          const feature = {
            type: 'Feature',
            geometry: {
              type: 'MultiPolygon',
              coordinates: milkyWay,
            },
          };

          const wayPath: string = geoMapPath(feature);

          if (wayPath) {
            const bgPathData = getMwbackground(feature);
            const bgPath: string = geoMapPath(bgPathData);

            const boundMW: BoundingBox = svgPathBbox(wayPath);
            const boundBack: BoundingBox = svgPathBbox(bgPath);

            const arreaMW =
              (boundMW[2] - boundMW[0]) * (boundMW[3] - boundMW[1]);
            const arreaBack =
              (boundBack[2] - boundBack[0]) * (boundBack[3] - boundBack[1]);

            // TODO: Не работает, например при дате 23 сентября 2024 в 11:06, проверял в эмуляторе

            const isCorrect = arreaMW <= arreaBack;

            data.push({
              milkyway: wayPath,
              background: bgPath,
              isCorrect,
            });
          }
        });

        setData(data);
        resolve();
      });
    }
  }, [geoMapPath]);

  return data;
}
