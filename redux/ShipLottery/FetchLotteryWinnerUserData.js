import {getUsersData} from '../../services/Auth';
import {handleError} from '../Home/actions';
import invoke from 'lodash/invoke';
import {shipLotteryActions} from './actions';

const handleFetchLotteryWinnerUserData = payload => {
  return dispatch => {
    const {winnerUserId, onEror, cancelTag} = payload;
    const onGetUsersDataSuccess = data => {
      let {error, users} = data;
      if (error) {
        return handleError({error, onEror});
      }
      if (Array.isArray(users) && users.length) {
        dispatch({
          type: shipLotteryActions.setLotteryWinnerUserData,
          payload: users[0],
        });
      }
      return invoke(payload, 'onSuccess');
    };
    return getUsersData({users: [winnerUserId], cancelTag}).then(
      onGetUsersDataSuccess,
      error => {
        return handleError({error, onEror});
      },
    );
  };
};

export {handleFetchLotteryWinnerUserData};
