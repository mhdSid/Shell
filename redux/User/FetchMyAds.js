import {getMyAds} from '../../services/Ads';
import {handleError} from '../Auth/actions';
import invoke from 'lodash/invoke';
import {userActions} from './actions';

const handleFetchMyAds = payload => {
  return dispatch => {
    const {userId, onError} = payload;
    const onGetMyAdsSuccess = data => {
      const {myAds, error} = data;
      if (error) {
        return handleError({error, onError});
      }
      invoke(payload, 'onSuccess');
      return dispatch({
        type: userActions.setMyAds,
        payload: myAds || [],
      });
    };
    return getMyAds({userId}).then(onGetMyAdsSuccess, error => {
      return handleError({error, onError});
    });
  };
};
export {handleFetchMyAds};
