import {likeLottery} from '../../services/Lotteries';
import {handleError} from '../Auth/actions';
import invoke from 'lodash/invoke';
import {lotteriesActions} from './actions';
import {homeActions} from '../Home/actions';
import {lotteryDetailsActions} from '../LotteryDetails/actions';

const handleLikeLottery = payload => {
  return dispatch => {
    const {userId, lotteryId, onError, showLotteryDetails} = payload;
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
        return dispatch({
          type: lotteriesActions.setUserLikedLotteries,
          payload: likedLottery,
        });
      }
      return;
    };
    return likeLottery({userId, lotteryId}).then(
      onGetMyLotteriesSuccess,
      error => {
        return handleError({error, onError});
      },
    );
  };
};
export {handleLikeLottery};
