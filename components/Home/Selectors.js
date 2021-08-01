import {createSelector} from 'reselect';

const getAds = state => state.adsReducer.ads;
const getIsList = state => state.settingsReducer.isHomeListStyle;
const getIsCard = state => state.settingsReducer.isHomeCardStyle;
const getIsCarousel = state => state.settingsReducer.isHomeCarouselStyle;
const getSearchFilters = state => state.searchReducer.searchFilters;

const getAdsSelector = createSelector(
  [getAds],
  ads => ads,
);

const getIsListSelector = createSelector(
  [getIsList],
  isHomeListStyle => isHomeListStyle,
);

const getIsCardSelector = createSelector(
  [getIsCard],
  isHomeCardStyle => isHomeCardStyle,
);

const getIsCarouselSelector = createSelector(
  [getIsCarousel],
  isHomeCarouselStyle => isHomeCarouselStyle,
);

const getSearchFiltersSelector = createSelector(
  [getSearchFilters],
  searchFilters => searchFilters,
);

export {
  getAdsSelector,
  getIsListSelector,
  getIsCardSelector,
  getIsCarouselSelector,
  getSearchFiltersSelector,
};
