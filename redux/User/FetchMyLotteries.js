import {getMyCreatedLotteries} from '../../services/Ads';
import {handleError} from '../Auth/actions';
import invoke from 'lodash/invoke';
import {userActions} from './actions';

const handleFetchMyCreatedLotteries = payload => {
  return dispatch => {
    const {userId, onError} = payload;
    const onGetMyLotteriesSuccess = data => {
      const {myLotteries, error} = data;
      if (error) {
        return handleError({error, onError});
      }
      invoke(payload, 'onSuccess');
      return dispatch({
        type: userActions.setMyLotteries,
        payload: myLotteries || [],
      });
    };
    return getMyCreatedLotteries({userId}).then(onGetMyLotteriesSuccess, error => {
      return handleError({error, onError});
    });
  };
};
export {handleFetchMyCreatedLotteries};
