import {getUserJoinedLotteries} from '../../services/Lotteries';
import {handleError} from '../Auth/actions';
import invoke from 'lodash/invoke';
import {lotteriesActions} from './actions';

const handleFetchUserJoinedLotteries = payload => {
  return dispatch => {
    const {onError, userId, cancelTag} = payload;
    const onGetLotteriesSuccess = data => {
      const {lotteries, error} = data;
      if (error) {
        return handleError({error, onError});
      }
      invoke(payload, 'onSuccess');
      return dispatch({
        type: lotteriesActions.setUserJoinedLotteries,
        payload: lotteries || [],
      });
    };
    return getUserJoinedLotteries({userId, cancelTag}).then(
      onGetLotteriesSuccess,
      error => {
        return handleError({error, onError});
      },
    );
  };
};
export {handleFetchUserJoinedLotteries};
