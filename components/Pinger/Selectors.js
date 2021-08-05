import {createSelector} from 'reselect';

const getLotteryDetails = state => state.lotteryDetailsReducer.lotteryDetails;

const getLotteryDetailsSelector = createSelector(
  [getLotteryDetails],
  lotteryDetails => lotteryDetails,
);

export {getLotteryDetailsSelector};
