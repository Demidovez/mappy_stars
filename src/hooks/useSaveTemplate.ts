import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useAppSelector} from ".";
import {Selectors} from "../redux/selectors/selectors";
import {EStatusDownload} from "../types/types";
import useCreateFileTemplate from "./useCreateFileTemplate";

import useDownload from "./useDownload";
import useShare from "./useShare";

export default function useSaveTemplate(status: EStatusDownload): boolean {
  const {formatFile, refTemplate} = useAppSelector(state => state.save);
  const holst = useAppSelector(Selectors.getHolst);

  // Определяем метод для скачивания готового шаблона на устройство
  const [isDownloaded, download] = useDownload(formatFile, status);

  // Определяем метод для Поделиться шаблоном в мессенджерах
  const [isShared, share] = useShare(formatFile, status);

  // Определяем метод для создания медиа файла из base64-строки изображения шаблона
  // из самого шаблона и фонового изображения (если предусмотренно шаблоном) в хорошем качестве
  const [fileTemplate, createFileTemplate] = useCreateFileTemplate(status);

  useEffect(() => {
    if (status !== EStatusDownload.IDLE && refTemplate?.current && holst) {
      (refTemplate.current as any).toDataURL(
        async (base64: string) => {
          createFileTemplate(base64); // Запускаем создание base64 строки изображения шаблона
        },
        {width: holst.size[0], height: holst.size[1]},
      );
    }
  }, [status, holst]);

  useEffect(() => {
    // После создания изображения начинаем процедуру сохранения (то что выбрал пользователь)
    if (fileTemplate && status !== EStatusDownload.IDLE) {
      if (status === EStatusDownload.DOWNLOADING) {
        download(fileTemplate);
      }

      if (status === EStatusDownload.SHARING) {
        share(fileTemplate);
      }
    }
  }, [fileTemplate, status]);

  return isDownloaded || isShared;
}
