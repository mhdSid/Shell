import {createSelector} from 'reselect';

const getSnackbarItems = state => state.snackbarReducer.snackbarItems;

const getSnackbarItemsSelector = createSelector(
  [getSnackbarItems],
  snackbarItems => snackbarItems,
);

export {getSnackbarItemsSelector};
