import {searchActions} from './actions';

const initialState = {
  searchResults: undefined,
  searchEventFired: null,
  searchFilters: {
    city: '',
    prefecture: '',
    fromDate: '',
    toDate: '',
    category: '',
    condition: '',
  },
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case searchActions.setSearchEventFired: {
      return {
        ...state,
        searchEventFired: action.payload,
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
