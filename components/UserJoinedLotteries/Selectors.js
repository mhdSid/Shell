import {createSelector} from 'reselect';

const getUser = state => state.authReducer.user;
const getLoggedIn = state => state.authReducer.loggedIn;
const getUserJoinedLotteries = state =>
  state.lotteriesReducer.userJoinedLotteries;
const getUserCreatedLotteries = state =>
  state.lotteriesReducer.userCreatedLotteries;
const getUserLikedLotteries = state =>
  state.lotteriesReducer.userLikedLotteries;

export const getUserSelector = createSelector(
  [getUser],
  user => user,
);

export const getLoggedInSelector = createSelector(
  [getLoggedIn],
  loggedIn => loggedIn,
);

export const getUserJoinedLotteriesSelector = createSelector(
  [getUserJoinedLotteries],
  userJoinedLotteries => userJoinedLotteries,
);

export const getUserCreatedLotteriesSelector = createSelector(
  [getUserCreatedLotteries],
  userCreatedLotteries => userCreatedLotteries,
);

export const getUserLikedLotteriesSelector = createSelector(
  [getUserLikedLotteries],
  userLikedLotteries => userLikedLotteries,
);
