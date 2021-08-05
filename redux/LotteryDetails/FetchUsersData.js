import {getUsersData} from '../../services/Auth';
import {handleError} from '../Home/actions';
import invoke from 'lodash/invoke';
import {lotteryDetailsActions} from './actions';
import {uniq} from 'lodash';

const handleFetchUsersData = payload => {
  return dispatch => {
    const {users: adUsers, winnerUserId, userId, onEror} = payload;
    const onGetUsersDataSuccess = data => {
      let {error, users} = data;
      if (error) {
        return handleError({error, onEror});
      }
      users = users.filter(Boolean);
      if (Array.isArray(users) && users.length > 0) {
        users.forEach(user => {
          if (user.id === winnerUserId) {
            dispatch({
              type: lotteryDetailsActions.setWinnerUserData,
              payload: user,
            });
          } else if (user.id === userId) {
            dispatch({
              type: lotteryDetailsActions.setAdPosterData,
              payload: user,
            });
          }
        });
        dispatch({
          type: lotteryDetailsActions.setLotteryUsersData,
          payload: uniq(users, 'id'),
        });
      }
      return invoke(payload, 'onSuccess');
    };
    return getUsersData({users: adUsers}).then(onGetUsersDataSuccess, error => {
      return handleError({error, onEror});
    });
  };
};

export {handleFetchUsersData};
