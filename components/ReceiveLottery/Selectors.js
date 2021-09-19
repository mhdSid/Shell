import {createSelector} from 'reselect';

const getReceiveLotteryDetails = state =>
  state.receiveLotteryReducer.receiveLotteryDetails;

const getUserWonLotteries = state =>
  state.receiveLotteryReducer.userWonLotteries;

const getLotteryPosterData = state =>
  state.receiveLotteryReducer.lotteryPosterData;

const getReceiveLotteryDetailsSelector = createSelector(
  [getReceiveLotteryDetails],
  receiveLotteryDetails => receiveLotteryDetails,
);
const getUserWonLotteriesSelector = createSelector(
  [getUserWonLotteries],
  userWonLotteries => userWonLotteries,
);
const getLotteryPosterDataSelector = createSelector(
  [getLotteryPosterData],
  lotteryPosterData => lotteryPosterData,
);

export {
  getReceiveLotteryDetailsSelector,
  getUserWonLotteriesSelector,
  getLotteryPosterDataSelector,
};
