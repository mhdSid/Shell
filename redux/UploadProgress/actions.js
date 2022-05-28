export const uploadProgressActions = {
  addNewProgressItem: 'PROGRESS_ADD_NEW_ITEM',
  removeProgressItem: 'PROGRESS_REMOVE_ITEM',
};

export const addNewProgressItem = payload => {
  return dispatch => {
    return dispatch({type: uploadProgressActions.addNewProgressItem, payload});
  };
};

export const removeProgressItem = payload => {
  return dispatch => {
    return dispatch({type: uploadProgressActions.removeProgressItem, payload});
  };
};
