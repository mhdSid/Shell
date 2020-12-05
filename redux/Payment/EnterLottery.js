import {handleError} from './actions';
import invoke from 'lodash/invoke';
import {enterLottery} from '../../services/Ads';
import {adActions} from '../Ads/actions';
import {adDetailsActions} from '../AdDetails/actions';

const handleEnterLottery = payload => {
  return dispatch => {
    const {onError, adId, userId, email, password} = payload;
    const onEnterLotterySuccess = data => {
      invoke(payload, 'onSuccess');
      const {error, updatedAd} = data;
      if (error) {
        return handleError({error, onError});
      }
      dispatch({type: adActions.updateCurrentAd, payload: updatedAd});
      return dispatch({
        type: adDetailsActions.showAdDetails,
        payload: updatedAd,
      });
    };
    return enterLottery({
      adId,
      userId,
      email,
      password,
    }).then(onEnterLotterySuccess, error => {
      return handleError({error, onError});
    });
  };
};

export {handleEnterLottery};
