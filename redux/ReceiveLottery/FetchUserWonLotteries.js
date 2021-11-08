import {getUserWonLotteries} from '../../services/Lotteries';
import {handleError} from '../Auth/actions';
import invoke from 'lodash/invoke';
import {receiveLotteryActions} from './actions';

const handleFetchUserWonLotteries = payload => {
  return (dispatch, getState) => {
    const {onError, userId, cancelTag} = payload;

    const onGetLotteriesSuccess = data => {
      const {lotteries, error} = data;
      if (error) {
        return handleError({error, onError}, getState);
      }
      invoke(payload, 'onSuccess');
      return dispatch({
        type: receiveLotteryActions.setUserWonLotteries,
        payload: lotteries,
      });
    };
    return getUserWonLotteries({userId, cancelTag}).then(
      onGetLotteriesSuccess,
      error => {
        return handleError({error, onError}, getState);
      },
    );
  };
};
export {handleFetchUserWonLotteries};
