import {useEffect, useState} from "react";
import {useAppSelector} from ".";

export default function useShapeMapBorder(shapeName: string): number {
  const [ratio, setRatio] = useState(0);

  const shapes = useAppSelector(state => state.data.shapesBorderMap);

  useEffect(() => {
    const shape = shapes.find(({name}) => name === shapeName) || {ratio: 0};

    setRatio(shape.ratio);
  }, [shapes, shapeName]);

  return ratio;
}
