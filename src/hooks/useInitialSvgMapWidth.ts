import {useState} from "react";
import {Dimensions} from "react-native";

export default function useInitialSvgMapWidth(): number {
  const [initialWidth] = useState(Dimensions.get("screen").width / 4);

  return initialWidth;
}
