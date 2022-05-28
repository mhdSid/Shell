import {likeLottery} from '../../services/Lotteries';
import {handleError} from '../Auth/actions';
import invoke from 'lodash/invoke';
import {lotteriesActions} from './actions';
import {homeActions} from '../Home/actions';
import {lotteryDetailsActions} from '../LotteryDetails/actions';
import {receiveLotteryActions} from '../ReceiveLottery/actions';
import {chatActions} from '../Chat/actions';

export const handleLikeLottery = payload => {
  return (dispatch, getState) => {
    const {userId, lotteryId, onError, showLotteryDetails, cancelTag} = payload;
    const onGetMyLotteriesSuccess = data => {
      const {likedLottery, error} = data;
      if (error) {
        return handleError({error, onError}, getState);
      }
      invoke(payload, 'onSuccess');
      if (likedLottery) {
        if (showLotteryDetails) {
          dispatch({
            type: lotteryDetailsActions.showLotteryDetails,
            payload: {
              ...likedLottery,
              resetState: false,
            },
          });
        }
        dispatch({
          type: homeActions.likeLottery,
          payload: likedLottery,
        });
        dispatch({
          type: lotteriesActions.likeLottery,
          payload: likedLottery,
        });
        dispatch({
          type: receiveLotteryActions.likeLottery,
          payload: likedLottery,
        });
        return dispatch({
          type: chatActions.likeLottery,
          payload: likedLottery,
        });
      }
    };
    return likeLottery({userId, lotteryId, cancelTag}).then(
      onGetMyLotteriesSuccess,
      error => {
        return handleError({error, onError}, getState);
      },
    );
  };
};
