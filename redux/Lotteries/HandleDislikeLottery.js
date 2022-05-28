import {dislikeLottery} from '../../services/Lotteries';
import {handleError} from '../Auth/actions';
import invoke from 'lodash/invoke';
import {lotteriesActions} from './actions';
import {homeActions} from '../Home/actions';
import {lotteryDetailsActions} from '../LotteryDetails/actions';
import {receiveLotteryActions} from '../ReceiveLottery/actions';
import {chatActions} from '../Chat/actions';

export const handleDislikeLottery = payload => {
  return (dispatch, getState) => {
    const {userId, lotteryId, onError, showLotteryDetails, cancelTag} = payload;
    const onGetMyLotteriesSuccess = data => {
      const {dislikedLottery, error} = data;
      if (error) {
        return handleError({error, onError}, getState);
      }
      invoke(payload, 'onSuccess');
      if (dislikedLottery) {
        if (showLotteryDetails) {
          dispatch({
            type: lotteryDetailsActions.showLotteryDetails,
            payload: {
              ...dislikedLottery,
              resetState: false,
            },
          });
        }
        dispatch({
          type: homeActions.dislikeLottery,
          payload: dislikedLottery,
        });
        dispatch({
          type: lotteriesActions.dislikeLottery,
          payload: dislikedLottery,
        });
        dispatch({
          type: receiveLotteryActions.dislikeLottery,
          payload: dislikedLottery,
        });
        return dispatch({
          type: chatActions.dislikeLottery,
          payload: dislikedLottery,
        });
      }
    };
    return dislikeLottery({userId, lotteryId, cancelTag}).then(
      onGetMyLotteriesSuccess,
      error => {
        return handleError({error, onError}, getState);
      },
    );
  };
};
