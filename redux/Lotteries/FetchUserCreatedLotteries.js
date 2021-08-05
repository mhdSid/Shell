import {getUserCreatedLotteries} from '../../services/Lotteries';
import {handleError} from '../Auth/actions';
import invoke from 'lodash/invoke';
import {lotteriesActions} from './actions';

const handleFetchUserCreatedLotteries = payload => {
  return dispatch => {
    const {userId, onError} = payload;
    const onGetMyLotteriesSuccess = data => {
      const {myLotteries: userCreatedLotteries, error} = data;
      if (error) {
        return handleError({error, onError});
      }
      invoke(payload, 'onSuccess');
      return dispatch({
        type: lotteriesActions.setUserCreatedLotteries,
        payload: userCreatedLotteries || [],
      });
    };
    return getUserCreatedLotteries({userId}).then(
      onGetMyLotteriesSuccess,
      error => {
        return handleError({error, onError});
      },
    );
  };
};
export {handleFetchUserCreatedLotteries};
