import {likeLottery} from '../../services/Lotteries';
import {handleError} from '../Auth/actions';
import invoke from 'lodash/invoke';
import {lotteriesActions} from './actions';
import {homeActions} from '../Home/actions';
import {lotteryDetailsActions} from '../LotteryDetails/actions';

const handleLikeLottery = payload => {
  return dispatch => {
    const {
      userId,
      lotteryId,
      onError,
      showLotteryDetails,
      isFromLikedLotteriesView,
      cancelTag,
    } = payload;
    const onGetMyLotteriesSuccess = data => {
      const {likedLottery, error} = data;
      if (error) {
        return handleError({error, onError});
      }
      invoke(payload, 'onSuccess');
      if (likedLottery) {
        dispatch({
          type: homeActions.updateLottery,
          payload: likedLottery,
        });
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
          type: lotteriesActions.setUserJoinedLotteries,
          payload: likedLottery,
        });
        if (isFromLikedLotteriesView) {
          dispatch({
            type: lotteriesActions.setUserLikedLotteries,
            payload: likedLottery,
          });
        }
        return;
      }
      return;
    };
    return likeLottery({userId, lotteryId, cancelTag}).then(
      onGetMyLotteriesSuccess,
      error => {
        return handleError({error, onError});
      },
    );
  };
};
export {handleLikeLottery};
