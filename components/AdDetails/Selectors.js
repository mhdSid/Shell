import {createSelector} from 'reselect';

const getLotteries = state => state.lotteriesReducer.lotteries;
const getUsers = state => state.authReducer.user;
const getAdPosterData = state => state.adDetailsReducer.adPosterData;
const getLotteryUsersData = state => state.adDetailsReducer.lotteryUsersData;
const getWinnerUserData = state => state.adDetailsReducer.winnerUserData;

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

const getLotteryUsersDataSelector = createSelector(
  [getLotteryUsersData],
  lotteryUsersData => lotteryUsersData,
);

const getWinnerUserDataSelector = createSelector(
  [getWinnerUserData],
  winnerUserData => winnerUserData,
);

export {
  getLotteriesSelector,
  getUsersSelector,
  getAdPosterDataSelector,
  getLotteryUsersDataSelector,
  getWinnerUserDataSelector,
};
