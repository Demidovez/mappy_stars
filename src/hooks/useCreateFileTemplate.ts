import {useCallback, useEffect, useState} from "react";
import ReactNativeBlobUtil from "react-native-blob-util";
import RNImageTools from "react-native-image-tools-wm";
import {useAppSelector} from ".";
import {Selectors} from "../redux/selectors/selectors";
import {EStatusDownload} from "../types/types";

const DIRS = ReactNativeBlobUtil.fs.dirs;

type TResult = [string, (path: string) => void];

export default function useCreateFileTemplate(
  status: EStatusDownload,
): TResult {
  // Путь к итоговому файлу изображения шаблона
  const [pathToFile, setPathToFile] = useState("");

  const holstImage = useAppSelector(Selectors.getHolstImage);
  const holst = useAppSelector(Selectors.getHolst);
  const server = useAppSelector(state => state.settings.serverStatic);

  useEffect(() => {
    // Если статус сохранения изменился на ожидание, то очищаем pathToFile
    if (status === EStatusDownload.IDLE) {
      setPathToFile("");
    }
  }, [status]);

  // Создаем файл скомбинированного изображения
  const createFileFromBase64 = useCallback(
    (base64: string, originalImagePath?: string) => {
      const templateFilePath = `${DIRS.CacheDir}/_${new Date().getTime()}.png`;

      try {
        ReactNativeBlobUtil.fs
          .createFile(templateFilePath, base64, "base64")
          .then(() => {
            if (originalImagePath) {
              // TODO: Создает лишний файл на устройстве
              RNImageTools.merge([
                "file://" + originalImagePath,
                "file://" + templateFilePath,
              ]).then(({uri}: any) => {
                ReactNativeBlobUtil.fs.unlink("file://" + templateFilePath);

                setPathToFile(uri);
              });
            } else {
              setPathToFile("file://" + templateFilePath);
            }
          });
      } catch (e) {
        console.log(e);
      }
    },
    [],
  );

  // Скачиваем оригинальное изображение и затем формируем файл изобаржения,
  // который представляет собой фоновое изображение (если предусмотрено) и сформированный шаблон
  // @base64 - изображение созданое из SVG превью шаблона
  const createFileTemplate = useCallback(
    (base64: string) => {
      // Если изображение фона предусмотрено, то скачиваем (выгружаем) и комбинируем с шаблоном
      // Иначе передаем только base64 шаблона
      if (holstImage) {
        const pathOriginal = `holst_images/${holst?.name}/${holstImage?.name}`;
        const linkToOriginal = server + pathOriginal;
        const linkToCachedFile =
          DIRS.DocumentDir + "/" + pathOriginal.split("/").join("_");

        try {
          // Проверяем есть ли уже на устройстве ранее скаченное оригинальное изображение
          ReactNativeBlobUtil.fs
            .exists("file:///" + linkToCachedFile)
            .then((isExist: boolean) => {
              if (isExist) {
                // Если есть - создаем скомбинированое изображение
                createFileFromBase64(base64, linkToCachedFile);
              } else {
                // Если нет - сначала скачиваем, потом создаем скомбинированое изображение
                ReactNativeBlobUtil.config({
                  path: linkToCachedFile,
                })
                  .fetch("GET", linkToOriginal)
                  .then(res => createFileFromBase64(base64, res.path()));
              }
            });
        } catch (e) {
          console.log(e);
        }
      } else {
        createFileFromBase64(base64);
      }
    },
    [createFileFromBase64, holstImage, holst],
  );

  return [pathToFile, createFileTemplate];
}
