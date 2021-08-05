import {search} from '../../services/Auth';
import {handleError} from '../Auth/actions';
import invoke from 'lodash/invoke';
import {homeActions} from '../Home/actions';

const handleSearch = payload => {
  return dispatch => {
    const {searchQuery, onError, filters} = payload;
    const onSeachSuccess = data => {
      const {error, searchData: searchResults} = data;
      if (error) {
        return handleError({error, onError});
      }
      invoke(payload, 'onSuccess');
      return dispatch({
        type: homeActions.resetLotteries,
        payload:
          searchResults.ads && searchResults.ads.length
            ? searchResults.ads
            : [],
      });
    };
    return search({searchQuery, filters}).then(onSeachSuccess, error => {
      return handleError({error, onError});
    });
  };
};

export {handleSearch};
