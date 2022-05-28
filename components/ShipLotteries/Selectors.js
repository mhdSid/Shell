import {createSelector} from 'reselect';

const getShipLotteryDetails = state =>
  state.shipLotteryReducer.shipLotteryDetails;

const getUserCreatedWonLotteries = state =>
  state.shipLotteryReducer.userCreatedWonLotteries;

const getLotteryWinnerData = state =>
  state.shipLotteryReducer.lotteryWinnerData;

export const getShipLotteryDetailsSelector = createSelector(
  [getShipLotteryDetails],
  shipLotteryDetails => shipLotteryDetails,
);

export const getUserCreatedWonLotteriesSelector = createSelector(
  [getUserCreatedWonLotteries],
  userCreatedWonLotteries => userCreatedWonLotteries,
);

export const getLotteryWinnerDataSelector = createSelector(
  [getLotteryWinnerData],
  lotteryWinnerData => lotteryWinnerData,
);
