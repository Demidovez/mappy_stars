import {ImageSourcePropType} from "react-native";
import TemplateClassicV1 from "../components/Templates/TemplateClassicV1";
import TemplateHalfV1 from "../components/Templates/TemplateHalfV1";
import TemplateImageV1 from "../components/Templates/TemplateImageV1";
import {TCanvasState} from "../redux/reducers/controllerCanvasReducer";
import {TDescState} from "../redux/reducers/controllerDescReducer";
import {TEventState} from "../redux/reducers/controllerEventReducer";
import {TLocationState} from "../redux/reducers/controllerLocationReducer";
import {TMapState} from "../redux/reducers/controllerMapReducer";
import {TSeparatorState} from "../redux/reducers/controllerSeparatorReducer";
import {TStarsState} from "../redux/reducers/controllerStarsReducer";

export interface ITemplate
  extends TCanvasState,
    TDescState,
    TEventState,
    TLocationState,
    TMapState,
    TSeparatorState,
    TStarsState {
  id: number;
  templateComponent: ETemplateList;
  isTemplate: boolean;
  category: string;
  title: string | null;
  about: string;
  desc: string;
  image: ImageSourcePropType | string;
  controllers: string[];
  imageSize: [number, number];
}

export interface IController {
  id: number;
  key: string;
  title: string;
  icon: string;
  component: React.FC;
}

export interface IAction {
  type: string;
  payload: any | null;
}

// TODO: Перенести локально
export interface IProps {
  children: React.ReactNode;
}

export interface IHolst {
  id: number;
  name: string;
  subtitle: string;
  size: [number, number];
}

export interface IShape {
  id: number;
  name: string;
  icon: string;
  ratio: number;
}

export interface IListItem {
  id: number;
  data?: any[];
  isActive: boolean;
  isFirstItem: boolean;
  onPress: (data: any) => void;
}

export interface IDataListItem {
  id: number;
  name: string;
}

export enum EStatusDownload {
  SHARING = 1,
  DOWNLOADING = 2,
  IDLE = 3,
}

export interface ISize {
  width: number;
  height: number;
}

export interface ILoadFont {
  id: number;
  name: string;
  link: string;
}

export interface IFont {
  id: number;
  name: string;
}

export interface IMonths {
  lang: string;
  data: string[];
}

export interface IFlatListChooser {
  id: number;
  value: string | number;
  label: string | number;
  font?: string;
}

export interface ILangName {
  lang: string;
  label: string;
}

export interface IVariant {
  id: number;
  location: string;
  latitude: number;
  longitude: number;
}

export interface IVariantSearch {
  search: string;
  lang: string;
}

export enum EStatus {
  Loading = 1,
  Done = 2,
  None = 3,
  Error = 4,
}

export enum EShape {
  None = "none_shape",
  Circle = "circle_shape",
  Line = "line_shape",
  Maskarad = "maskarad",
  Curved = "curved_shape",
  Star = "star_shape",
  Stars = "stars_shape",
  Heart = "heart_shape",
  Hearts = "hearts_shape",
  Greek = "greek_border_shape",
  CompassDots = "compass_dots_shape",
  CompassBold = "compass_bold_shape",
  CompassTyni = "compass_tiny_shape",
  Brush = "brush_shape",
  Music = "music_shape",
}

export interface IEntry {
  type: string;
  id: any;
  properties: {};
  geometry: {};
}

export interface IPlanet {
  color: string;
  path: string;
}

export interface IName {
  name: string;
  x: number;
  y: number;
}

export interface INameComponent {
  names: IName[];
}

export interface IMilkyData {
  milkyway: string;
  background: string;
  isCorrect: boolean;
}

export interface IStarPathData {
  layer1: string;
  layer3: string;
  layer2: string;
}

export type TStar = [any, number, number, number];

export type TStarLine = [number, number, number];

export interface IImage {
  id: number;
  source: ImageSourcePropType;
  name: string;
}

export enum EToast {
  Success = "success",
  Error = "error",
}

export enum EFormat {
  JPG = "JPG",
  PDF = "PDF",
}

export enum ETemplateList {
  TemplateClassicV1 = "TemplateClassicV1",
  TemplateHalfV1 = "TemplateHalfV1",
  TemplateImageV1 = "TemplateImageV1",
}

export const TemplateComponents = {
  TemplateClassicV1: TemplateClassicV1,
  TemplateHalfV1: TemplateHalfV1,
  TemplateImageV1: TemplateImageV1,
};
