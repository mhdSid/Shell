import {searchActions} from './actions';

const initialState = {
  searchResults: undefined,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case searchActions.search: {
      return {
        ...state,
        searchResults: action.payload,
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
