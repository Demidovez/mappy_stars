import React, {useEffect} from "react";
import {Text} from "react-native-svg";
import {useAppSelector} from "../../hooks";
import usePreviewSize from "../../hooks/usePreviewSize";
import {Selectors} from "../../redux/selectors/selectors";
import useFontInfo from "../../hooks/useFontInfo";

interface IProps {
  onHeightText: (height: number) => void;
}

function DescTextV1({onHeightText}: IProps) {
  // console.log("DescTextV1");

  // Достаем инфу для текста
  const {textDesc, colorDesc, sizeDesc, fontDesc} = useAppSelector(
    Selectors.getDescInfo,
  );

  const sizePreview = usePreviewSize();

  // Достоем технические параметры результирующего текста
  const {fontSize, fontName, lineHeight, heightText} = useFontInfo(
    sizePreview,
    sizeDesc,
    fontDesc,
    textDesc,
  );

  // Передаем родителю инфу о высоте текстового блока
  useEffect(() => {
    onHeightText(heightText);
  }, [heightText]);

  return (
    <Text
      fill={colorDesc}
      stroke="none"
      textAnchor="middle"
      fontFamily={fontName}
      fontSize={fontSize}>
      {textDesc.split("\n").map((line, index) => (
        <Text
          x={sizePreview.width / 2}
          y={lineHeight * (index + 1)}
          key={index}>
          {line}
        </Text>
      ))}
    </Text>
  );
}

export default React.memo(DescTextV1);
