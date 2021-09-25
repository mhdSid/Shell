import {markLotteryAsShipped} from '../../services/Lotteries';
import {handleError} from '../Auth/actions';
import invoke from 'lodash/invoke';
import {shipLotteryActions} from './actions';
import {homeActions} from '../Home/actions';
import {chatActions} from '../Chat/actions';
import {lotteriesActions} from '../Lotteries/actions';

const handleMarkLotteryAsShipped = payload => {
  return dispatch => {
    const {onError, lotteryId, cancelTag} = payload;

    const onGetSuccess = data => {
      const {lottery, error} = data;
      if (error) {
        return handleError({error, onError});
      }
      invoke(payload, 'onSuccess');
      if (lottery) {
        dispatch({
          type: shipLotteryActions.markLotteryAsShipped,
          payload: lottery,
        });
        dispatch({
          type: homeActions.markLotteryAsShipped,
          payload: lottery,
        });
        dispatch({
          type: chatActions.markLotteryAsShipped,
          payload: lottery,
        });
        dispatch({
          type: lotteriesActions.markLotteryAsShipped,
          payload: lottery,
        });
      }
    };
    return markLotteryAsShipped({lotteryId, cancelTag}).then(
      onGetSuccess,
      error => {
        return handleError({error, onError});
      },
    );
  };
};
export {handleMarkLotteryAsShipped};
