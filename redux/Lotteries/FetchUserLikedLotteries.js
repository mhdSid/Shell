import {getUserLikedLotteries} from '../../services/Lotteries';
import {handleError} from '../Auth/actions';
import invoke from 'lodash/invoke';
import {lotteriesActions} from './actions';

const handleFetchUserLikedLotteries = payload => {
  return dispatch => {
    const {userId, onError} = payload;
    const onGetMyLotteriesSuccess = data => {
      const {likedLotteries, error} = data;
      if (error) {
        return handleError({error, onError});
      }
      invoke(payload, 'onSuccess');
      return dispatch({
        type: lotteriesActions.setUserLikedLotteries,
        payload: likedLotteries || [],
      });
    };
    return getUserLikedLotteries({userId}).then(
      onGetMyLotteriesSuccess,
      error => {
        return handleError({error, onError});
      },
    );
  };
};
export {handleFetchUserLikedLotteries};
