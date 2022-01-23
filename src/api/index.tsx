import ControllerCanvasV1 from '../components/Controllers/ControllerCanvasV1';
import ControllerEventV1 from '../components/Controllers/ControllerEventV1';
import ControllerMapV1 from '../components/Controllers/ControllerMapV1';
import ControllerStarsV1 from '../components/Controllers/ControllerStarsV1';
import ControllerDescV1 from '../components/Controllers/ControllerDescV1';
import ControllerSeparatorV1 from '../components/Controllers/ControllerSeparatorV1';
import ControllerLocationV1 from '../components/Controllers/ControllerLocationV1';
import ControllerSaveV1 from '../components/Controllers/ControllerSaveV1';
import {
  EShape,
  EStatus,
  ETemplateList,
  IController,
  IFont,
  IHolst,
  IImage,
  ILoadFont,
  IShape,
  ITemplate,
  IVariant,
  IVariantSearch,
} from '../types/types';
// import {loadFontFromFile} from 'react-native-dynamic-fonts';
import axios from 'axios';
import ControllerCanvasV2 from '../components/Controllers/ControllerCanvasV2';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {getProjectsFromDB} from '../database';

export const fetchTemplates = async (options?: any) => {
  try {
    const data: ITemplate[] = [
      {
        id: 1,
        isTemplate: true,
        templateComponent: ETemplateList.TemplateClassicV1,
        category: 'Классика',
        title: null,
        about: 'Возможность изменять размеры карты',
        desc: '',
        imageSize: [0, 0],
        image: require('../../assets/images/classic_v1.jpeg'),
        controllers: [
          'event_v1',
          'canvas_v1',
          'map_v1',
          'stars_v1',
          'desc_v1',
          'separator_v1',
          'location_v1',
          'save_v1',
        ],
        latitude: 55.755825,
        longtitude: 37.617298,
        location: 'Москва, Россия',
        variants: [],
        status: EStatus.None,
        date: new Date().getTime(),
        textDesc: 'День, когда сошлись\nвсе звезды',
        fontDesc: 'Comfortaa',
        colorDesc: '#000000',
        sizeDesc: 40,
        holstId: 1,
        holstImageId: null,
        holstColor: '#FFFFFF',
        hasHolstBorder: true,
        indentHolstBorder: 20,
        widthHolstBorder: 10,
        colorHolstBorder: '#000000',
        fontLocation: 'Comfortaa',
        colorLocation: '#000000',
        sizeLocation: 20,
        hasDateLocation: true,
        hasTimeLocation: true,
        hasLocation: true,
        hasCoordinates: true,
        isChangeTextLocation: false,
        userTextLocation: '',
        sizeMap: 60,
        mapColor: '#000000',
        shapeBorderMapName: EShape.Circle,
        hasBorderMap: true,
        colorBorderMap: '#000000',
        marginTopMap: 15,
        shapeSeparatorId: 3,
        sizeSeparator: 50,
        hasSeparator: true,
        colorSeparator: '#000000',
        hasGraticule: false,
        colorGraticule: '#FFFFFF',
        hasDashedGraticule: false,
        opacityGraticule: 55,
        opacityStars: 100,
        widthGraticule: 25,
        hasMilkyWay: true,
        colorStars: '#FFFFFF',
        sizeStars: 40,
        hasConstellations: true,
        colorConstellations: '#FFFFFF',
        opacityConstellations: 100,
        widthConstellations: 25,
        hasNames: false, // TODO: Не работает
        colorNames: '#FFFFFF',
        sizeNames: 23,
        langNames: 'ru',
      },
      {
        id: 2,
        isTemplate: true,
        templateComponent: ETemplateList.TemplateHalfV1,
        category: 'Полусфера',
        title: null,
        about: 'Изменение высоты полусферы',
        desc: '',
        imageSize: [0, 0],
        image: require('../../assets/images/half_v1.jpeg'),
        controllers: [
          'event_v1',
          'canvas_v1',
          'map_v1',
          'stars_v1',
          'desc_v1',
          'separator_v1',
          'location_v1',
          'save_v1',
        ],
        latitude: 55.755825,
        longtitude: 37.617298,
        location: 'Москва, Россия',
        variants: [],
        status: EStatus.None,
        date: new Date().getTime(),
        textDesc: 'День, когда сошлись\nвсе звезды',
        fontDesc: 'Comfortaa',
        colorDesc: '#000000',
        sizeDesc: 40,
        holstId: 1,
        holstImageId: 0,
        holstColor: '#FFFFFF',
        hasHolstBorder: false,
        indentHolstBorder: 20,
        widthHolstBorder: 10,
        colorHolstBorder: '#000000',
        fontLocation: 'Comfortaa',
        colorLocation: '#000000',
        sizeLocation: 15,
        hasDateLocation: true,
        hasTimeLocation: true,
        hasLocation: true,
        hasCoordinates: true,
        isChangeTextLocation: false,
        userTextLocation: '',
        sizeMap: 0,
        mapColor: '#000000',
        shapeBorderMapName: EShape.Circle,
        hasBorderMap: true,
        colorBorderMap: '#000000',
        marginTopMap: 80,
        shapeSeparatorId: 3,
        sizeSeparator: 50,
        hasSeparator: false,
        colorSeparator: '#000000',
        hasGraticule: true,
        colorGraticule: '#FFFFFF',
        hasDashedGraticule: false,
        opacityGraticule: 55,
        opacityStars: 100,
        widthGraticule: 25,
        hasMilkyWay: true,
        colorStars: '#FFFFFF',
        sizeStars: 40,
        hasConstellations: true,
        colorConstellations: '#FFFFFF',
        opacityConstellations: 100,
        widthConstellations: 25,
        hasNames: true,
        colorNames: '#FFFFFF',
        sizeNames: 23,
        langNames: 'ru',
      },
      {
        id: 3,
        isTemplate: true,
        templateComponent: ETemplateList.TemplateClassicV1, //name: "polaroid_v1",
        category: 'Полароид',
        title: null,
        about: 'Возможность изменять отступ карты и ее высоту',
        desc: '',
        imageSize: [0, 0],
        image: require('../../assets/images/polaroid_v1.jpeg'),
        controllers: [
          'event_v1',
          'canvas_v1',
          'map_v1',
          'stars_v1',
          'desc_v1',
          'separator_v1',
          'location_v1',
          'save_v1',
        ],
        latitude: 55.755825,
        longtitude: 37.617298,
        location: 'Москва, Россия',
        variants: [],
        status: EStatus.None,
        date: new Date().getTime(),
        textDesc: 'День, когда сошлись\nвсе звезды',
        fontDesc: 'Comfortaa',
        colorDesc: '#000000',
        sizeDesc: 40,
        holstId: 1,
        holstImageId: 0,
        holstColor: '#FFFFFF',
        hasHolstBorder: true,
        indentHolstBorder: 20,
        widthHolstBorder: 10,
        colorHolstBorder: '#000000',
        fontLocation: 'Comfortaa',
        colorLocation: '#000000',
        sizeLocation: 20,
        hasDateLocation: true,
        hasTimeLocation: true,
        hasLocation: true,
        hasCoordinates: true,
        isChangeTextLocation: false,
        userTextLocation: '',
        sizeMap: 50,
        mapColor: '#000000',
        shapeBorderMapName: EShape.Circle,
        hasBorderMap: true,
        colorBorderMap: '#000000',
        marginTopMap: 15,
        shapeSeparatorId: 3,
        sizeSeparator: 50,
        hasSeparator: true,
        colorSeparator: '#000000',
        hasGraticule: true,
        colorGraticule: '#FFFFFF',
        hasDashedGraticule: false,
        opacityGraticule: 55,
        opacityStars: 100,
        widthGraticule: 25,
        hasMilkyWay: true,
        colorStars: '#FFFFFF',
        sizeStars: 40,
        hasConstellations: true,
        colorConstellations: '#FFFFFF',
        opacityConstellations: 100,
        widthConstellations: 25,
        hasNames: true,
        colorNames: '#FFFFFF',
        sizeNames: 23,
        langNames: 'ru',
      },
      {
        id: 4,
        isTemplate: true,
        templateComponent: ETemplateList.TemplateClassicV1, //name: "full_v1",
        category: 'Полная',
        title: null,
        about: 'Различный выбор цвета и размера блока с текстом',
        desc: '',
        imageSize: [0, 0],
        image: require('../../assets/images/full_v1.jpeg'),
        controllers: [
          'event_v1',
          'canvas_v1',
          'map_v1',
          'stars_v1',
          'desc_v1',
          'separator_v1',
          'location_v1',
          'save_v1',
        ],
        latitude: 55.755825,
        longtitude: 37.617298,
        location: 'Москва, Россия',
        variants: [],
        status: EStatus.None,
        date: new Date().getTime(),
        textDesc: 'День, когда сошлись\nвсе звезды',
        fontDesc: 'Comfortaa',
        colorDesc: '#000000',
        sizeDesc: 40,
        holstId: 1,
        holstImageId: 0,
        holstColor: '#FFFFFF',
        hasHolstBorder: true,
        indentHolstBorder: 20,
        widthHolstBorder: 10,
        colorHolstBorder: '#000000',
        fontLocation: 'Comfortaa',
        colorLocation: '#000000',
        sizeLocation: 20,
        hasDateLocation: true,
        hasTimeLocation: true,
        hasLocation: true,
        hasCoordinates: true,
        isChangeTextLocation: false,
        userTextLocation: '',
        sizeMap: 50,
        mapColor: '#000000',
        shapeBorderMapName: EShape.Circle,
        hasBorderMap: true,
        colorBorderMap: '#000000',
        marginTopMap: 15,
        shapeSeparatorId: 3,
        sizeSeparator: 50,
        hasSeparator: true,
        colorSeparator: '#000000',
        hasGraticule: true,
        colorGraticule: '#FFFFFF',
        hasDashedGraticule: false,
        opacityGraticule: 55,
        opacityStars: 100,
        widthGraticule: 25,
        hasMilkyWay: true,
        colorStars: '#FFFFFF',
        sizeStars: 40,
        hasConstellations: true,
        colorConstellations: '#FFFFFF',
        opacityConstellations: 100,
        widthConstellations: 25,
        hasNames: true,
        colorNames: '#FFFFFF',
        sizeNames: 23,
        langNames: 'ru',
      },
      {
        id: 5,
        isTemplate: true,
        templateComponent: ETemplateList.TemplateImageV1, //name: "understars_v1",
        category: 'Под звездами',
        title: null,
        about: 'Выбор изображений для фона из списка',
        desc: '',
        imageSize: [0, 0],
        image: require('../../assets/images/understars_v1.jpeg'),
        controllers: [
          'event_v1',
          'canvas_v2',
          'map_v1',
          'stars_v1',
          'desc_v1',
          'separator_v1',
          'location_v1',
          'save_v1',
        ],
        latitude: 55.755825,
        longtitude: 37.617298,
        location: 'Москва, Россия',
        variants: [],
        status: EStatus.None,
        date: new Date().getTime(),
        textDesc: 'День, когда сошлись\nвсе звезды',
        fontDesc: 'Comfortaa',
        colorDesc: '#FFFFFF',
        sizeDesc: 40,
        holstId: 1,
        holstImageId: 0,
        holstColor: '#FFaaaa',
        hasHolstBorder: true,
        indentHolstBorder: 20,
        widthHolstBorder: 10,
        colorHolstBorder: '#FFFFFF',
        fontLocation: 'Comfortaa',
        colorLocation: '#FFFFFF',
        sizeLocation: 20,
        hasDateLocation: true,
        hasTimeLocation: true,
        hasLocation: true,
        hasCoordinates: true,
        isChangeTextLocation: false,
        userTextLocation: '',
        sizeMap: 40,
        mapColor: '#000000',
        shapeBorderMapName: EShape.Circle,
        hasBorderMap: true,
        colorBorderMap: '#FFFFFF',
        marginTopMap: 20,
        shapeSeparatorId: 3,
        sizeSeparator: 50,
        hasSeparator: true,
        colorSeparator: '#FFFFFF',
        hasGraticule: true,
        colorGraticule: '#FFFFFF',
        hasDashedGraticule: false,
        opacityGraticule: 55,
        opacityStars: 100,
        widthGraticule: 25,
        hasMilkyWay: true,
        colorStars: '#FFFFFF',
        sizeStars: 40,
        hasConstellations: true,
        colorConstellations: '#FFFFFF',
        opacityConstellations: 100,
        widthConstellations: 25,
        hasNames: true,
        colorNames: '#FFFFFF',
        sizeNames: 23,
        langNames: 'ru',
      },
    ];

    return {data};
  } catch (e: any) {
    throw new Error(e);
  }
};

export const fetchProjects = async (options?: any) => {
  try {
    const data = getProjectsFromDB();

    return {data};
  } catch (e: any) {
    throw new Error(e);
  }
};

export const fetchControllers = async (options?: any) => {
  try {
    const data: IController[] = [
      {
        id: 10,
        key: 'event_v1',
        title: 'Событие',
        icon: 'event_v1',
        component: ControllerEventV1,
      },
      {
        id: 20,
        key: 'canvas_v1',
        title: 'Холст',
        icon: 'canvas_v1',
        component: ControllerCanvasV1,
      },
      {
        id: 21,
        key: 'canvas_v2',
        title: 'Холст',
        icon: 'canvas_v1',
        component: ControllerCanvasV2,
      },
      {
        id: 30,
        key: 'map_v1',
        title: 'Карта',
        icon: 'map_v1',
        component: ControllerMapV1,
      },
      {
        id: 40,
        key: 'stars_v1',
        title: 'Звезды',
        icon: 'stars_v1',
        component: ControllerStarsV1,
      },
      {
        id: 50,
        key: 'desc_v1',
        title: 'Текст',
        icon: 'desc_v1',
        component: ControllerDescV1,
      },
      {
        id: 60,
        key: 'separator_v1',
        title: 'Разделитель',
        icon: 'separator_v1',
        component: ControllerSeparatorV1,
      },
      {
        id: 70,
        key: 'location_v1',
        title: 'Локация',
        icon: 'location_v1',
        component: ControllerLocationV1,
      },
      {
        id: 80,
        key: 'save_v1',
        title: 'Сохранение',
        icon: 'save_v1',
        component: ControllerSaveV1,
      },
    ];

    return {data};
  } catch (e: any) {
    throw new Error(e);
  }
};

export const fetchHolsts = async (options?: any) => {
  try {
    const data: IHolst[] = [
      {
        id: 1,
        name: 'A4',
        subtitle: '210 x 297 мм',
        size: [2480, 3508],
      },
      {
        id: 2,
        name: 'A3',
        subtitle: '297 x 420 мм',
        size: [3508, 4961],
      },
      {
        id: 3,
        name: 'A2',
        subtitle: '420 x 594 мм',
        size: [4961, 7016],
      },
      {
        id: 4,
        name: 'A1',
        subtitle: '594 x 841 мм',
        size: [7016, 9933],
      },
    ];

    return {data};
  } catch (e: any) {
    throw new Error(e);
  }
};

export const fetchColors = async (options?: any) => {
  try {
    const data: string[] = [
      '#000000',
      '#FFFFFF',
      '#1ABC9C',
      '#16A085',
      '#2ECC71',
      '#27AE60',
      '#3498DB',
      '#2980B9',
      '#9B59B6',
      '#8E44AD',
      '#34495E',
      '#2C3E50',
      '#F1C40F',
      '#F39C12',
      '#E67E22',
      '#D35400',
      '#E74C3C',
      '#C0392B',
      '#BDC3C7',
      '#95A5A6',
      '#7F8C8D',
    ];

    return {data};
  } catch (e: any) {
    throw new Error(e);
  }
};

export const fetchShapesBorderMap = async (options?: any) => {
  try {
    const data: IShape[] = [
      {
        id: 1,
        name: EShape.None,
        icon: 'none_shape',
        ratio: 0,
      },
      {
        id: 2,
        name: EShape.Circle,
        icon: 'circle_shape_icon',
        ratio: 0.05,
      },
      {
        id: 3,
        name: EShape.Greek,
        icon: 'greek_border_shape_icon',
        ratio: 0.12,
      },
      {
        id: 4,
        name: EShape.CompassDots,
        icon: 'greek_border_shape_icon',
        ratio: 0.22,
      },
      {
        id: 5,
        name: EShape.CompassBold,
        icon: 'greek_border_shape_icon',
        ratio: 0.23,
      },
      {
        id: 6,
        name: EShape.CompassTyni,
        icon: 'greek_border_shape_icon',
        ratio: 0.25,
      },
      {
        id: 7,
        name: EShape.Brush,
        icon: 'greek_border_shape_icon',
        ratio: 0.15,
      },
      {
        id: 8,
        name: EShape.Music,
        icon: 'greek_border_shape_icon',
        ratio: 0.21,
      },
    ];

    return {data};
  } catch (e: any) {
    throw new Error(e);
  }
};

export const fetchShapesSeparator = async (options?: any) => {
  try {
    const data: IShape[] = [
      {
        id: 1,
        name: EShape.None,
        icon: 'none_shape',
        ratio: 1,
      },
      {
        id: 2,
        name: EShape.Line,
        icon: 'line_shape_icon',
        ratio: 0.15,
      },
      {
        id: 3,
        name: EShape.Maskarad,
        icon: 'maskarad',
        ratio: 0.5,
      },
      {
        id: 4,
        name: EShape.Curved,
        icon: 'curved_shape',
        ratio: 0.5,
      },
      {
        id: 5,
        name: EShape.Star,
        icon: 'star_shape',
        ratio: 1,
      },
      {
        id: 6,
        name: EShape.Stars,
        icon: 'stars_shape',
        ratio: 1,
      },
      {
        id: 7,
        name: EShape.Heart,
        icon: 'heart_shape',
        ratio: 1,
      },
      {
        id: 8,
        name: EShape.Hearts,
        icon: 'hearts_shape',
        ratio: 1,
      },
    ];

    return {data};
  } catch (e: any) {
    throw new Error(e);
  }
};

export const fetchFonts = async (options?: any) => {
  try {
    // Список шрифтов
    const data: ILoadFont[] = [
      {
        id: 1,
        name: 'Lobster',
        link: 'https://github.com/google/fonts/blob/main/ofl/lobster/Lobster-Regular.ttf?raw=true',
      },
      {
        id: 2,
        name: 'Underdog',
        link: 'https://github.com/google/fonts/blob/main/ofl/underdog/Underdog-Regular.ttf?raw=true',
      },
      {
        id: 3,
        name: 'Comfortaa',
        link: 'https://github.com/google/fonts/blob/main/ofl/comfortaa/Comfortaa%5Bwght%5D.ttf?raw=true',
      },
      {
        id: 4,
        name: 'Pacifico',
        link: 'https://github.com/google/fonts/blob/main/ofl/pacifico/Pacifico-Regular.ttf?raw=true',
      },
      {
        id: 5,
        name: 'Caveat',
        link: 'https://github.com/google/fonts/blob/main/ofl/caveat/Caveat%5Bwght%5D.ttf?raw=true',
      },
      {
        id: 6,
        name: 'Alegreya',
        link: 'https://github.com/google/fonts/blob/main/ofl/alegreya/Alegreya%5Bwght%5D.ttf?raw=true',
      },
      {
        id: 7,
        name: 'Comforter',
        link: 'https://github.com/google/fonts/blob/main/ofl/comforter/Comforter-Regular.ttf?raw=true',
      },
      {
        id: 8,
        name: 'Philosopher',
        link: 'https://github.com/google/fonts/blob/main/ofl/philosopher/Philosopher-Regular.ttf?raw=true',
      },
      {
        id: 9,
        name: 'Neucha',
        link: 'https://github.com/google/fonts/blob/main/ofl/neucha/Neucha.ttf?raw=true',
      },
      {
        id: 10,
        name: 'Marmelad',
        link: 'https://github.com/google/fonts/blob/main/ofl/marmelad/Marmelad-Regular.ttf?raw=true',
      },
      {
        id: 11,
        name: 'Balsamiq',
        link: 'https://github.com/google/fonts/blob/main/ofl/balsamiqsans/BalsamiqSans-Regular.ttf?raw=true',
      },
      {
        id: 12,
        name: 'Montserrat Alternates',
        link: 'https://github.com/google/fonts/blob/main/ofl/montserratalternates/MontserratAlternates-Regular.ttf?raw=true',
      },
      {
        id: 13,
        name: 'Comforter Brush',
        link: 'https://github.com/google/fonts/blob/main/ofl/comforterbrush/ComforterBrush-Regular.ttf?raw=true',
      },
      {
        id: 14,
        name: 'Marck Script',
        link: 'https://github.com/google/fonts/blob/main/ofl/marckscript/MarckScript-Regular.ttf?raw=true',
      },
      {
        id: 15,
        name: 'Bad Script',
        link: 'https://github.com/google/fonts/blob/main/ofl/badscript/BadScript-Regular.ttf?raw=true',
      },
      {
        id: 16,
        name: 'Kelly Slab',
        link: 'https://github.com/google/fonts/blob/main/ofl/kellyslab/KellySlab-Regular.ttf?raw=true',
      },
      {
        id: 17,
        name: 'Reggae One',
        link: 'https://github.com/google/fonts/blob/main/ofl/reggaeone/ReggaeOne-Regular.ttf?raw=true',
      },
      {
        id: 18,
        name: 'Ruslan Display',
        link: 'https://github.com/google/fonts/blob/main/ofl/ruslandisplay/RuslanDisplay.ttf?raw=true',
      },
      {
        id: 19,
        name: 'Press Start 2P',
        link: 'https://github.com/google/fonts/blob/main/ofl/pressstart2p/PressStart2P-Regular.ttf?raw=true',
      },
      {
        id: 20,
        name: 'Poiret One',
        link: 'https://github.com/google/fonts/blob/main/ofl/poiretone/PoiretOne-Regular.ttf?raw=true',
      },
      {
        id: 21,
        name: 'Roboto Slab',
        link: 'https://github.com/googlefonts/robotoslab/blob/main/fonts/ttf/RobotoSlab-Regular.ttf?raw=true',
      },
    ];

    const loadedFonts: IFont[] = [];

    // Скачиваем все шрифты (если их нет)
    await Promise.all(
      data.map(async ({id, name, link}) => {
        try {
          const path = `${ReactNativeBlobUtil.fs.dirs.DocumentDir}/${name}.ttf`;

          // // Смотрим есть ли шрифт в папке приложения
          // await ReactNativeBlobUtil.fs
          //   .exists(path)
          //   .then(async exist => {
          //     if (exist) {
          //       // Если есть, то сразу грузим динамически в приложение
          //       await loadFontFromFile(name, path).then((nameFile: string) =>
          //         loadedFonts.push({id, name: nameFile}),
          //       );
          //     } else {
          //       // Если нету, то сначала скачиваем по ссылке и потом грузим динамически в приложение
          //       await ReactNativeBlobUtil.config({
          //         path,
          //       })
          //         .fetch('GET', link)
          //         .then(
          //           async res =>
          //             await loadFontFromFile(name, res.path()).then(
          //               (nameFile: string) =>
          //                 loadedFonts.push({id, name: nameFile}),
          //             ),
          //         );
          //     }
          //   })
          //   .catch(() => console.log('Error downloading font!'));
        } catch (err) {
          console.log(err);
        }
      }),
    );

    return {
      data: loadedFonts.sort((a, b) => a.id - b.id).map(({name}) => name),
    };
  } catch (e: any) {
    throw new Error(e);
  }
};

export const fetchLocationVariants = async ({search, lang}: IVariantSearch) => {
  try {
    // await new Promise(resolve => setTimeout(resolve, 3000));

    // console.log({search, lang});

    if (search) {
      const data = await axios
        .get(
          `https://nominatim.openstreetmap.org/search?format=json&limit=5&accept-language=${lang}&q=${encodeURI(
            search,
          )}`,
        )
        .then(res =>
          res.data.map(
            (variant: any): IVariant => ({
              id: variant.place_id,
              location: variant.display_name,
              latitude: Number.isNaN(variant.lat)
                ? 0
                : parseFloat(parseFloat(variant.lat).toFixed(6)),
              longitude: Number.isNaN(variant.lat)
                ? 0
                : parseFloat(parseFloat(variant.lon).toFixed(6)),
            }),
          ),
        )
        .catch(error => {
          console.log(error);
          return [];
        });

      return {data};
    } else {
      return {data: []};
    }

    // const data: IVariant[] = [
    //   {
    //     location: "Minsk",
    //     latitude: 35.04,
    //     longitude: 109.897,
    //   },
    //   {
    //     location: "Mikashevishi",
    //     latitude: 47.14,
    //     longitude: 178.333,
    //   },
    //   {
    //     location: "Minrapul",
    //     latitude: 89.33,
    //     longitude: 166.8128,
    //   },
    //   {
    //     location: "Minister",
    //     latitude: 27.11,
    //     longitude: 99.23433,
    //   },
    //   {
    //     location: "Mino",
    //     latitude: 65.68568,
    //     longitude: 130.9088,
    //   },
    // ];
  } catch (e: any) {
    throw new Error(e);
  }
};

export const fetchHolstImages = async (options?: any) => {
  try {
    const listPreview = await axios.get(
      'http://178.21.11.220:8080/get_preview_images',
    );

    const listPromises = await listPreview.data.map(
      async (urlImage: string, index: number) => {
        const fileName = urlImage.split('/').reverse()[0];

        const imagePath = `${ReactNativeBlobUtil.fs.dirs.CacheDir}/hoslt_image__${fileName}`;

        const hasFileOnDevice = await ReactNativeBlobUtil.fs.exists(imagePath);

        if (hasFileOnDevice) {
          // console.log(`Image exist [${index}] ${imagePath}`);
          return {
            id: index,
            source: {uri: 'file://' + imagePath},
            name: fileName,
          };
        } else {
          return ReactNativeBlobUtil.config({
            path: imagePath,
          })
            .fetch('GET', urlImage, {
              //some headers ..
            })
            .then((): IImage => {
              // console.log(`Downloading... [${index}] ${imagePath}`);
              return {
                id: index,
                source: {uri: 'file://' + imagePath},
                name: fileName,
              };
            });
        }
      },
    );

    // ReactNativeBlobUtil.fs
    //   .ls("/data/user/0/com.mappy_stars/files/")
    //   .then(files => {
    //     console.log(files.filter(file => file.indexOf("ttf") == -1));
    //   });

    const data: IImage[] = await Promise.all(listPromises);

    return {data};
  } catch (e: any) {
    console.log('ERROR STORAGE: ' + e);
    return {data: []};
  }
};
