const searchActions = {
  setSearchFilters: 'SET_SEARCH_FILTERS',
  setSearchEventFired: 'SET_SEARCH_EVENT_FIRED',
};

const setSearchFilters = payload => {
  return dispatch => {
    return dispatch({
      type: searchActions.setSearchFilters,
      payload,
    });
  };
};

const setSearchEventFired = payload => {
  return dispatch => {
    return dispatch({
      type: searchActions.setSearchEventFired,
      payload,
    });
  };
};

export {searchActions, setSearchFilters, setSearchEventFired};
