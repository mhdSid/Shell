import {dislikeLottery} from '../../services/Lotteries';
import {handleError} from '../Auth/actions';
import invoke from 'lodash/invoke';
import {lotteriesActions} from './actions';
import {homeActions} from '../Home/actions';
import {lotteryDetailsActions} from '../LotteryDetails/actions';

const handleDislikeLottery = payload => {
  return dispatch => {
    const {
      userId,
      lotteryId,
      onError,
      showLotteryDetails,
      isFromLikedLotteriesView,
    } = payload;
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
        dispatch({
          type: lotteriesActions.setUserJoinedLotteries,
          payload: dislikedLottery,
        });
        if (isFromLikedLotteriesView) {
          dispatch({
            type: lotteriesActions.setUserLikedLotteries,
            payload: {
              ...dislikedLottery,
              remove: true,
            },
          });
        }
        return;
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
