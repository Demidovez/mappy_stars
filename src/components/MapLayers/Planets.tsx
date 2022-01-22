import React from "react";
import {G, Path} from "react-native-svg";

export default React.memo(({paths}: any) => {
  return (
    <G>
      {paths.map(({path, color}: any) => (
        <Path d={path} stroke="none" fill={color} key={color} />
      ))}
    </G>
  );
});
