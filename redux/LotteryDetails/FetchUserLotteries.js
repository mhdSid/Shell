import {getMyAds} from '../../services/Lotteries';
import {handleError} from '../Auth/actions';
import invoke from 'lodash/invoke';
import {lotteryDetailsActions} from './actions';

const handleFetchUserLotteries = payload => {
  return dispatch => {
    const {userId, onError} = payload;
    const onGetMyAdsSuccess = data => {
      const {myAds: userAds, error} = data;
      if (error) {
        return handleError({error, onError});
      }
      invoke(payload, 'onSuccess');
      return dispatch({
        type: lotteryDetailsActions.fetchUserAds,
        payload: userAds || [],
      });
    };
    return getMyAds({userId}).then(onGetMyAdsSuccess, error => {
      return handleError({error, onError});
    });
  };
};
export {handleFetchUserLotteries};
