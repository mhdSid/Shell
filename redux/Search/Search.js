import {search} from '../../services/Lotteries';
import {handleError} from '../Auth/actions';
import invoke from 'lodash/invoke';
import {homeActions} from '../Home/actions';

const handleSearch = payload => {
  return (dispatch, getState) => {
    const {onError, cancelTag} = payload;
    const searchFilters = getState().searchReducer.searchFilters;
    const onSeachSuccess = data => {
      const {error, lotteries} = data;
      if (error) {
        return handleError({error, onError}, getState);
      }
      invoke(payload, 'onSuccess');
      dispatch({
        type: homeActions.resetLotteries,
        payload: Array.isArray(lotteries) && lotteries.length ? lotteries : [],
      });
    };
    return search({searchFilters, cancelTag}).then(onSeachSuccess, error => {
      return handleError({error, onError}, getState);
    });
  };
};

export {handleSearch};
