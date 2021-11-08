import {getChattableLotteries} from '../../services/Lotteries';
import {handleError} from '../Auth/actions';
import invoke from 'lodash/invoke';
import {chatActions} from './actions';

const handleFetchChattableLotteries = payload => {
  return (dispatch, getState) => {
    const {onError, userId, cancelTag} = payload;
    const onGetLotteriesSuccess = data => {
      const {chattableLotteries, error} = data;
      if (error) {
        return handleError({error, onError}, getState);
      }
      invoke(payload, 'onSuccess');
      return dispatch({
        type: chatActions.setChattableLotteries,
        payload: chattableLotteries,
      });
    };
    return getChattableLotteries({userId, cancelTag}).then(
      onGetLotteriesSuccess,
      error => {
        return handleError({error, onError}, getState);
      },
    );
  };
};
export {handleFetchChattableLotteries};
