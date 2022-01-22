import {createSelector} from "reselect";
import {RootState} from "../store";

// TODO: Как-то много кода.....
const getControllersSelect = (state: RootState) => state.data.controllers;
const getMonthsSelect = (state: RootState) => state.data.months;
const getLangOfNamesSelect = (state: RootState) => state.data.langNames;
const getFontsSelect = (state: RootState) => state.data.loadedFonts;
const getTemplateSelect = (state: RootState, id: number) =>
  state.data.templates.find(el => el.id === id);
const getThemeSelect = (state: RootState) => state.settings.theme;
const getLanguageSelect = (state: RootState) => state.settings.language;
const getMapSizeSelect = (state: RootState) => state.map.sizeMap;
const getMapColorSelect = (state: RootState) => state.map.mapColor;
const getColorBorderMapSelect = (state: RootState) => state.map.colorBorderMap;
// TODO: Не используется?
const getMarginTopMapSelect = (state: RootState) => state.map.marginTopMap;
const getHasBorderMapSelect = (state: RootState) => state.map.hasBorderMap;
const getShapeBorderMapNameSelect = (state: RootState) =>
  state.map.shapeBorderMapName;
const getHolstsSelect = (state: RootState) => state.data.holsts;
const getColorsSelect = (state: RootState) => state.data.colors;
const getTemplateComponentSelect = (state: RootState) =>
  state.data.templateComponent;
const getCategorySelect = (state: RootState) => state.data.category;
const getAboutSelect = (state: RootState) => state.data.about;
const getLocationSelect = (state: RootState) => state.event.location;
const getLocationVariants = (state: RootState) => state.event.variants;
const getIsLoadingVariants = (state: RootState) => state.event.status;
const getShapeBorderMapSelect = (state: RootState) =>
  state.data.shapesBorderMap;
const getShapesSeparatorSelect = (state: RootState) =>
  state.data.shapesSeparator;
const getIndentHolstBorderSelect = (state: RootState) =>
  state.canvas.indentHolstBorder;
const getWidthHolstBorderSelect = (state: RootState) =>
  state.canvas.widthHolstBorder;
const getColorHolstBorderSelect = (state: RootState) =>
  state.canvas.colorHolstBorder;
const getHasHolstBorderSelect = (state: RootState) =>
  state.canvas.hasHolstBorder;
const getHolstIdSelect = (state: RootState) => state.canvas.holstId;
const getShapeIdSelect = (state: RootState) => state.separator.shapeSeparatorId;
const getHolstColorSelect = (state: RootState) => state.canvas.holstColor;
const getColorLocationSelect = (state: RootState) =>
  state.location.colorLocation;
const getSizeLocationSelect = (state: RootState) => state.location.sizeLocation;
const getFontLocationSelect = (state: RootState) => state.location.fontLocation;
const getUserTextLocationSelect = (state: RootState) =>
  state.location.userTextLocation;
const getIsChangeTextLocationSelect = (state: RootState) =>
  state.location.isChangeTextLocation;
const getStarDataSelect = (state: RootState) => state.stars;
const getLatitudeSelect = (state: RootState) => state.event.latitude;
const getLongitudeSelect = (state: RootState) => state.event.longtitude;
const getDateSelect = (state: RootState) => state.event.date;
const getTextDescSelect = (state: RootState) => state.desc.textDesc;
const getColorDescSelect = (state: RootState) => state.desc.colorDesc;
const getSizeDescSelect = (state: RootState) => state.desc.sizeDesc;
const getFontDescSelect = (state: RootState) => state.desc.fontDesc;
const getLangOfStarsSelect = (state: RootState) => state.stars.langNames;
const getHolstImageIdSelect = (state: RootState) => state.canvas.holstImageId;
const getHolstImagesSelect = (state: RootState) => state.data.holstImages;
const getEventStoreSelect = (state: RootState) => state.event;
const getCanvasStoreSelect = (state: RootState) => state.canvas;
const getDescStoreSelect = (state: RootState) => state.desc;
const getLocationStoreSelect = (state: RootState) => state.location;
const getMapStoreSelect = (state: RootState) => state.map;
const getSeparatorStoreSelect = (state: RootState) => state.separator;
const getStarsStoreSelect = (state: RootState) => state.stars;

const getLocationData = createSelector(
  [
    getLocationSelect,
    getLocationVariants,
    getIsLoadingVariants,
    getLanguageSelect,
  ],
  (location, variants, status, language) => {
    return {location, variants, status, language};
  },
);

const getMonths = createSelector(
  [getMonthsSelect, getLanguageSelect],
  (months, language) => {
    return months.find(({lang}) => lang == language)?.data;
  },
);

const getLangsOfNames = createSelector(
  [getLangOfNamesSelect, getLangOfStarsSelect],
  (langs, currentLang) => {
    return {langs, currentLang};
  },
);

const getFontsDesc = createSelector(
  [getFontsSelect, getFontDescSelect],
  (fonts, currentFont) => {
    return {fonts, currentFont};
  },
);

const getFontsLocation = createSelector(
  [getFontsSelect, getFontLocationSelect],
  (fonts, currentFont) => {
    return {fonts, currentFont};
  },
);

const getShapeBorderMap = createSelector(
  [getShapeBorderMapSelect],
  shapesBorderMap => {
    return {shapesBorderMap};
  },
);

const getShapesSeparator = createSelector(
  [getShapesSeparatorSelect],
  shapesSeparator => {
    return {shapesSeparator};
  },
);

const getTemplate = createSelector([getTemplateSelect], template => {
  return template;
});

const getControllers = createSelector([getControllersSelect], controllers => {
  return controllers;
});

const getLanguage = createSelector([getLanguageSelect], language => {
  return language;
});

const getColors = createSelector([getColorsSelect], colors => {
  return colors;
});

const getHolsts = createSelector([getHolstsSelect], holsts => {
  return holsts;
});

// TODO: А нужно? тоже самое что и state => state.settings.theme
const getTheme = createSelector([getThemeSelect], theme => {
  return theme;
});

const getBolderHolstInfo = createSelector(
  [getColorHolstBorderSelect, getHasHolstBorderSelect],
  (colorHolstBorder, hasHolstBorder) => {
    return {
      colorHolstBorder,
      hasHolstBorder,
    };
  },
);

const getLocationTextInfo = createSelector(
  [
    getColorLocationSelect,
    getSizeLocationSelect,
    getFontLocationSelect,
    getUserTextLocationSelect,
    getIsChangeTextLocationSelect,
  ],
  (
    colorLocation,
    sizeLocation,
    fontLocation,
    userTextLocation,
    isChangeTextLocation,
  ) => {
    return {
      colorLocation,
      sizeLocation,
      fontLocation,
      userTextLocation,
      isChangeTextLocation,
    };
  },
);

const getMapBorderInfo = createSelector(
  [
    getMapSizeSelect,
    getColorBorderMapSelect,
    getHasBorderMapSelect,
    getShapeBorderMapNameSelect,
  ],
  (sizeMap, colorBorderMap, hasBorderMap, shapeBorderMapName) => {
    return {
      sizeMap,
      colorBorderMap,
      hasBorderMap,
      shapeBorderMapName,
    };
  },
);

const getMapStarInfo = createSelector(
  [
    getStarDataSelect,
    getLatitudeSelect,
    getLongitudeSelect,
    getDateSelect,
    getMapSizeSelect,
    getMapColorSelect,
  ],
  (
    {
      sizeStars,
      opacityStars,
      hasGraticule,
      colorGraticule,
      hasDashedGraticule,
      opacityGraticule,
      widthGraticule,
      hasMilkyWay,
      colorStars,
      hasConstellations,
      colorConstellations,
      opacityConstellations,
      widthConstellations,
      hasNames,
      colorNames,
      sizeNames,
      langNames,
    },
    longtitude,
    latitude,
    date,
    sizeMap,
    mapColor,
  ) => {
    return {
      sizeStars,
      opacityStars,
      hasGraticule,
      colorGraticule,
      hasDashedGraticule,
      opacityGraticule,
      widthGraticule,
      hasMilkyWay,
      colorStars,
      hasConstellations,
      colorConstellations,
      opacityConstellations,
      widthConstellations,
      hasNames,
      colorNames,
      sizeNames,
      langNames,
      longtitude,
      latitude,
      date,
      sizeMap,
      mapColor,
    };
  },
);

const getDescInfo = createSelector(
  [getTextDescSelect, getColorDescSelect, getSizeDescSelect, getFontDescSelect],
  (textDesc, colorDesc, sizeDesc, fontDesc) => {
    return {
      textDesc,
      colorDesc,
      sizeDesc,
      fontDesc,
    };
  },
);

const getHolstInfo = createSelector(
  [
    getHolstIdSelect,
    getHolstsSelect,
    getIndentHolstBorderSelect,
    getWidthHolstBorderSelect,
    getHasHolstBorderSelect,
    getHolstColorSelect,
  ],
  (
    holstId,
    holsts,
    indentHolstBorder,
    widthHolstBorder,
    hasHolstBorder,
    holstColor,
  ) => {
    return {
      holst: holsts.find(({id}) => id === holstId),
      indentHolstBorder,
      widthHolstBorder,
      hasHolstBorder,
      holstColor,
    };
  },
);

const getCanvasInfo = createSelector(
  [
    getHolstIdSelect,
    getHolstsSelect,
    getIndentHolstBorderSelect,
    getWidthHolstBorderSelect,
    getHasHolstBorderSelect,
    getHolstColorSelect,
    getColorHolstBorderSelect,
    getHolstImageIdSelect,
    getHolstImagesSelect,
  ],
  (
    holstId,
    holsts,
    indentHolstBorder,
    widthHolstBorder,
    hasHolstBorder,
    holstColor,
    colorHolstBorder,
    holstImageId,
    holstImages,
  ) => {
    return {
      holst: holsts.find(holst => holst.id === holstId),
      holsts,
      indentHolstBorder,
      widthHolstBorder,
      hasHolstBorder,
      holstColor,
      colorHolstBorder,
      holstImageId,
      holstImages,
    };
  },
);

const getEventInfo = createSelector(
  [
    getDateSelect,
    getLocationSelect,
    getLatitudeSelect,
    getLongitudeSelect,
    getLanguageSelect,
  ],
  (date, location, latitude, longtitude, langApplication) => {
    return {date, location, latitude, longtitude, langApplication};
  },
);

const getHolstImage = createSelector(
  [getHolstImageIdSelect, getHolstImagesSelect],
  (id, images) => {
    return images.find(image => image.id === id);
  },
);

const getHolst = createSelector(
  [getHolstIdSelect, getHolstsSelect],
  (holstId, holsts) => {
    return holsts.find(({id}) => id === holstId);
  },
);

const getShape = createSelector(
  [getShapeIdSelect, getShapesSeparatorSelect],
  (shapeId, shapes) => {
    return shapes.find(({id}) => id === shapeId);
  },
);

const getAllOptions = createSelector(
  [
    getTemplateComponentSelect,
    getCategorySelect,
    getAboutSelect,
    getControllersSelect,
    getEventStoreSelect,
    getCanvasStoreSelect,
    getDescStoreSelect,
    getLocationStoreSelect,
    getMapStoreSelect,
    getSeparatorStoreSelect,
    getStarsStoreSelect,
  ],
  (templateComponent, category, about, controllers, ...options) => {
    const allOptions = options.reduce((total, option) => ({
      ...total,
      ...option,
    }));
    return {
      ...allOptions,
      controllers: controllers.map(({key}) => key),
      templateComponent,
      category,
      about,
    };
  },
);

// TODO: Все ли используются?
export const Selectors = {
  getControllers,
  getTemplate,
  getTheme,
  getHolsts,
  getCanvasInfo,
  getHolstInfo,
  getColors,
  getShapeBorderMap,
  getShapesSeparator,
  getLanguage,
  getMonths,
  getLangsOfNames,
  getFontsDesc,
  getFontsLocation,
  getLocationData,
  getBolderHolstInfo,
  getLocationTextInfo,
  getMapBorderInfo,
  getMapStarInfo,
  getDescInfo,
  getEventInfo,
  getHolstImage,
  getAllOptions,
  getHolst,
  getShape,
};
