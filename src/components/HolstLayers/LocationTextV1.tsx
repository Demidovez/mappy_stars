import React, {useEffect, useState} from "react";
import {Text} from "react-native-svg";
import {useAppSelector} from "../../hooks";
import usePreviewSize from "../../hooks/usePreviewSize";
import {Selectors} from "../../redux/selectors/selectors";
import useFontInfo from "../../hooks/useFontInfo";
import useFullLocationText from "../../hooks/useFullLocationText";

interface IProps {
  onHeightText: (height: number) => void;
}

function LocationTextV1({onHeightText}: IProps) {
  // console.log("LocationTextV1");

  // Достаем инфу для текста
  const {
    colorLocation,
    sizeLocation,
    fontLocation,
    userTextLocation,
    isChangeTextLocation,
  } = useAppSelector(Selectors.getLocationTextInfo);

  const [resultText, setResultText] = useState("");

  const sizePreview = usePreviewSize();

  // Достоем технические параметры результирующего текста
  const {fontSize, fontName, lineHeight, heightText} = useFontInfo(
    sizePreview,
    sizeLocation,
    fontLocation,
    resultText,
  );

  // Определяем текст, построенный по параметра пользователя (дата, координаты и т.д.)
  const fullLocationText = useFullLocationText();

  // Определяем итоговый текст для вывода на холст
  useEffect(() => {
    if (isChangeTextLocation) {
      setResultText(userTextLocation);
    } else {
      fullLocationText && setResultText(fullLocationText);
    }
  }, [isChangeTextLocation, userTextLocation, fullLocationText]);

  // Передаем родителю инфу о высоте текстового блока
  useEffect(() => {
    onHeightText(heightText);
  }, [heightText]);

  return (
    <Text
      fill={colorLocation}
      stroke="none"
      textAnchor="middle"
      fontFamily={fontName}
      fontSize={fontSize}>
      {resultText?.split("\n").map((line, index) => (
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

export default React.memo(LocationTextV1);
