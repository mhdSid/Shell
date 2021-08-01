import {getMyJoinedLotteries} from '../../services/Ads';
import {handleError} from '../Auth/actions';
import invoke from 'lodash/invoke';
import {lotteriesActions} from './actions';

const handleFetchMyJoinedLotteries = payload => {
  return dispatch => {
    const {onError, userId} = payload;
    const onGetLotteriesSuccess = data => {
      const {lotteries, error} = data;
      if (error) {
        return handleError({error, onError});
      }
      invoke(payload, 'onSuccess');
      return dispatch({
        type: lotteriesActions.fetchLotteries,
        payload: lotteries || [],
      });
    };
    return getMyJoinedLotteries({userId}).then(onGetLotteriesSuccess, error => {
      return handleError({error, onError});
    });
  };
};
export {handleFetchMyJoinedLotteries};
