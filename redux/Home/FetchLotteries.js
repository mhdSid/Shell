import {handleError, homeActions} from './actions';
import {getAds} from '../../services/Lotteries';
import invoke from 'lodash/invoke';

const handleFetchLotteries = payload => {
  return async (dispatch, getState) => {
    const {onError, cancelTag, resetLotteries} = payload;
    const pageToken = getState().homeReducer.pageToken;
    const onGetAdsSuccess = data => {
      invoke(payload, 'onSuccess');
      const {error, ads: lotteries, nextPageToken} = data;
      if (error) {
        return handleError({error, onError});
      }
      dispatch({
        type: homeActions.setPageToken,
        payload: nextPageToken,
      });
      if (pageToken !== nextPageToken) {
        if (resetLotteries) {
          return dispatch({
            type: homeActions.resetHomeLotteries,
            payload: lotteries,
          });
        }
        return dispatch({
          type: homeActions.setHomeLotteries,
          payload: lotteries,
        });
      }
    };
    if (pageToken !== false) {
      return getAds({
        pageToken,
        cancelTag,
      }).then(onGetAdsSuccess, error => {
        return handleError({error, onError});
      });
    }
    invoke(payload, 'onSuccess');
    return;
  };
};

export {handleFetchLotteries};
