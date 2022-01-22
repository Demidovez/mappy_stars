import React, {useCallback, useEffect, useRef, useState} from "react";
import {
  Dimensions,
  StatusBar,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {IController} from "../types/types";

const WINDOW = Dimensions.get("window");
const SCREEN = Dimensions.get("screen");

interface IProps {
  controllers: IController[];
  activeKey: string;
}

function ControllersTabContents({controllers, activeKey}: IProps) {
  // console.log("ControllersTabContents");

  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    if (listRef.current) {
      const activeIndex = Math.max(
        controllers.findIndex(({key}) => key === activeKey),
        0,
      );

      listRef.current?.scrollToIndex({
        animated: false,
        index: activeIndex,
        viewPosition: 0,
      });
    }
  }, [activeKey, controllers, listRef]);

  const keyExtractor = useCallback(
    (item: IController) => "ctrl_" + item.key,
    [],
  );

  const renderItem = useCallback(
    ({item}: {item: IController}) => {
      const Сomponent =
        controllers.find(({key}) => key === item.key)?.component || View;

      return (
        <ScrollView
          style={styles.scrollview}
          bounces={false}
          overScrollMode={"never"}>
          <Сomponent />
        </ScrollView>
      );
    },
    [controllers],
  );

  const getItemLayout = useCallback(
    (_, index) => ({
      length: WINDOW.width,
      offset: WINDOW.width * index,
      index,
    }),
    [],
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={controllers}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        listKey="controllers"
        snapToInterval={WINDOW.width}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        initialNumToRender={1}
        removeClippedSubviews={false}
        getItemLayout={getItemLayout}
      />
    </View>
  );
}

export default React.memo(ControllersTabContents);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom:
      SCREEN.height - WINDOW.height - (StatusBar.currentHeight || 0),
  },
  scrollview: {
    marginTop: 3,
    width: WINDOW.width,
  },
});
