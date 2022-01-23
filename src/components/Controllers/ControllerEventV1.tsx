import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import InputWithLabel from '../InputWithLabel';
import {Routes} from '../../navigation/routes';
import {useAppSelector} from '../../hooks';
import moment from 'moment';
import 'moment/min/locales';
import {Selectors} from '../../redux/selectors/selectors';

function ControllerEventV1() {
  // console.log("ControllerEventV1");

  const {date, location, latitude, longtitude, langApplication} =
    useAppSelector(Selectors.getEventInfo);

  const [currentDate, setCurrentDate] = useState<string>('');
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const currentDate = moment(date);

    const dateStr = currentDate.format('LL');
    const timeStr = currentDate.format('LT');

    setCurrentDate(dateStr);
    setCurrentTime(timeStr);
  }, [date, langApplication]);

  return (
    <View style={styles.container}>
      <View style={styles.horizontal}>
        <InputWithLabel
          label={'Дата'}
          text={currentDate}
          modalName={Routes.ModalPickerDate}
          style={styles.flex_4}
        />
        <View style={styles.horizontal_divider} />
        <InputWithLabel
          label={'Время'}
          text={currentTime}
          modalName={Routes.ModalPickerTime}
          style={styles.flex_2}
        />
      </View>
      <InputWithLabel
        label={'Место, где произошло событие'}
        text={location}
        modalName={Routes.ModalPickerLocation}
      />
      <View style={styles.horizontal}>
        <InputWithLabel
          label={'Широта'}
          text={latitude.toString()}
          modalName={Routes.ModalPickerLatitude}
          style={styles.horizontal_item}
        />
        <View style={styles.horizontal_divider} />
        <InputWithLabel
          label={'Долгота'}
          text={longtitude.toString()}
          modalName={Routes.ModalPickerLongitude}
          style={styles.horizontal_item}
        />
      </View>
    </View>
  );
}

export default React.memo(ControllerEventV1);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 15,
    paddingLeft: 18,
    paddingRight: 18,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  horizontal_item: {
    flex: 1,
  },
  flex_4: {
    flex: 4,
  },
  flex_2: {
    flex: 2,
  },
  horizontal_divider: {
    width: 15,
  },
});
