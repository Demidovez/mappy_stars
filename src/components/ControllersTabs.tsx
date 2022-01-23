import React, {useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, Animated} from 'react-native';
import useLayoutSize from '../hooks/useLayoutSize';
import {IController} from '../types/types';
import ControllersTabContents from './ControllersTabContents';
import ControllersTabLabels from './ControllersTabLabels';

interface IControllersTab {
  controllers: IController[];
}

function ContollersTabs({controllers}: IControllersTab) {
  // console.log("ContollersTabs");

  const animOpacity = useRef(new Animated.Value(0)).current;
  const [activeKey, setActiveKey] = useState(controllers[0]?.key);

  const [_, layoutSizeTabs] = useLayoutSize();

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
    () => [
      styles.container,
      {height: layoutSizeTabs.height, opacity: animOpacity},
    ],
    [layoutSizeTabs, animOpacity],
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
    backgroundColor: '#FFFFFF',
  },
});
