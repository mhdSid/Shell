import {getUserCreatedWonLotteries} from '../../services/Lotteries';
import {handleError} from '../Auth/actions';
import invoke from 'lodash/invoke';
import {shipLotteryActions} from './actions';

const handleFetchUserCreatedWonLotteries = payload => {
  return (dispatch, getState) => {
    const {onError, userId, cancelTag} = payload;
    const onGetLotteriesSuccess = data => {
      const {lotteries, error} = data;
      if (error) {
        return handleError({error, onError}, getState);
      }
      invoke(payload, 'onSuccess');
      return dispatch({
        type: shipLotteryActions.setUserCreatedWonLotteries,
        payload: lotteries,
      });
    };
    return getUserCreatedWonLotteries({userId, cancelTag}).then(
      onGetLotteriesSuccess,
      error => {
        return handleError({error, onError}, getState);
      },
    );
  };
};
export {handleFetchUserCreatedWonLotteries};
