import {dislikeLottery} from '../../services/Lotteries';
import {handleError} from '../Auth/actions';
import invoke from 'lodash/invoke';
import {lotteriesActions} from './actions';
import {homeActions} from '../Home/actions';
import {lotteryDetailsActions} from '../LotteryDetails/actions';

const handleDislikeLottery = payload => {
  return dispatch => {
    const {userId, lotteryId, onError, showLotteryDetails} = payload;
    const onGetMyLotteriesSuccess = data => {
      const {dislikedLottery, error} = data;
      if (error) {
        return handleError({error, onError});
      }
      invoke(payload, 'onSuccess');
      if (dislikedLottery) {
        dispatch({
          type: homeActions.updateLottery,
          payload: dislikedLottery,
        });
        if (showLotteryDetails) {
          dispatch({
            type: lotteryDetailsActions.showLotteryDetails,
            payload: {
              ...dislikedLottery,
              resetState: false,
            },
          });
        }
        return dispatch({
          type: lotteriesActions.setUserLikedLotteries,
          payload: dislikedLottery,
        });
      }
      return;
    };
    return dislikeLottery({userId, lotteryId}).then(
      onGetMyLotteriesSuccess,
      error => {
        return handleError({error, onError});
      },
    );
  };
};
export {handleDislikeLottery};
