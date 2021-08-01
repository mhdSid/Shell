const searchActions = {
  search: 'SEARCH',
  setSearchFilters: 'SET_SEARCH_FILTERS',
};

const setSearchFilters = payload => {
  return dispatch => {
    return dispatch({
      type: searchActions.setSearchFilters,
      payload,
    });
  };
};

export {searchActions, setSearchFilters};
