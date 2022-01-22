import React from "react";
import {G, Path} from "react-native-svg";
import {IMilkyData} from "../../types/types";

interface IProps {
  data: IMilkyData[];
  color: string;
}

// Отображаем млечный путь (5 слоев).
// Каждый слой состоит из слоя пути и слоя фона.
// Путем вычесления площади каждого слоя определяем что есть что.
export default React.memo(({data, color}: IProps) => {
  return (
    <G>
      {data.map(
        ({milkyway, background, isCorrect}: IMilkyData, index: number) => (
          <G key={index}>
            <Path
              d={milkyway}
              stroke="none"
              fill={isCorrect ? color : "none"}
              opacity={isCorrect ? 0.14 : 0}
            />
            <Path
              d={background}
              stroke="none"
              fill={isCorrect ? "none" : color}
              opacity={isCorrect ? 0 : 0.14}
            />
          </G>
        ),
      )}
    </G>
  );
});
