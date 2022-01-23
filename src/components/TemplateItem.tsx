import React, {useCallback, useMemo} from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Text,
  View,
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
  Image,
} from 'react-native';
import Style from '../style/Light';
// import Image from "react-native-scalable-image";
import {useAppSelector} from '../hooks';
import {Routes} from '../navigation/routes';
import * as RootNavigation from '../navigation/rootNavigation';
import {RectButton} from 'react-native-gesture-handler';
import {Selectors} from '../redux/selectors/selectors';
import {ITemplate} from '../types/types';

const WIDTH = Dimensions.get('window').width;

interface IItemTemplate {
  item: ITemplate;
  isFirstItem: boolean;
}

function TemplateItem({item, isFirstItem}: IItemTemplate) {
  // console.log("ItemTemplate");

  const theme = useAppSelector(Selectors.getTheme);

  const handlePress = useCallback(() => {
    RootNavigation.navigate(Routes.Anothers, {
      screen: Routes.Template,
      params: {template: item},
    });
  }, [item]);

  const styleContainer = useMemo(
    () => [styles.container, {marginTop: isFirstItem ? 24 : 0}],
    [isFirstItem],
  );

  const styleButtonWrap = useMemo(
    (): StyleProp<ViewStyle> => ({
      backgroundColor: theme.colors.button,
      borderRadius: 8,
      overflow: 'hidden',
    }),
    [theme],
  );

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      {item && (
        <View style={styleContainer}>
          <View style={styles.leftSide}>
            <Image
              source={item.image as ImageSourcePropType}
              style={{width: WIDTH * 0.3, height: WIDTH * 0.3 * 1.23}}
            />
          </View>
          <View style={styles.rightSide}>
            <View>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.desc}>{item.about}</Text>
            </View>
            <View style={styleButtonWrap}>
              <RectButton
                onPress={handlePress}
                rippleColor={theme.colors.buttonRipple}>
                <Text style={styles.button}>Создать</Text>
              </RectButton>
            </View>
          </View>
        </View>
      )}
    </TouchableWithoutFeedback>
  );
}

export default React.memo(TemplateItem);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    flexDirection: 'row',
  },
  leftSide: {
    padding: 20,
  },
  rightSide: {
    flex: 1,
    padding: 20,
    paddingLeft: 0,
    justifyContent: 'space-between',
  },
  category: {
    ...Style.font,
    fontFamily: 'Nunito-SemiBold',
    fontSize: 19,
    paddingBottom: 3,
    marginTop: -5,
  },
  desc: {
    ...Style.font,
    fontSize: 14,
    paddingBottom: 10,
  },
  button: {
    ...Style.font,
    color: '#FFFFFF',
    fontSize: 15,
    textAlign: 'center',
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 8,
  },
});
