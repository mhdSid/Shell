export const snackbarActions = {
  addSnackbarItem: 'ADD_SNACKBAR_ITEM',
  removeSnackbarItem: 'REMOVE_SNACKBAR_ITEM',
};

export const addSnackbarItem = payload => {
  return dispatch => {
    return dispatch({type: snackbarActions.addSnackbarItem, payload});
  };
};

export const removeSnackbarItem = payload => {
  return dispatch => {
    return dispatch({type: snackbarActions.removeSnackbarItem, payload});
  };
};
