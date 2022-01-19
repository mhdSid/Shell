import {createSelector} from 'reselect';

const getLotteryResult = state => state.lotteryResultReducer.lotteryResult;
const getAdPosterData = state => state.lotteryResultReducer.adPosterData;
const getWinnerUserData = state => state.lotteryResultReducer.winnerUserData;

const getLotteryResultSelector = createSelector(
  [getLotteryResult],
  lotteryResult => lotteryResult,
);

const getAdPosterDataSelector = createSelector(
  [getAdPosterData],
  adPosterData => adPosterData,
);

const getWinnerUserDataSelector = createSelector(
  [getWinnerUserData],
  winnerUserData => winnerUserData,
);

export {
  getLotteryResultSelector,
  getAdPosterDataSelector,
  getWinnerUserDataSelector,
};
