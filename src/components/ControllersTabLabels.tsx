import React, {useCallback, useEffect, useRef, useState} from "react";
import {FlatList, View} from "react-native";
import {IController} from "../types/types";
import ControllersTabLabelItem from "./ControllersTabLabelItem";

interface IProps {
  controllers: IController[];
  onChoose: (key: string) => void;
  activeKey: string;
}

function ControllersTabLabels({controllers, onChoose, activeKey}: IProps) {
  // console.log("ControllersTabLabels");

  const listRef = useRef<FlatList>(null);

  const renderItem = useCallback(
    ({item}: {item: IController}) => (
      <ControllersTabLabelItem
        item={item}
        activeKey={activeKey}
        onPress={onChoose}
      />
    ),
    [activeKey],
  );

  const keyExtractor = useCallback(item => "label_" + item.key, []);

  // Центруем выбранный элемент
  useEffect(() => {
    const activeIndex = controllers.findIndex(({key}) => key === activeKey);
    let moveToIndex = activeIndex;
    let viewPosition = 0.5;

    if (activeIndex <= 2) {
      moveToIndex = 0;
      viewPosition = 0.5;
    } else if (activeIndex >= controllers.length - 2) {
      moveToIndex = controllers.length - 1;
      viewPosition = 0;
    }

    listRef.current?.scrollToIndex({
      animated: true,
      index: activeIndex,
      viewPosition: viewPosition,
    });
  }, [activeKey, listRef, controllers]);

  return (
    <View>
      <FlatList
        ref={listRef}
        data={controllers}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

export default React.memo(ControllersTabLabels);
