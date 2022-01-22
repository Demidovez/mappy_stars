import React, {useCallback, useEffect, useMemo, useState} from "react";
import {StyleSheet, View} from "react-native";
import {Selectors} from "../../redux/selectors/selectors";
import ModalWrapper from "./ModalWrapper";
import FlatListChooser from "../FlatListChooser";
import {IFlatListChooser} from "../../types/types";
import {useNavigation} from "@react-navigation/native";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {setDateAction} from "../../redux/actions/creators/controllerEventActionCreators";
import moment from "moment";

const DEFAULT_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const IN_LEAP_DAYS = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function ModalPickerDate() {
  // console.log("ModalPickerDate");

  const dispatch = useAppDispatch();

  const navigation = useNavigation();

  const months = useAppSelector(Selectors.getMonths);

  const date = useAppSelector(state => state.event.date);

  const [countDays, setCountDays] = useState<number[]>([]);

  const [daysData, setDaysData] = useState<IFlatListChooser[]>();
  const [monthsData, setMonthsData] = useState<IFlatListChooser[]>();
  const [yearsData, setYearsData] = useState<IFlatListChooser[]>();

  const [daySelect, setDaySelect] = useState<number>();
  const [monthSelect, setMonthSelect] = useState<number>();
  const [yearSelect, setYearSelect] = useState<number>();

  // Достаем текущие день, месяц и год
  useEffect(() => {
    const currDate = moment(date);

    setDaySelect(currDate.date());
    setMonthSelect(currDate.month() + 1);
    setYearSelect(currDate.year());
  }, [date]);

  // Определяем дни месяца от 1 до 30 (31, 29, 28)
  useEffect(() => {
    if (monthSelect && countDays.length) {
      const days = Array(countDays[monthSelect - 1])
        .fill(0)
        .map((_, index) => ({
          id: index,
          value: index + 1,
          label: index + 1,
        }));

      days.map(({value}) => value).toString() !==
        daysData?.map(({value}) => value).toString() && setDaysData(days);
    }
  }, [countDays, monthSelect]);

  // Определяем названия месяцев от янв. до дек.
  useEffect(() => {
    if (months) {
      const monthList = months.map((month, index) => ({
        id: index,
        value: index + 1,
        label: month,
      }));

      setMonthsData(monthList);
    }
  }, [months]);

  // Определяем года от 1901 до 2101
  useEffect(() => {
    const years = Array(2101 - 1901)
      .fill(0)
      .map((_, index) => ({
        id: index,
        value: 1901 + index,
        label: 1901 + index,
      }));

    setYearsData(years);
  }, []);

  // Определяем количество дней в месяце (с учетом высокосного года)
  useEffect(() => {
    if (yearSelect) {
      const isLeapYear =
        yearSelect % 4 == 0 && (yearSelect % 100 != 0 || yearSelect % 400 == 0);

      const newCountDays = isLeapYear ? IN_LEAP_DAYS : DEFAULT_DAYS;

      newCountDays.toString() !== countDays.toString() &&
        setCountDays(newCountDays);
    }
  }, [yearSelect]);

  // Определяем время события и закрываем окно
  const onSumbit = () => {
    if (daySelect && monthSelect && yearSelect) {
      const newDate = moment(date)
        .date(daySelect)
        .month(monthSelect - 1)
        .year(yearSelect)
        .toDate();

      dispatch(setDateAction(newDate));
    }

    navigation.goBack();
  };

  // Запоминаем последний выбор дня
  const onChooseDay = useCallback((data: IFlatListChooser) => {
    setDaySelect(data.value as number);
  }, []);

  // Запоминаем последний выбор месяца
  const onChooseMonth = useCallback((data: IFlatListChooser) => {
    setMonthSelect(data.value as number);
  }, []);

  // Запоминаем последний выбор года
  const onChooseYear = useCallback((data: IFlatListChooser) => {
    setYearSelect(data.value as number);
  }, []);

  // Текущий индекс дня
  const initIndexDay = useMemo(() => {
    const index = daysData?.find(({value}) => value === daySelect)?.id;

    return index != undefined ? index : -1;
  }, [daysData]);

  // Текущий индекс месяца
  const initIndexMonth = useMemo(() => {
    const index = monthsData?.find(({value}) => value === monthSelect)?.id;

    return index != undefined ? index : -1;
  }, [monthsData]);

  // Текущий индекс года
  const initIndexYear = useMemo(() => {
    const index = yearsData?.find(({value}) => value === yearSelect)?.id;

    return index != undefined ? index : -1;
  }, [yearsData]);

  return (
    <ModalWrapper delay={500} onSumbit={onSumbit}>
      <View style={styles.container}>
        <View style={styles.lists}>
          {daysData && monthsData && yearsData && (
            <>
              <FlatListChooser
                data={daysData}
                initIndex={initIndexDay}
                heightItem={48}
                visibleItems={5}
                styleType="left"
                onChoosed={onChooseDay}
              />
              <FlatListChooser
                data={monthsData}
                initIndex={initIndexMonth}
                heightItem={48}
                visibleItems={5}
                styleType="center"
                onChoosed={onChooseMonth}
              />
              <FlatListChooser
                data={yearsData}
                initIndex={initIndexYear}
                heightItem={48}
                visibleItems={5}
                styleType="right"
                onChoosed={onChooseYear}
              />
            </>
          )}
        </View>
      </View>
    </ModalWrapper>
  );
}

export default React.memo(ModalPickerDate);

const styles = StyleSheet.create({
  container: {},
  lists: {
    flexDirection: "row",
    marginTop: 30,
  },
});
