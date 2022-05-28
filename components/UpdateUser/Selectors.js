import {createSelector} from 'reselect';

const getUser = state => state.authReducer.user;

export const getUserSelector = createSelector(
  [getUser],
  user => user,
);
