import React from "react";
import {Rect} from "react-native-svg";
import {useAppSelector} from "../../hooks";

function HolstV1() {
  // console.log("HolstV1");

  const color = useAppSelector(state => state.canvas.holstColor);

  return <Rect x="0" y="0" width="100%" height="100%" fill={color} />;
}

export default React.memo(HolstV1);
