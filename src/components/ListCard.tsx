import React, {useMemo} from "react";
import {ScrollView} from "react-native";
import {IDataListItem, IListItem} from "../types/types";

interface IProps {
  data: IDataListItem[];
  value?: string;
  enabled?: boolean;
  item: React.FC<IListItem>;
  onPress: (data: any) => void;
}

function ListCard({data, item, value, onPress}: IProps) {
  // console.log("ListCard");

  const Item: React.FC<IListItem> = item;

  const items = useMemo(
    () =>
      data.map((item, index) => (
        <Item
          id={item.id}
          isFirstItem={index === 0}
          isActive={value === item.name}
          data={data}
          onPress={onPress}
          key={item.name}
        />
      )),
    [data, value, onPress, Item],
  );

  return (
    <ScrollView showsHorizontalScrollIndicator={false} horizontal>
      {items}
    </ScrollView>
  );
}

export default React.memo(ListCard);
