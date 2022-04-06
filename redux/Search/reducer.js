import {searchActions} from './actions';

const initialState = {
  searchResults: undefined,
  searchEventFired: null,
  searchFilters: {
    searchText: '',
    city: '',
    prefecture: '',
    fromDate: '',
    toDate: '',
    category: '',
    condition: '',
    minPrice: '',
    maxPrice: '',
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
    case searchActions.resetState: {
      return {
        searchResults: undefined,
        searchEventFired: null,
        searchFilters: {
          searchText: '',
          city: '',
          prefecture: '',
          fromDate: '',
          toDate: '',
          category: '',
          condition: '',
          minPrice: '',
          maxPrice: '',
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
