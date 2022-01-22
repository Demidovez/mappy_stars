import React, {useEffect, useMemo, useState} from "react";
import {Image, StyleSheet, View} from "react-native";
import {useAppSelector} from "../../hooks";
import {Selectors} from "../../redux/selectors/selectors";
import {IImage, ISize} from "../../types/types";

interface IProps {
  size: ISize;
}

function HolstImageV1({size}: IProps) {
  // console.log("HolstImageV1");

  const image = useAppSelector(Selectors.getHolstImage);
  const [oldImage, setOldImage] = useState<IImage>();

  // Кешируем изображение, для безшовного переключения
  useEffect(() => {
    setTimeout(() => {
      image && setOldImage(image);
    }, 100);
  }, [image]);

  const style = useMemo(
    () => [
      styles.container,
      {
        backgroundColor: "transparent",
        width: size.width,
        height: size.height,
      },
    ],
    [size],
  );

  return (
    <View>
      <View style={style}>
        {oldImage && size.width > 0 && (
          <Image
            source={oldImage.source}
            style={styles.image}
            fadeDuration={0}
          />
        )}
      </View>
      <View style={style}>
        {image && size.width > 0 && (
          <Image source={image.source} style={styles.image} fadeDuration={0} />
        )}
      </View>
    </View>
  );
}

export default React.memo(HolstImageV1);

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    justifyContent: "center",
    overflow: "hidden",
    position: "absolute",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
