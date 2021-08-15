const snackbarActions = {
  addSnackbarItem: 'ADD_SNACKBAR_ITEM',
  removeSnackbarItem: 'REMOVE_SNACKBAR_ITEM',
};

const addSnackbarItem = payload => {
  return dispatch => {
    return dispatch({type: snackbarActions.addSnackbarItem, payload});
  };
};

const removeSnackbarItem = payload => {
  return dispatch => {
    return dispatch({type: snackbarActions.removeSnackbarItem, payload});
  };
};

export {snackbarActions, addSnackbarItem, removeSnackbarItem};
