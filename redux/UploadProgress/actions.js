const uploadProgressActions = {
  addNewProgressItem: 'PROGRESS_ADD_NEW_ITEM',
  removeProgressItem: 'PROGRESS_REMOVE_ITEM',
  updateProgressItem: 'UPDATE_PROGRESS_ITEM',
};

const addNewProgressItem = payload => {
  return dispatch => {
    return dispatch({type: uploadProgressActions.addNewProgressItem, payload});
  };
};

const removeProgressItem = payload => {
  return dispatch => {
    return dispatch({type: uploadProgressActions.removeProgressItem, payload});
  };
};

const updateProgressItem = payload => {
  return dispatch => {
    return dispatch({type: uploadProgressActions.updateProgressItem, payload});
  };
};

export {
  uploadProgressActions,
  updateProgressItem,
  removeProgressItem,
  addNewProgressItem,
};
