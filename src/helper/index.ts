import {starSize} from "../star-library/scripts";

// Форматирование долготы и широты в градусы
export function formatingCoordinates(coordinates: [number, number]) {
  const [latitude, longitude] = coordinates.map(coordinate => {
    var absolute = Math.abs(coordinate);
    var degrees = Math.floor(absolute);
    var minutesNotTruncated = (absolute - degrees) * 60;
    var minutes = Math.floor(minutesNotTruncated);
    var seconds = +((minutesNotTruncated - minutes) * 60).toFixed(2);

    return {degrees, minutes, seconds};
  });

  let result = "";

  if (coordinates[0] < 0) {
    result += "S ";
  } else {
    result += "N ";
  }

  result +=
    latitude.degrees + "°" + latitude.minutes + "'" + latitude.seconds + '", ';

  if (coordinates[1] < 0) {
    result += "W ";
  } else {
    result += "E ";
  }

  result +=
    longitude.degrees + "°" + longitude.minutes + "'" + longitude.seconds + '"';

  return result;
}

// Валидация цвета
export function isCorrectColor(color: string) {
  const regex = /^#([\da-f]{3}){1,2}$|^#([\da-f]{4}){1,2}$/i;

  return (
    color &&
    typeof color === "string" &&
    color.replace("#", "").length === 6 &&
    regex.test(color)
  );
}

// Делаем линии созвездий с отступами
export function offsetLinePath(
  start: string,
  end: string,
  magnitudeStart: number,
  magnitudeEnd: number,
  addSpace: number,
  initialWidth: number,
  sizeStars: number,
) {
  const startPoint = start.split(",").map((xy: string) => parseFloat(xy));
  const endPoint = end.split(",").map((xy: string) => parseFloat(xy));

  var dx = endPoint[0] - startPoint[0];
  var dy = endPoint[1] - startPoint[1];
  const widthLine = Math.sqrt(dx * dx + dy * dy);
  var angle = Math.atan2(dy, dx);

  const radiusStart = starSize(initialWidth, sizeStars, magnitudeStart);
  const radiusEnd = starSize(initialWidth, sizeStars, magnitudeEnd);

  var newStart =
    magnitudeStart > 0 && widthLine > 6 * addSpace
      ? [
          startPoint[0] + (radiusStart + addSpace * 1.5) * Math.cos(angle),
          startPoint[1] + (radiusStart + addSpace * 1.5) * Math.sin(angle),
        ]
      : startPoint;
  var newDestination =
    magnitudeEnd > 0 && widthLine > 6 * addSpace
      ? [
          endPoint[0] - (radiusEnd + addSpace * 1.5) * Math.cos(angle),
          endPoint[1] - (radiusEnd + addSpace * 1.5) * Math.sin(angle),
        ]
      : endPoint;

  return [newStart, newDestination];
}

// Достаем из 2го объекта те поля, которые описаны в 1м объекте
export function createObjByType<T>(state: T, fullObject: T): T {
  const keys = new Set(Object.keys(state));

  return Object.fromEntries(
    Object.entries(fullObject).filter(([key]) => keys.has(key)),
  ) as T;
}
