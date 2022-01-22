import React, {useEffect, useMemo, useRef} from "react";
import Svg, {G, SvgProps} from "react-native-svg";
import {useAppDispatch, useAppSelector} from "../../hooks";
import usePreviewSize from "../../hooks/usePreviewSize";
import {setRefTemplateAction} from "../../redux/actions/creators/controllerSaveActionCreators";
import {Selectors} from "../../redux/selectors/selectors";

interface IProps {
  children: React.ReactNode;
}

function TemplateWrapper({children}: IProps) {
  // console.log("TemplateWrapper");
  const dispatch = useAppDispatch();

  // Определяем ref на SVG превью шаблона
  const refTemplate = useRef<React.Component<SvgProps, any, any>>(null);
  const holst = useAppSelector(Selectors.getHolst);

  // После инициализации ref шлем его в стор
  useEffect(() => {
    refTemplate.current && dispatch(setRefTemplateAction(refTemplate));
  }, [refTemplate]);

  const preview = usePreviewSize();

  // Определяем оригинальную ширину и высоту шаблона и насклько увеличить превью
  const original = useMemo(
    () => ({
      scale: holst && preview.width ? holst.size[0] / preview.width : 1,
      width: holst && holst.size[0] > 0 ? holst.size[0] : preview.width,
      height: holst && holst.size[1] > 0 ? holst.size[1] : preview.height,
    }),
    [holst, holst, preview],
  );

  return (
    <Svg
      height={preview.height}
      width={preview.width}
      viewBox={`0 0 ${original.width} ${original.height}`}
      ref={refTemplate}>
      <G scale={original.scale}>{children}</G>
    </Svg>
  );
}

export default React.memo(TemplateWrapper);
