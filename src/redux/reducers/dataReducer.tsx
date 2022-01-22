import {
  IAction,
  IController,
  IHolst,
  IImage,
  ILangName,
  IMonths,
  IShape,
  ITemplate,
} from "../../types/types";
import Actions from "../actions/types/dataActionTypes";

interface IDataState {
  templates: ITemplate[];
  controllers: IController[];
  holsts: IHolst[];
  colors: string[];
  shapesBorderMap: IShape[];
  shapesSeparator: IShape[];
  loadedFonts: string[];
  langNames: ILangName[];
  months: IMonths[];
  holstImages: IImage[];
  templateComponent: string;
  category: string;
  about: string;
  isTemplate: boolean;
}

const initialState: IDataState = {
  templates: [],
  controllers: [],
  holsts: [],
  colors: [],
  shapesBorderMap: [],
  shapesSeparator: [],
  loadedFonts: [],
  templateComponent: "",
  category: "",
  about: "",
  isTemplate: false,
  langNames: [
    {
      lang: "en",
      label: "Английский",
    },
    {
      lang: "ar",
      label: "Арабский",
    },
    {
      lang: "el",
      label: "Греческий",
    },
    {
      lang: "he",
      label: "Иврит",
    },
    {
      lang: "es",
      label: "Испанский",
    },
    {
      lang: "it",
      label: "Итальянский",
    },
    {
      lang: "zh",
      label: "Китайский",
    },
    {
      lang: "ko",
      label: "Корейский",
    },
    {
      lang: "la",
      label: "Латинский",
    },
    {
      lang: "de",
      label: "Немецкий",
    },
    {
      lang: "name",
      label: "Официальное название",
    },
    {
      lang: "fa",
      label: "Персидский",
    },
    {
      lang: "ru",
      label: "Русский",
    },
    {
      lang: "tr",
      label: "Турецкий",
    },
    {
      lang: "fi",
      label: "Финский",
    },
    {
      lang: "fr",
      label: "Французский",
    },
    {
      lang: "hi",
      label: "Хинди",
    },
    {
      lang: "cz",
      label: "Чешский",
    },
    {
      lang: "ee",
      label: "Эстонский",
    },
    {
      lang: "ja",
      label: "Японский",
    },
  ],
  months: [
    {
      lang: "ru",
      data: [
        "январь",
        "февраль",
        "март",
        "апрель",
        "май",
        "июнь",
        "июль",
        "август",
        "сентябрь",
        "октябрь",
        "ноябрь",
        "декабрь",
      ],
    },
  ],
  holstImages: [],
};

const dataReducer = (state = initialState, action: IAction): IDataState => {
  switch (action.type) {
    case Actions.SET_TEMPLATES:
      return {
        ...state,
        templates: action.payload.data,
      };
    case Actions.SET_CONTROLLERS:
      return {
        ...state,
        controllers: action.payload.data,
      };
    case Actions.SET_HOLSTS:
      return {
        ...state,
        holsts: action.payload.data,
      };
    case Actions.SET_COLORS:
      return {
        ...state,
        colors: action.payload.data,
      };
    case Actions.SET_SHAPES_BORDER_MAP:
      return {
        ...state,
        shapesBorderMap: action.payload.data,
      };
    case Actions.SET_SHAPES_SEPARATOR:
      return {
        ...state,
        shapesSeparator: action.payload.data,
      };
    case Actions.SET_LOADED_FONTS:
      return {
        ...state,
        loadedFonts: action.payload.data,
      };
    case Actions.SET_HOLST_IMAGES:
      return {
        ...state,
        holstImages: action.payload.data,
      };
    case Actions.SET_ADDITINAL_DATA:
      return {
        ...state,
        templateComponent: action.payload.data.templateComponent,
        category: action.payload.data.category,
        about: action.payload.data.about,
        isTemplate: action.payload.data.isTemplate || false,
      };
    default:
      return state;
  }
};

export default dataReducer;
