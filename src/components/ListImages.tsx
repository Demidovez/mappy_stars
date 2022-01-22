import React, {useMemo} from "react";
import {ScrollView} from "react-native";
import {IImage} from "../types/types";
import ItemImage from "./ItemImage";

interface IProps {
  data: IImage[];
  imageId: number | null;
  enabled?: boolean;
  onPress: (data: any) => void;
}

function ListImages({data, imageId, onPress}: IProps) {
  // console.log("ListImages");

  const items = useMemo(
    () =>
      data.map((item, index) => (
        <ItemImage
          image={item}
          isFirstItem={index === 0}
          isActive={imageId === item.id}
          onPress={onPress}
          key={item.id}
        />
      )),
    [data, imageId, onPress],
  );

  return (
    <ScrollView showsHorizontalScrollIndicator={false} horizontal>
      {items}
    </ScrollView>
  );
}

export default React.memo(ListImages);
