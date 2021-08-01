import {search} from '../../services/Auth';
import {handleError} from '../Auth/actions';
import invoke from 'lodash/invoke';
import {searchActions} from './actions';
import {adActions} from '../Ads/actions';

const handleSearch = payload => {
  return dispatch => {
    const {searchQuery, onError} = payload;
    const onSeachSuccess = data => {
      const {error, searchData: searchResults} = data;
      console.log('searchResults: ', searchResults);
      if (error) {
        return handleError({error, onError});
      }
      invoke(payload, 'onSuccess');
      return dispatch({
        type: adActions.resetAds,
        payload:
          searchResults.ads && searchResults.ads.length
            ? searchResults.ads
            : [],
      });

      // return dispatch({
      //   type: searchActions.search,
      //   payload:
      //     searchResults.ads && searchResults.ads.length && searchResults.ads,
      // });
    };
    return search({searchQuery}).then(onSeachSuccess, error => {
      return handleError({error, onError});
    });
  };
};

export {handleSearch};
