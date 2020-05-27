import {createSelector} from 'reselect';

const getUser = state => state.authReducer.user;
const getLoggedIn = state => state.authReducer.loggedIn;
const getAdDetails = state => state.adDetailsReducer.adDetails;

const getAdDetailsSelector = createSelector(
  [getAdDetails],
  adDetails => adDetails,
);

const getUserSelector = createSelector(
  [getUser],
  user => user,
);

const getLoggedInSelector = createSelector(
  [getLoggedIn],
  loggedIn => loggedIn,
);

export {getUserSelector, getLoggedInSelector, getAdDetailsSelector};
