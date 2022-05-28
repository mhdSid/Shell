import {markLotteryAsReceived} from '../../services/Lotteries';
import {handleError} from '../Auth/actions';
import invoke from 'lodash/invoke';
import {receiveLotteryActions} from './actions';
import {homeActions} from '../Home/actions';
import {chatActions} from '../Chat/actions';
import {lotteriesActions} from '../Lotteries/actions';

export const handleMarkLotteryAsReceived = payload => {
  return (dispatch, getState) => {
    const {onError, lotteryId, cancelTag} = payload;

    const onGetSuccess = data => {
      const {lottery, error} = data;
      if (error) {
        return handleError({error, onError}, getState);
      }
      invoke(payload, 'onSuccess');
      if (lottery) {
        dispatch({
          type: receiveLotteryActions.markLotteryAsReceived,
          payload: lottery,
        });
        dispatch({
          type: homeActions.markLotteryAsReceived,
          payload: lottery,
        });
        dispatch({
          type: chatActions.markLotteryAsReceived,
          payload: lottery,
        });
        dispatch({
          type: lotteriesActions.markLotteryAsReceived,
          payload: lottery,
        });
      }
    };
    return markLotteryAsReceived({lotteryId, cancelTag}).then(
      onGetSuccess,
      error => {
        return handleError({error, onError}, getState);
      },
    );
  };
};
