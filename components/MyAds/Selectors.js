import {createSelector} from 'reselect';

const getUser = state => state.authReducer.user;
const getMyAds = state => state.userReducer.myAds;

const getUserSelector = createSelector(
  [getUser],
  user => user,
);

const getMyAdsSelector = createSelector(
  [getMyAds],
  myAds => myAds,
);

export {getUserSelector, getMyAdsSelector};
