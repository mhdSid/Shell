import {getMyLotteries} from '../../services/Lotteries';
import {handleError} from '../Auth/actions';
import invoke from 'lodash/invoke';
import {lotteryDetailsActions} from './actions';

const handleFetchUserLotteries = payload => {
  return (dispatch, getState) => {
    const {userId, onError, cancelTag} = payload;
    const pageToken = getState().lotteryDetailsReducer.userLotteriesPageToken;
    const onGetSuccess = data => {
      const {myLotteries, error, nextPageToken} = data;
      if (error) {
        return handleError({error, onError}, getState);
      }
      dispatch({
        type: lotteryDetailsActions.setUserLotteriesPageToken,
        payload: nextPageToken,
      });
      invoke(payload, 'onSuccess');
      if (pageToken !== nextPageToken) {
        return dispatch({
          type: lotteryDetailsActions.setUserLotteries,
          payload: myLotteries || [],
        });
      }
    };
    if (pageToken !== false) {
      return getMyLotteries({userId, cancelTag, pageToken}).then(
        onGetSuccess,
        error => {
          return handleError({error, onError}, getState);
        },
      );
    }
    invoke(payload, 'onSuccess');
    return;
  };
};
export {handleFetchUserLotteries};
