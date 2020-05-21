import {createSelector} from 'reselect';

const getUser = state => state.authReducer.user;

const getUserSelector = createSelector(
  [getUser],
  user => user,
);

export {getUserSelector};
