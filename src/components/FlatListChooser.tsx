import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  ViewStyle,
  StyleProp,
} from "react-native";
import Style from "../style/Light";
import Svg, {Defs, LinearGradient, Rect, Stop} from "react-native-svg";
import {IFlatListChooser} from "../types/types";

const WIDTH = Dimensions.get("window").width;

interface IProps {
  data: IFlatListChooser[];
  initIndex: number;
  heightItem: number;
  visibleItems: number;
  styleType: "left" | "center" | "right" | "one";
  onChoosed: (data: IFlatListChooser) => void;
}

function FlatListChooser({
  data,
  initIndex,
  heightItem,
  visibleItems,
  styleType,
  onChoosed,
}: IProps) {
  const listRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    if (currentIndex >= 0) {
      onChoosed(data[currentIndex]);
    }
  }, [currentIndex]);

  // Отпимизируем списко - высчитываем размеры
  const getItemLayout = useCallback(
    (_, index) => ({
      length: heightItem,
      offset: heightItem * index,
      index,
    }),
    [heightItem],
  );

  // Верстка элемента списка
  const renderItem = useCallback(
    ({item}) => (
      <View
        style={[
          styles.item,
          {
            height: heightItem,
          },
        ]}>
        <Text
          style={[styles.list_item_text, item.font && {fontFamily: item.font}]}>
          {item.label}
        </Text>
      </View>
    ),
    [heightItem],
  );

  // Подправляем за пользователем
  const onScrollEndDrag = useCallback(
    ({nativeEvent}) => {
      const {contentOffset} = nativeEvent;

      const failOffset = contentOffset.y % heightItem;

      const index = Math.round(contentOffset.y / heightItem);

      if (failOffset !== 0) {
        listRef.current?.scrollToIndex({
          index,
          animated: false,
        });
      }
    },
    [heightItem, listRef],
  );

  // Фиксируем текущее значения пикера
  const onMomentumScrollEnd = useCallback(
    ({nativeEvent}) => {
      const {contentOffset} = nativeEvent;

      const index = Math.round(contentOffset.y / heightItem);

      setCurrentIndex(index);
    },
    [heightItem],
  );

  const styleContainer = useMemo(
    () => [
      styles.container,
      {
        height: heightItem * visibleItems,
      },
    ],
    [heightItem, visibleItems],
  );

  const styleMarker = useMemo(
    () => [
      styles.marker,
      {height: heightItem, top: heightItem * Math.floor(visibleItems / 2)},
      styleType === "left" && {
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
      },
      styleType === "right" && {
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
      },
      styleType === "one" && {borderRadius: 6},
    ],
    [heightItem, visibleItems, styleType],
  );

  const ItemSeparatorComponent = useCallback(() => null, []);

  const listHeaderComponentStyle = useMemo(
    () => ({
      height: heightItem * Math.floor(visibleItems / 2),
    }),
    [heightItem, visibleItems],
  );

  const listFooterComponentStyle = useMemo(
    () => ({
      height: heightItem * Math.floor(visibleItems / 2),
    }),
    [heightItem, visibleItems],
  );

  const keyExtractor = useCallback((_, index) => index.toString(), []);

  const styleOpacityTop = useMemo(
    (): StyleProp<ViewStyle> => [
      {backgroundColor: "white", opacity: 0.2},
      {
        height: heightItem * ((visibleItems - 1) / 2),
        position: "absolute",
        top: 0,
        width: "100%",
      },
    ],
    [heightItem, visibleItems],
  );

  const styleOpacityBottom = useMemo(
    (): StyleProp<ViewStyle> => [
      {backgroundColor: "white", opacity: 0.2},
      {
        height: heightItem * ((visibleItems - 1) / 2),
        position: "absolute",
        top: heightItem * (1 + (visibleItems - 1) / 2),
        width: "100%",
      },
    ],
    [heightItem, visibleItems],
  );

  return (
    <View style={styleContainer}>
      <View style={styleMarker} />
      <FlatList
        ref={listRef}
        data={data}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<View />}
        ListFooterComponent={<View />}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListHeaderComponentStyle={listHeaderComponentStyle}
        ListFooterComponentStyle={listFooterComponentStyle}
        initialScrollIndex={Math.max(initIndex, 0)}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        snapToInterval={heightItem}
        decelerationRate={"fast"}
        onScrollEndDrag={onScrollEndDrag}
        onMomentumScrollEnd={onMomentumScrollEnd}
        keyExtractor={keyExtractor}
      />
      <Svg
        pointerEvents="none"
        height={heightItem * ((visibleItems - 1) / 2)}
        width={WIDTH}
        style={styles.top_gradient}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="100%">
            <Stop offset="0" stopColor="white" stopOpacity="1" />
            <Stop offset="100%" stopColor="white" stopOpacity="0" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
      </Svg>
      <Svg
        pointerEvents="none"
        height={heightItem * ((visibleItems - 1) / 2)}
        width={WIDTH}
        style={styles.bottom_gradient}>
        <Defs>
          <LinearGradient id="grad2" x1="0" y1="100%" x2="0" y2="0">
            <Stop offset="100%" stopColor="white" stopOpacity="0" />
            <Stop offset="0" stopColor="white" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad2)" />
      </Svg>
      <View pointerEvents="none" style={styles.wrapper_opacity}>
        <View style={styleOpacityTop} />
        <View style={styleOpacityBottom} />
      </View>
    </View>
  );
}

export default React.memo(FlatListChooser);

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  item: {
    justifyContent: "center",
  },
  list_item_text: {
    ...Style.font,
    color: "#4a5660",
    textAlign: "center",
    fontSize: 16,
    paddingHorizontal: 24,
  },
  marker: {
    backgroundColor: "#EDEEF1",
    position: "absolute",
    width: "100%",
  },
  wrapper_opacity: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
  },
  top_gradient: {
    position: "absolute",
    top: 0,
    width: "100%",
  },
  bottom_gradient: {
    position: "absolute",
    bottom: 0,
  },
});
