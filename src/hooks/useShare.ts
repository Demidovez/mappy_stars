import {useCallback, useEffect, useState} from "react";
import Share from "react-native-share";
import {EFormat, EStatusDownload} from "../types/types";
import ReactNativeBlobUtil from "react-native-blob-util";

type TResult = [boolean, (base64: string) => void];

export default function useShare(
  formatFile: EFormat,
  status: EStatusDownload,
): TResult {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Если текущий статус Ожидание, то готовность меняем на false
    if (status === EStatusDownload.IDLE) {
      setIsDone(false);
    }
  }, [status]);

  const share = useCallback(
    async (fileTemplate: string) => {
      // Создаем имя файла и его mime параметр для "Поделиться"
      const fileName =
        formatFile == EFormat.PDF ? "MappyStars" : "MappyStars.pdf";
      const fileMime =
        formatFile == EFormat.JPG ? "image/jpeg" : "application/pdf";

      try {
        // Пытаемся поделиться
        await Share.open({
          type: fileMime,
          filename: fileName,
          title: "Mappy Stars",
          message:
            "Mappy Stars - Создай свою звездную карту!\n\n" +
            "http://play.google.com/store/apps/details?id=com.adobe.reader",
          subject: "Mappy Stars " + formatFile,
          url: fileTemplate,
        })
          .then(res => {
            console.log(res);
          })
          .then(() => ReactNativeBlobUtil.fs.unlink("file://" + fileTemplate));
      } catch (err) {
        console.log(err);
      }

      // Передаем наверх сигнал о завершении
      setIsDone(true);
    },
    [formatFile],
  );

  return [isDone, share];
}
