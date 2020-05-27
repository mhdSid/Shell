import {getMyAds} from '../../services/Ads';
import {handleError} from '../Auth/actions';
import invoke from 'lodash/invoke';
import {adDetailsActions} from './actions';

const handleFetchUserAds = payload => {
  return dispatch => {
    const {userId, onError} = payload;
    const onGetMyAdsSuccess = data => {
      const {myAds: userAds, error} = data;
      if (error) {
        return handleError({error, onError});
      }
      invoke(payload, 'onSuccess');
      return dispatch({
        type: adDetailsActions.FETCHUSERADS,
        payload: userAds || [],
      });
    };
    return getMyAds({userId}).then(onGetMyAdsSuccess, error => {
      return handleError({error, onError});
    });
  };
};
export {handleFetchUserAds};
