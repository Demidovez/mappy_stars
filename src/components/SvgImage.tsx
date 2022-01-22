import React, {useMemo} from "react";
import {SvgProps} from "react-native-svg";
import SvgEventV1 from "../../assets/icons/event_v1.svg";
import SvgCanvasV1 from "../../assets/icons/canvas_v1.svg";
import SvgMapV1 from "../../assets/icons/map_v1.svg";
import SvgStarsV1 from "../../assets/icons/stars_v1.svg";
import SvgDescV1 from "../../assets/icons/desc_v1.svg";
import SvgSeparatorV1 from "../../assets/icons/separator_v1.svg";
import SvgLocationV1 from "../../assets/icons/location_v1.svg";
import SvgSaveV1 from "../../assets/icons/save_v1.svg";
import SvgNotFound from "../../assets/icons/not_found.svg";
import SvgNoneShape from "../../assets/icons/none_shape.svg";
import SvgCircleShape from "../../assets/icons/circle_shape.svg";
import SvgCircleIconShape from "../../assets/icons/circle_shape_icon.svg";
import SvgCompassShape from "../../assets/icons/compass_shape.svg";
import SvgLineShape from "../../assets/icons/line_shape.svg";
import SvgLineIconShape from "../../assets/icons/line_shape_icon.svg";
import SvgCurvedShape from "../../assets/icons/curved_shape.svg";
import SvgStarShape from "../../assets/icons/star_shape.svg";
import SvgStarsShape from "../../assets/icons/stars_shape.svg";
import SvgHeartShape from "../../assets/icons/heart_shape.svg";
import SvgHeartsShape from "../../assets/icons/hearts_shape.svg";
import SvgCloseShape from "../../assets/icons/close.svg";
import SvgMaskaradShape from "../../assets/icons/maskarad.svg";
import SvgGreekBorderIconShape from "../../assets/icons/greek_border_shape_icon.svg";
import SvgGreekBorderShape from "../../assets/icons/greek_border_shape.svg";
import SvgCompassDotsBorderShape from "../../assets/icons/compass_dots_shape.svg";
import SvgCompassBoldBorderShape from "../../assets/icons/compass_bold_shape.svg";
import SvgCompassTinyBorderShape from "../../assets/icons/compass_tiny_shape.svg";
import SvgBrushBorderMapShape from "../../assets/icons/brush_shape.svg";
import SvgMusicBorderMapShape from "../../assets/icons/music_shape.svg";
import {useAppSelector} from "../hooks";
import {Selectors} from "../redux/selectors/selectors";
import {StyleProp, ViewStyle} from "react-native";

interface ISvgImage {
  width: number | string;
  height: number | string;
  fill?: string;
  name: string | undefined;
  style?: StyleProp<ViewStyle>;
}

const SvgList = {
  event_v1: SvgEventV1,
  canvas_v1: SvgCanvasV1,
  map_v1: SvgMapV1,
  stars_v1: SvgStarsV1,
  desc_v1: SvgDescV1,
  separator_v1: SvgSeparatorV1,
  location_v1: SvgLocationV1,
  save_v1: SvgSaveV1,
  none_shape: SvgNoneShape,
  circle_shape: SvgCircleShape,
  circle_shape_icon: SvgCircleIconShape,
  compass_shape: SvgCompassShape,
  line_shape: SvgLineShape,
  line_shape_icon: SvgLineIconShape,
  curved_shape: SvgCurvedShape,
  star_shape: SvgStarShape,
  stars_shape: SvgStarsShape,
  heart_shape: SvgHeartShape,
  hearts_shape: SvgHeartsShape,
  close: SvgCloseShape,
  maskarad: SvgMaskaradShape,
  greek_border_shape_icon: SvgGreekBorderIconShape,
  greek_border_shape: SvgGreekBorderShape,
  compass_dots_shape: SvgCompassDotsBorderShape,
  compass_bold_shape: SvgCompassBoldBorderShape,
  compass_tiny_shape: SvgCompassTinyBorderShape,
  brush_shape: SvgBrushBorderMapShape,
  music_shape: SvgMusicBorderMapShape,
};

function SvgImage({name, fill, ...props}: ISvgImage) {
  // console.log("SvgImage", name, fill, props);

  const theme = useAppSelector(Selectors.getTheme);

  const Image: React.FC<SvgProps> = useMemo(() => {
    let Component = SvgNotFound;

    Object.entries(SvgList).some(([nameSvg, component]) => {
      if (nameSvg === name) {
        Component = component;

        return true;
      }
    });

    return Component;
  }, [name]);

  return <Image {...props} fill={fill || theme.colors.primary} />;
}

export default React.memo(SvgImage);
