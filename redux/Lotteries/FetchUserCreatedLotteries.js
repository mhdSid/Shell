import {getUserCreatedLotteries} from '../../services/Lotteries';
import {handleError} from '../Auth/actions';
import invoke from 'lodash/invoke';
import {lotteriesActions} from './actions';

const handleFetchUserCreatedLotteries = payload => {
  return (dispatch, getState) => {
    const {userId, onError, cancelTag} = payload;
    const pageToken = getState().lotteriesReducer.userCreatedLotteriesPageToken;
    const onGetMyLotteriesSuccess = data => {
      const {myLotteries: userCreatedLotteries, error, nextPageToken} = data;
      if (error) {
        return handleError({error, onError}, getState);
      }
      dispatch({
        type: lotteriesActions.setUserCreatedLotteriesPageToken,
        payload: nextPageToken,
      });
      invoke(payload, 'onSuccess');
      if (pageToken !== nextPageToken) {
        return dispatch({
          type: lotteriesActions.setUserCreatedLotteries,
          payload: userCreatedLotteries || [],
        });
      }
    };
    if (pageToken !== false) {
      return getUserCreatedLotteries({userId, pageToken, cancelTag}).then(
        onGetMyLotteriesSuccess,
        error => {
          return handleError({error, onError}, getState);
        },
      );
    }
    return invoke(payload, 'onSuccess');
  };
};
export {handleFetchUserCreatedLotteries};
