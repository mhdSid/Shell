import {createSelector} from 'reselect';

const getLotteries = state => state.homeReducer.lotteries;
const getIsList = state => state.settingsReducer.isHomeListStyle;
const getIsCard = state => state.settingsReducer.isHomeCardStyle;
const getIsCarousel = state => state.settingsReducer.isHomeCarouselStyle;
const getSearchFilters = state => state.searchReducer.searchFilters;
const getSearchEventFired = state => state.searchReducer.searchEventFired;
const getEmptySearchResults = state => state.searchReducer.emptySearchResults;

const getLotteriesSelector = createSelector(
  [getLotteries],
  lotteries => lotteries,
);

const getIsListSelector = createSelector(
  [getIsList],
  isHomeListStyle => isHomeListStyle,
);

const getSearchEventFiredSelector = createSelector(
  [getSearchEventFired],
  searchEventFired => searchEventFired,
);

const getEmptySearchResultsSelector = createSelector(
  [getEmptySearchResults],
  emptySearchResults => emptySearchResults,
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
  getLotteriesSelector,
  getIsListSelector,
  getIsCardSelector,
  getIsCarouselSelector,
  getSearchFiltersSelector,
  getSearchEventFiredSelector,
  getEmptySearchResultsSelector,
};
