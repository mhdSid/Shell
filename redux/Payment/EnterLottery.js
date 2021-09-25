import {handleError} from './actions';
import invoke from 'lodash/invoke';
import {enterLottery} from '../../services/Lotteries';
import {lotteryDetailsActions} from '../LotteryDetails/actions';
import {homeActions} from '../Home/actions';
import {chatActions} from '../Chat/actions';
import {lotteriesActions} from '../Lotteries/actions';
import {shipLotteryActions} from '../ShipLottery/actions';
import {receiveLotteryActions} from '../ReceiveLottery/actions';

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
      console.log('updated ADDDD: ', updatedAd);
      if (error) {
        return handleError({error, onError});
      }
      if (updatedAd) {
        dispatch({
          type: homeActions.enterLottery,
          payload: updatedAd,
        });
        dispatch({
          type: chatActions.enterLottery,
          payload: updatedAd,
        });
        dispatch({
          type: lotteriesActions.enterLottery,
          payload: updatedAd,
        });
        dispatch({
          type: receiveLotteryActions.enterLottery,
          payload: updatedAd,
        });
        dispatch({
          type: shipLotteryActions.enterLottery,
          payload: updatedAd,
        });
        return dispatch({
          type: lotteryDetailsActions.showLotteryDetails,
          payload: updatedAd,
        });
      }
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
