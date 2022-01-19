import {createSelector} from 'reselect';

const getLotteries = state => state.lotteriesReducer.lotteries;
const getUsers = state => state.authReducer.user;
const getAdPosterData = state => state.lotteryDetailsReducer.adPosterData;
const getWinnerUserData = state => state.lotteryDetailsReducer.winnerUserData;
const getUserLotteries = state => state.lotteryDetailsReducer.userLotteries;

const getLotteriesSelector = createSelector(
  [getLotteries],
  lotteries => lotteries,
);

const getUsersSelector = createSelector(
  [getUsers],
  users => users,
);

const getAdPosterDataSelector = createSelector(
  [getAdPosterData],
  adPosterData => adPosterData,
);

const getWinnerUserDataSelector = createSelector(
  [getWinnerUserData],
  winnerUserData => winnerUserData,
);

const getUserLotteriesSelector = createSelector(
  [getUserLotteries],
  userLotteries => userLotteries,
);

export {
  getLotteriesSelector,
  getUsersSelector,
  getAdPosterDataSelector,
  getWinnerUserDataSelector,
  getUserLotteriesSelector,
};
