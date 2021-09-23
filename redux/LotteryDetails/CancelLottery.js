import {cancelLottery} from '../../services/Lotteries';
import {handleError} from '../Auth/actions';
import invoke from 'lodash/invoke';
import {lotteryDetailsActions} from './actions';
import {homeActions} from '../Home/actions';
import {lotteriesActions} from '../Lotteries/actions';
import {receiveLotteryActions} from '../ReceiveLottery/actions';
import {shipLotteryActions} from '../ShipLottery/actions';

const handleCancelLottery = payload => {
  return dispatch => {
    const {userId, lotteryId, onError, cancelTag, reAdd} = payload;
    const onCancelSuccess = data => {
      const {lottery, error} = data;
      if (error) {
        return handleError({error, onError});
      }
      invoke(payload, 'onSuccess');
      if (lottery) {
        dispatch({
          type: lotteryDetailsActions.cancelLottery,
          payload: lottery,
        });
        dispatch({
          type: homeActions.cancelLottery,
          payload: lottery,
        });
        dispatch({
          type: lotteriesActions.cancelLottery,
          payload: lottery,
        });
        dispatch({
          type: receiveLotteryActions.cancelLottery,
          payload: lottery,
        });
        dispatch({
          type: shipLotteryActions.cancelLottery,
          payload: lottery,
        });
      }
    };
    return cancelLottery({
      userId,
      lotteryId,
      reAdd: reAdd || false,
      cancelTag,
    }).then(onCancelSuccess, error => {
      return handleError({error, onError});
    });
  };
};
export {handleCancelLottery};
