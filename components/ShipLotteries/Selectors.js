import {createSelector} from 'reselect';

const getShipLotteryDetails = state =>
  state.shipLotteryReducer.shipLotteryDetails;

const getUserCreatedWonLotteries = state =>
  state.shipLotteryReducer.userCreatedWonLotteries;

const getLotteryWinnerData = state =>
  state.shipLotteryReducer.lotteryWinnerData;

const getShipLotteryDetailsSelector = createSelector(
  [getShipLotteryDetails],
  shipLotteryDetails => shipLotteryDetails,
);
const getUserCreatedWonLotteriesSelector = createSelector(
  [getUserCreatedWonLotteries],
  userCreatedWonLotteries => userCreatedWonLotteries,
);

const getLotteryWinnerDataSelector = createSelector(
  [getLotteryWinnerData],
  lotteryWinnerData => lotteryWinnerData,
);

export {
  getShipLotteryDetailsSelector,
  getUserCreatedWonLotteriesSelector,
  getLotteryWinnerDataSelector,
};
