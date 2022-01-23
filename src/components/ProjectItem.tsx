import React, {useCallback, useLayoutEffect, useMemo} from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import moment from 'moment';
import 'moment/min/locales';
import Style from '../style/Light';
import {useAppSelector} from '../hooks';
import {Routes} from '../navigation/routes';
import * as RootNavigation from '../navigation/rootNavigation';
import {Selectors} from '../redux/selectors/selectors';
import {ITemplate} from '../types/types';

interface IProjectItem {
  item: ITemplate;
  isFirstItem: boolean;
}

function ProjectItem({item, isFirstItem}: IProjectItem) {
  // console.log("ProjectItem");

  const language = useAppSelector(Selectors.getLanguage);

  useLayoutEffect(() => {
    moment.locale(language);
  }, [language]);

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

  return (
    <TouchableWithoutFeedback onPress={handlePress} delayPressIn={100}>
      <View style={styleContainer}>
        <View style={styles.leftSide}>
          {/* TODO: Низкое качество изображения */}
          <Image
            source={{uri: 'data:image/jpeg;base64,' + item.image}}
            style={{
              height: item.imageSize[1] * 0.3,
              width: item.imageSize[0] * 0.3,
            }}
          />
        </View>
        <View style={styles.rightSide}>
          <View>
            <Text style={styles.title}>
              {item.title ? item.title : item.category}
            </Text>
            <Text style={styles.text}>
              {item.desc || item.textDesc || item.about}
            </Text>
            <Text style={styles.location}>
              {moment(item.date).format('LLL')}
            </Text>
            <Text style={styles.location}>{item.location}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default React.memo(ProjectItem);

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
  title: {
    ...Style.font,
    fontFamily: 'Nunito-SemiBold',
    fontSize: 17,
    paddingBottom: 7,
    marginTop: -5,
  },
  text: {
    ...Style.font,
    fontSize: 14,
    paddingBottom: 7,
  },
  location: {
    ...Style.font,
    fontSize: 12,
    opacity: 0.7,
  },
});
