import {dislikeLottery} from '../../services/Lotteries';
import {handleError} from '../Auth/actions';
import invoke from 'lodash/invoke';
import {lotteriesActions} from './actions';
import {homeActions} from '../Home/actions';
import {lotteryDetailsActions} from '../LotteryDetails/actions';

const handleDislikeLottery = payload => {
  return dispatch => {
    const {userId, lotteryId, onError, showLotteryDetails, cancelTag} = payload;
    const onGetMyLotteriesSuccess = data => {
      const {dislikedLottery, error} = data;
      if (error) {
        return handleError({error, onError});
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
        return;
      }
      return;
    };
    return dislikeLottery({userId, lotteryId, cancelTag}).then(
      onGetMyLotteriesSuccess,
      error => {
        return handleError({error, onError});
      },
    );
  };
};
export {handleDislikeLottery};
