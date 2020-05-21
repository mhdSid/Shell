import {createSelector} from 'reselect';

const getUser = state => state.authReducer.user;
const getLoggedIn = state => state.authReducer.loggedIn;
const getLotteries = state => state.lotteriesReducer.lotteries;

const getUserSelector = createSelector(
  [getUser],
  user => user,
);

const getLoggedInSelector = createSelector(
  [getLoggedIn],
  loggedIn => loggedIn,
);

const getLotteriesSelector = createSelector(
  [getLotteries],
  lotteries => lotteries,
);

export {getUserSelector, getLoggedInSelector, getLotteriesSelector};
