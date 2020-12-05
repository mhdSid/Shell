import {getLotteries} from '../../services/Ads';
import {handleError} from '../Auth/actions';
import invoke from 'lodash/invoke';
import {lotteriesActions} from './actions';

const handleFetchLotteries = payload => {
  return dispatch => {
    const {onError} = payload;
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
    return getLotteries().then(onGetLotteriesSuccess, error => {
      return handleError({error, onError});
    });
  };
};
export {handleFetchLotteries};
