import {createSelector} from 'reselect';

const getUser = state => state.authReducer.user;
const getLoggedIn = state => state.authReducer.loggedIn;
const getUserJoinedLotteries = state =>
  state.lotteriesReducer.userJoinedLotteries;
const getUserCreatedLotteries = state =>
  state.lotteriesReducer.userCreatedLotteries;

const getUserSelector = createSelector(
  [getUser],
  user => user,
);

const getLoggedInSelector = createSelector(
  [getLoggedIn],
  loggedIn => loggedIn,
);

const getUserJoinedLotteriesSelector = createSelector(
  [getUserJoinedLotteries],
  userJoinedLotteries => userJoinedLotteries,
);

const getUserCreatedLotteriesSelector = createSelector(
  [getUserCreatedLotteries],
  userCreatedLotteries => userCreatedLotteries,
);

export {
  getUserSelector,
  getLoggedInSelector,
  getUserJoinedLotteriesSelector,
  getUserCreatedLotteriesSelector,
};
