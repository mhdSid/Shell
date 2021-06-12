import {createSelector} from 'reselect';

const getAds = state => state.adsReducer.ads;
const getIsList = state => state.settingsReducer.isHomeListStyle;
const getIsCard = state => state.settingsReducer.isHomeCardStyle;

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

export {getAdsSelector, getIsListSelector, getIsCardSelector};
