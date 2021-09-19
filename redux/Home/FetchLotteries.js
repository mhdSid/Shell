import {handleError, homeActions} from './actions';
import {getAds} from '../../services/Lotteries';
import invoke from 'lodash/invoke';

const handleFetchLotteries = payload => {
  return async (dispatch, getState) => {
    const {onError, userId, cancelTag} = payload;
    const pageToken = getState().homeReducer.pageToken;
    const onGetAdsSuccess = data => {
      invoke(payload, 'onSuccess');
      const {error, ads: lotteries, nextPageToken} = data;
      console.log(userId, pageToken, nextPageToken, lotteries.length);
      if (error) {
        return handleError({error, onError});
      }
      dispatch({
        type: homeActions.setPageToken,
        payload: nextPageToken,
      });
      if (pageToken !== nextPageToken) {
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
