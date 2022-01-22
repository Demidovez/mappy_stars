import React, {useEffect, useMemo, useRef, useState} from "react";
import {StyleSheet, Animated} from "react-native";
import {IController, ISize} from "../types/types";
import ControllersTabContents from "./ControllersTabContents";
import ControllersTabLabels from "./ControllersTabLabels";

interface IControllersTab {
  controllers: IController[];
  layoutSize: ISize;
}

function ContollersTabs({controllers, layoutSize}: IControllersTab) {
  // console.log("ContollersTabs");

  const animOpacity = useRef(new Animated.Value(0)).current;
  const [activeKey, setActiveKey] = useState(controllers[0]?.key);

  // Изменяем значение прозрачности табов
  useEffect(() => {
    Animated.timing(animOpacity, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, []);

  // Стиль контейнера
  const styleContainer = useMemo(
    () => [styles.container, {height: layoutSize.height, opacity: animOpacity}],
    [layoutSize, animOpacity],
  );

  return (
    <Animated.View style={styleContainer}>
      <ControllersTabLabels
        controllers={controllers}
        onChoose={setActiveKey}
        activeKey={activeKey}
      />
      <ControllersTabContents controllers={controllers} activeKey={activeKey} />
    </Animated.View>
  );
}

export default React.memo(ContollersTabs);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
  },
});
