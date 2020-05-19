import {search} from '../../services/Auth';
import {handleError} from '../Auth/actions';
import invoke from 'lodash/invoke';
import {searchActions} from './actions';

const handleSearch = payload => {
  return dispatch => {
    const {searchQuery, onError} = payload;

    const onSeachSuccess = data => {
      const {error, searchData: searchResults} = data;
      if (error) {
        return handleError({error, onError});
      }
      const newSearchResults = [
        ...((searchResults.users &&
          searchResults.users.map(user => {
            return {
              ...user,
              type: 'user',
            };
          })) ||
          []),
        ...((searchResults.ads &&
          searchResults.ads.map(ad => {
            return {
              ...ad,
              type: 'ad',
            };
          })) ||
          []),
      ];
      invoke(payload, 'onSuccess');
      return dispatch({
        type: searchActions.SEARCH,
        payload: newSearchResults,
      });
    };

    return search({searchQuery}).then(onSeachSuccess, error => {
      return handleError({error, onError});
    });
  };
};

export {handleSearch};
