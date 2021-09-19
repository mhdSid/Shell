import {markLotteryAsReceived} from '../../services/Lotteries';
import {handleError} from '../Auth/actions';
import invoke from 'lodash/invoke';
import {receiveLotteryActions} from './actions';

const handleMarkLotteryAsReceived = payload => {
  return dispatch => {
    const {onError, lotteryId, cancelTag} = payload;

    const onGetSuccess = data => {
      const {lottery, error} = data;
      if (error) {
        return handleError({error, onError});
      }
      invoke(payload, 'onSuccess');
      return dispatch({
        type: receiveLotteryActions.markLotteryAsReceived,
        payload: lottery,
      });
    };
    return markLotteryAsReceived({lotteryId, cancelTag}).then(
      onGetSuccess,
      error => {
        return handleError({error, onError});
      },
    );
  };
};
export {handleMarkLotteryAsReceived};
