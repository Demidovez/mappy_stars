import React from "react";
import {G, Text} from "react-native-svg";
import {INameComponent} from "../../types/types";

export default React.memo(({names}: INameComponent) => {
  return (
    <G>
      {names.map((object, index) => (
        <Text key={index} x={object.x} y={object.y}>
          {object.name}
        </Text>
      ))}
    </G>
  );
});
