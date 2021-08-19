import {handleError, homeActions} from './actions';
import {getAds} from '../../services/Lotteries';
import invoke from 'lodash/invoke';

const handleFetchLotteries = payload => {
  return dispatch => {
    const {onError, userId} = payload;
    const onGetAdsSuccess = data => {
      invoke(payload, 'onSuccess');
      const {error, ads: serverLotteries} = data;
      if (error) {
        return handleError({error, onError});
      }
      return dispatch({
        type: homeActions.setLotteries,
        payload: serverLotteries,
      });
    };
    return getAds({userId}).then(onGetAdsSuccess, error => {
      return handleError({error, onError});
    });
  };
};

export {handleFetchLotteries};
