import {useEffect, useState} from 'react';
import {useAppSelector} from '.';
import moment from 'moment';
import {formatingCoordinates} from '../helper';
import {Selectors} from '../redux/selectors/selectors';

// Определяем полный текст локации
export default function useFullLocationText(): string {
  const {
    hasDateLocation,
    hasTimeLocation,
    hasLocation,
    hasCoordinates,
    isChangeTextLocation,
  } = useAppSelector(state => state.location);

  const {date, location, latitude, longtitude} = useAppSelector(
    state => state.event,
  );

  const [resultText, setResultText] = useState('');

  useEffect(() => {
    if (!isChangeTextLocation) {
      const lines = [];
      const dateFull = [];

      hasDateLocation && dateFull.push(moment(date).format('LL'));
      hasTimeLocation && dateFull.push(moment(date).format('LT'));

      (hasDateLocation || hasTimeLocation) && lines.push(dateFull.join(', '));
      hasLocation && lines.push(location);
      hasCoordinates &&
        lines.push(formatingCoordinates([latitude, longtitude]));

      setResultText(lines.join('\n'));
    }
  }, [
    date,
    location,
    latitude,
    longtitude,
    hasDateLocation,
    hasTimeLocation,
    hasLocation,
    hasCoordinates,
    isChangeTextLocation,
  ]);

  return resultText;
}
