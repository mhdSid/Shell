import {createSelector} from 'reselect';

const getSearchResults = state => state.searchReducer.searchResults;

const getSearchResultsSelector = createSelector(
  [getSearchResults],
  searchResults => searchResults,
);

export {getSearchResultsSelector};
