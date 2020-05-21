import {createSelector} from 'reselect';

const getUser = state => state.authReducer.user;
const getLoggedIn = state => state.authReducer.loggedIn;

const getUserSelector = createSelector(
  [getUser],
  user => user,
);

const getLoggedInSelector = createSelector(
  [getLoggedIn],
  loggedIn => loggedIn,
);

export {getUserSelector, getLoggedInSelector};
