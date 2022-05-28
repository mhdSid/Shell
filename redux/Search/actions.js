export const searchActions = {
  setSearchFilters: 'SET_SEARCH_FILTERS',
  setSearchEventFired: 'SET_SEARCH_EVENT_FIRED',
  resetState: 'SEARCH_RESET_STATE',
};

export const setSearchFilters = payload => {
  return dispatch => {
    return dispatch({
      type: searchActions.setSearchFilters,
      payload,
    });
  };
};

export const setSearchEventFired = payload => {
  return dispatch => {
    return dispatch({
      type: searchActions.setSearchEventFired,
      payload,
    });
  };
};
