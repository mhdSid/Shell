import {handleError} from './actions';
import invoke from 'lodash/invoke';
import {enterLottery} from '../../services/Lotteries';
import {lotteryDetailsActions} from '../LotteryDetails/actions';
import {homeActions} from '../Home/actions';

const handleEnterLottery = payload => {
  return dispatch => {
    const {
      onError,
      adId,
      userId,
      email,
      passwordHash,
      creditCardNumber,
      creditCardCVC,
      creditCardExpiryDate,
      creditCardType,
    } = payload;
    const onEnterLotterySuccess = data => {
      invoke(payload, 'onSuccess');
      const {error, updatedAd} = data;
      if (error) {
        return handleError({error, onError});
      }
      dispatch({
        type: homeActions.updateLottery,
        payload: updatedAd,
      });
      return dispatch({
        type: lotteryDetailsActions.showLotteryDetails,
        payload: updatedAd,
      });
    };
    return enterLottery({
      adId,
      userId,
      email,
      passwordHash,
      creditCardNumber,
      creditCardCVC,
      creditCardExpiryDate,
      creditCardType,
    }).then(onEnterLotterySuccess, error => {
      return handleError({error, onError});
    });
  };
};

export {handleEnterLottery};
