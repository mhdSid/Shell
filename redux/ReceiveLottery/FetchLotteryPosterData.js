import {getUsersData} from '../../services/Auth';
import {handleError} from '../Home/actions';
import invoke from 'lodash/invoke';
import {receiveLotteryActions} from './actions';

const handleFetchLotteryPosterData = payload => {
  return (dispatch, getState) => {
    const {lotteryPosterId, onEror, cancelTag} = payload;
    const onGetUsersDataSuccess = data => {
      let {error, users} = data;
      if (error) {
        return handleError({error, onEror}, getState);
      }
      if (Array.isArray(users) && users.length) {
        dispatch({
          type: receiveLotteryActions.setLotteryPosterData,
          payload: users[0],
        });
      }
      return invoke(payload, 'onSuccess');
    };
    return getUsersData({users: [lotteryPosterId], cancelTag}).then(
      onGetUsersDataSuccess,
      error => {
        return handleError({error, onEror}, getState);
      },
    );
  };
};

export {handleFetchLotteryPosterData};
