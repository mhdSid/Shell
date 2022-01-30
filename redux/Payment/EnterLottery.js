import {handleError} from './actions';
import invoke from 'lodash/invoke';
import {enterLottery} from '../../services/Lotteries';
import {lotteryDetailsActions} from '../LotteryDetails/actions';
import {homeActions} from '../Home/actions';
import {chatActions} from '../Chat/actions';
import {lotteriesActions} from '../Lotteries/actions';
import {shipLotteryActions} from '../ShipLottery/actions';
import {receiveLotteryActions} from '../ReceiveLottery/actions';
import {authActions} from '../Auth/actions';

const handleEnterLottery = payload => {
  return (dispatch, getState) => {
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
      const {error, updatedAd, updatedUser} = data;
      if (error) {
        return handleError({error, onError}, getState);
      }
      if (updatedUser) {
        dispatch({
          type: authActions.update,
          payload: {
            ...updatedUser,
          },
        });
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
        dispatch({
          type: lotteryDetailsActions.showLotteryDetails,
          payload: updatedAd,
        });
      }
      return invoke(payload, 'onSuccess');
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
      return handleError({error, onError}, getState);
    });
  };
};

export {handleEnterLottery};
