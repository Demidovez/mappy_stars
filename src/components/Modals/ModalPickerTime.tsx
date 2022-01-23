import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ModalWrapper from './ModalWrapper';
import FlatListChooser from '../FlatListChooser';
import {IFlatListChooser} from '../../types/types';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {setDateAction} from '../../redux/actions/creators/controllerEventActionCreators';
import {Selectors} from '../../redux/selectors/selectors';

const generateListData = (length: number): IFlatListChooser[] =>
  Array(length)
    .fill(0)
    .map((_, index) => ({
      id: index,
      value: index,
      label: index < 10 ? '0' + index : '' + index,
    }));

function ModalPickerTime() {
  // console.log("ModalPickerTime");

  const dispatch = useAppDispatch();
  const date = useAppSelector(Selectors.getDate);

  const navigation = useNavigation();

  const [hoursData, setHoursData] = useState<IFlatListChooser[]>();
  const [minutesData, setMinutesData] = useState<IFlatListChooser[]>();

  const [hourSelect, setHourSelect] = useState<number>();
  const [minuteSelect, setMinuteSelect] = useState<number>();

  // Достаем текущие часы и минуты
  useEffect(() => {
    const dateInfo = moment(date);

    setHourSelect(dateInfo.hour());
    setMinuteSelect(dateInfo.minute());
  }, [date]);

  // Определяем часы в сутках от 0 до 23 и минуты от 0 до 59
  useEffect(() => {
    const hours = generateListData(24);
    const minutes = generateListData(60);

    setMinutesData(minutes);
    setHoursData(hours);
  }, []);

  // Определяем время события и закрываем окно
  const onSumbit = useCallback(() => {
    if (hourSelect != undefined && minuteSelect != undefined) {
      const newDate = moment(date)
        .hour(hourSelect)
        .minute(minuteSelect)
        .toDate();

      dispatch(setDateAction(newDate.getTime()));
    }
    navigation.goBack();
  }, [hourSelect, minuteSelect, date]);

  // Запоминаем последний выбор часов
  const onChooseHour = useCallback((data: IFlatListChooser) => {
    setHourSelect(data.value as number);
  }, []);

  // Запоминаем последний выбор минут
  const onChooseMinute = useCallback((data: IFlatListChooser) => {
    setMinuteSelect(data.value as number);
  }, []);

  // Текущий индекс часов
  const initIndexHour = useMemo(() => {
    const index = hoursData?.find(({value}) => value === hourSelect)?.id;

    return index != undefined ? index : -1;
  }, [hoursData]);

  // Текущий индекс минут
  const initIndexMinute = useMemo(() => {
    const index = minutesData?.find(({value}) => value === minuteSelect)?.id;

    return index != undefined ? index : -1;
  }, [minutesData]);

  return (
    <ModalWrapper onSumbit={onSumbit} delay={400}>
      <View style={styles.container}>
        <View style={styles.lists}>
          {minutesData && hoursData && (
            <>
              <FlatListChooser
                data={hoursData}
                initIndex={initIndexHour}
                heightItem={48}
                visibleItems={5}
                styleType="one"
                onChoosed={onChooseHour}
              />
              <Text style={styles.separator}>:</Text>
              <FlatListChooser
                data={minutesData}
                initIndex={initIndexMinute}
                heightItem={48}
                visibleItems={5}
                styleType="one"
                onChoosed={onChooseMinute}
              />
            </>
          )}
        </View>
      </View>
    </ModalWrapper>
  );
}

export default React.memo(ModalPickerTime);

const styles = StyleSheet.create({
  container: {},
  lists: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
  },
  separator: {
    marginHorizontal: 10,
    color: '#4a5660',
  },
});
