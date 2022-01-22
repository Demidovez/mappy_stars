import React from "react";
import {G, Path} from "react-native-svg";
import {IStarPathData} from "../../types/types";

interface IProps {
  data: IStarPathData;
}

export default React.memo(({data}: IProps) => {
  const {layer1, layer2, layer3} = data;

  return (
    <G>
      <Path d={layer1} stroke="none" opacity={1} />
      <Path d={layer2} stroke="none" opacity={0.8} />
      <Path d={layer3} stroke="none" opacity={0.6} />
    </G>
  );
});
