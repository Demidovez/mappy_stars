import React from "react";
import {Path} from "react-native-svg";

export default React.memo(({path, dashes}: any) => {
  return <Path d={path} fill="none" strokeDasharray={dashes} />;
});
