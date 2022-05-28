import {createSelector} from 'reselect';

const getReceiveLotteryDetails = state =>
  state.receiveLotteryReducer.receiveLotteryDetails;

const getUserWonLotteries = state =>
  state.receiveLotteryReducer.userWonLotteries;

const getLotteryPosterData = state =>
  state.receiveLotteryReducer.lotteryPosterData;

export const getReceiveLotteryDetailsSelector = createSelector(
  [getReceiveLotteryDetails],
  receiveLotteryDetails => receiveLotteryDetails,
);

export const getUserWonLotteriesSelector = createSelector(
  [getUserWonLotteries],
  userWonLotteries => userWonLotteries,
);

export const getLotteryPosterDataSelector = createSelector(
  [getLotteryPosterData],
  lotteryPosterData => lotteryPosterData,
);
