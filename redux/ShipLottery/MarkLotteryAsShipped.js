import {markLotteryAsShipped} from '../../services/Lotteries';
import {handleError} from '../Auth/actions';
import invoke from 'lodash/invoke';
import {shipLotteryActions} from './actions';

const handleMarkLotteryAsShipped = payload => {
  return dispatch => {
    const {onError, lotteryId, cancelTag} = payload;

    const onGetSuccess = data => {
      const {lottery, error} = data;
      if (error) {
        return handleError({error, onError});
      }
      invoke(payload, 'onSuccess');
      return dispatch({
        type: shipLotteryActions.markLotteryAsShipped,
        payload: lottery,
      });
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
