import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Text, StyleSheet, View, Pressable, Image} from "react-native";
import {useAppSelector} from "../hooks";
import {Selectors} from "../redux/selectors/selectors";
import Style from "../style/Light";
import {IImage, IListItem} from "../types/types";

interface IProps {
  image: IImage;
  isFirstItem: boolean;
  isActive: boolean;
  onPress: (id: number) => void;
}

function ItemImage({image, isFirstItem, isActive, onPress}: IProps) {
  // console.log("ItemImage");

  const theme = useAppSelector(Selectors.getTheme);

  const handlePress = useCallback(() => onPress(image.id), [image]);

  const styleContainer = useMemo(
    () => [
      styles.item,
      {
        marginLeft: isFirstItem ? 18 : -5,
        borderColor: isActive ? theme.colors.primary : "transparent",
      },
    ],
    [isFirstItem, isActive, theme],
  );

  const styleContent = useMemo(
    () => [
      styles.inner_border,
      {
        borderColor: "transparent",
      },
    ],
    [isActive, theme],
  );

  return (
    <Pressable onPress={handlePress}>
      <View style={styleContainer}>
        <View style={styleContent}>
          {image && <Image source={image.source} style={styles.image} />}
        </View>
      </View>
    </Pressable>
  );
}

export default React.memo(ItemImage);

const styles = StyleSheet.create({
  item: {
    borderRadius: 9,
    marginRight: 18,
    marginBottom: 15,
    borderWidth: 3,
  },
  inner_border: {
    borderRadius: 6,
    // padding: 7,
    // borderWidth: 1,
    width: 106,
    height: 150,
  },
  image: {
    borderRadius: 6,
    width: "100%",
    height: "100%",
    // resizeMode: "contain",
  },
});
