import {createSelector} from 'reselect';

const getProgressItems = state => state.uploadProgressReducer.progressItems;

export const getProgressItemsSelector = createSelector(
  [getProgressItems],
  progressItems => progressItems,
);
