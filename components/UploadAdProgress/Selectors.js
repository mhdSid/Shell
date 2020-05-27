import {createSelector} from 'reselect';

const getProgressItems = state => state.uploadProgressReducer.progressItems;

const getProgressItemsSelector = createSelector(
  [getProgressItems],
  progressItems => progressItems,
);

export {getProgressItemsSelector};
