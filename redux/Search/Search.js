import {search} from '../../services/Auth';
import {handleError} from '../Auth/actions';
import invoke from 'lodash/invoke';
import {homeActions} from '../Home/actions';

const handleSearch = payload => {
  return (dispatch, getState) => {
    const {onError, cancelTag} = payload;
    // const pageToken = getState().homeReducer.searchPageToken;
    const searchFilters = getState().searchReducer.searchFilters;
    const onSeachSuccess = data => {
      const {error, lotteries} = data; // nextPageToken
      // console.log(lotteries, pageToken, nextPageToken);
      if (error) {
        return handleError({error, onError});
      }
      // dispatch({
      //   type: homeActions.setSearchPageToken,
      //   payload: nextPageToken,
      // });
      invoke(payload, 'onSuccess');
      // if (pageToken !== nextPageToken) {
      dispatch({
        type: homeActions.resetLotteries,
        payload: Array.isArray(lotteries) && lotteries.length ? lotteries : [],
      });
      // }
    };
    // if (pageToken !== false) {
    return search({searchFilters, cancelTag}).then(
      // pageToken
      onSeachSuccess,
      error => {
        return handleError({error, onError});
      },
    );
    // }
    // invoke(payload, 'onSuccess');
    // return;
  };
};

export {handleSearch};
