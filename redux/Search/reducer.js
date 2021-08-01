import {searchActions} from './actions';

const initialState = {
  searchResults: undefined,
  searchFilters: {
    city: '',
    prefecture: '',
    fromDate: '',
    toDate: '',
    category: '',
    status: '',
  },
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case searchActions.search: {
      return {
        ...state,
        searchResults: action.payload,
      };
    }
    case searchActions.setSearchFilters: {
      return {
        ...state,
        searchFilters: {
          ...state.searchFilters,
          ...action.payload,
        },
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default searchReducer;
