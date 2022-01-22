import {useCallback, useEffect, useState} from 'react';
import moment from 'moment';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {Platform} from 'react-native';
import useShowToast from './useShowToast';
import {EFormat, EStatusDownload} from '../types/types';
// import RNImageToPdf from "react-native-image-to-pdf";

type TResult = [boolean, (base64: string) => void];

export default function useDownload(
  formatFile: EFormat,
  status: EStatusDownload,
): TResult {
  const [isDone, setIsDone] = useState(false);
  const showToast = useShowToast();

  useEffect(() => {
    // Если текущий статус Ожидание, то готовность меняем на false
    if (status === EStatusDownload.IDLE) {
      setIsDone(false);
    }
  }, [status]);

  const download = useCallback(
    async (fileTemplate: string) => {
      const date = moment().format('MM_DD_YYYY_HH_mm_ss');

      const fileName = `MappyStars_${date}.${formatFile.toLocaleLowerCase()}`;

      const fileMime =
        formatFile == EFormat.JPG ? 'image/jpeg' : 'application/pdf';
      const newPath = `/storage/emulated/0/Download/${fileName}`;

      try {
        let defineTempFile = null;

        if (formatFile == EFormat.PDF) {
          // const pdf = await RNImageToPdf.createPDFbyImages({
          //   imagePaths: [fileTemplate.replace("file://", "")],
          //   name: fileName,
          // });

          const pdf = {
            filePath: fileTemplate,
          };

          defineTempFile = ReactNativeBlobUtil.fs
            .cp(pdf.filePath, newPath)
            .then(() => pdf.filePath);
        } else {
          defineTempFile = ReactNativeBlobUtil.fs
            .cp(fileTemplate, newPath)
            .then(() => fileTemplate);
        }

        await defineTempFile.then((tempFile: string) => {
          ReactNativeBlobUtil.fs.unlink(tempFile);

          if (Platform.OS === 'ios') {
            ReactNativeBlobUtil.ios.previewDocument(newPath);
          } else {
            ReactNativeBlobUtil.fs
              .scanFile([{path: newPath, mime: fileMime}])
              .then(() =>
                ReactNativeBlobUtil.android
                  .addCompleteDownload({
                    title: fileName,
                    description: 'Готово',
                    mime: fileMime,
                    path: newPath,
                    showNotification: true,
                  })
                  .then(() => {
                    setIsDone(true);

                    showToast({
                      type: 'success',
                      text1: 'Скачано!',
                      text2: 'В папку Загрузки. Открыть?',
                      onPress: () =>
                        ReactNativeBlobUtil.android.actionViewIntent(
                          newPath,
                          fileMime,
                        ),
                    });
                  }),
              );
          }
        });
      } catch (err) {
        console.log(err);
        setIsDone(true);
      }
    },
    [formatFile],
  );

  return [isDone, download];
}
