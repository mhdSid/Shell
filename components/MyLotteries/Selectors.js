import {createSelector} from 'reselect';

const getUser = state => state.authReducer.user;
const getMyLotteries = state => state.userReducer.myLotteries;

const getUserSelector = createSelector(
  [getUser],
  user => user,
);

const getMyLotteriesSelector = createSelector(
  [getMyLotteries],
  myLotteries => myLotteries,
);

export {getUserSelector, getMyLotteriesSelector};
