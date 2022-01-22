import {useEffect, useState} from "react";
import {useAppSelector} from ".";
import {ISize} from "../types/types";
import rnTextSize from "react-native-text-size";

interface IResult {
  fontSize: number;
  fontName: string;
  lineHeight: number;
  heightText: number;
}

export default function useFontInfo(
  sizePreview: ISize,
  userSizeFont: number,
  userFont: string,
  text: string,
): IResult {
  const [fontSize, setFontSize] = useState(0);
  const [fontName, setFontName] = useState("");
  const [lineHeight, setLineHeight] = useState(0);
  const [heightText, setHeightText] = useState(0);

  const loadedFonts = useAppSelector(state => state.data.loadedFonts);

  useEffect(() => {
    setFontSize(
      (Math.min(sizePreview.width, sizePreview.height) * 0.125 * userSizeFont) /
        100,
    );
  }, [sizePreview, userSizeFont]);

  // Если шрифта нет, то используем дефолтный
  useEffect(() => {
    loadedFonts.includes(userFont)
      ? setFontName(userFont)
      : setFontName("Nunito-Regular");
  }, [userFont, loadedFonts]);

  // Определяем высоту межстрочного интервала и высоту всего текстового блока
  useEffect(() => {
    text &&
      fontName &&
      fontSize &&
      rnTextSize
        .fontFromSpecs({fontFamily: fontName, fontSize: fontSize})
        .then(res => {
          setLineHeight(res.lineHeight);
          setHeightText(res.lineHeight * text.split("\n").length);
        });
  }, [text, fontName, fontSize]);

  return {fontSize, fontName, lineHeight, heightText};
}
