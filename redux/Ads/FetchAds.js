import {handleError, adActions} from './actions';
import {getAds} from '../../services/Ads';
import invoke from 'lodash/invoke';

const handleFetchAds = payload => {
  return dispatch => {
    const {onError} = payload;
    const onGetAdsSuccess = data => {
      invoke(payload, 'onSuccess');
      const {error, ads: serverAds} = data;
      if (error) {
        return handleError({error, onError});
      }
      return dispatch({type: adActions.importAd, payload: serverAds});
    };
    return getAds().then(onGetAdsSuccess, error => {
      return handleError({error, onError});
    });
  };
};

export {handleFetchAds};
