import {useEffect, useState} from 'react';
import {useAppSelector} from '.';
import {Selectors} from '../redux/selectors/selectors';
import {ISize} from '../types/types';
import useLayoutSize from './useLayoutSize';

// Пропорционально уменьшаем размеры превью, при изменение холста (если неполный размер шаблона)
export default function usePreviewSize(): ISize {
  const [viewSize, setViewSize] = useState<ISize>({width: 0, height: 0});

  const [layoutSize] = useLayoutSize();
  const holst = useAppSelector(Selectors.getHolst);

  useEffect(() => {
    if (holst && layoutSize) {
      const parentRation = layoutSize.width / layoutSize.height;
      const previewRation = holst.size[0] / holst.size[1];

      let previewWidth = 0;
      let previewHeight = 0;

      if (previewRation < 1 || (previewRation <= 1 && parentRation >= 1)) {
        previewWidth =
          (holst.size[0] / (holst.size[1] / layoutSize.height)) * 0.9;
        previewHeight = layoutSize.height * 0.9;
      } else {
        previewWidth = layoutSize.width * 0.8;
        previewHeight =
          (holst.size[1] / (holst.size[0] / layoutSize.width)) * 0.8;
      }

      setViewSize({
        width: previewWidth,
        height: previewHeight,
      });
    }
  }, [holst, layoutSize]);

  return viewSize;
}
