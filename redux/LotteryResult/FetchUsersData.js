import {getUsersData} from '../../services/auth';
import {handleError} from '../Home/actions';
import invoke from 'lodash/invoke';
import {lotteryResultActions} from './actions';

const handleFetchUsersData = payload => {
  return (dispatch, getState) => {
    const {
      users: adUsers,
      winnerUserId,
      userId,
      onEror,
      currentCollectedPrice,
      cancelTag,
    } = payload;
    const onGetUsersDataSuccess = data => {
      let {error, users} = data;
      if (error) {
        return handleError({error, onEror}, getState);
      }
      users = users.filter(Boolean);
      if (Array.isArray(users) && users.length) {
        users.forEach(user => {
          if (currentCollectedPrice > 0 && user.id === winnerUserId) {
            dispatch({
              type: lotteryResultActions.setWinnerUserData,
              payload: user,
            });
          } else if (`${user.id}` === `${userId}`) {
            dispatch({
              type: lotteryResultActions.setAdPosterData,
              payload: user,
            });
          }
        });
      }
      return invoke(payload, 'onSuccess');
    };
    return getUsersData({users: adUsers, cancelTag}).then(
      onGetUsersDataSuccess,
      error => {
        return handleError({error, onEror}, getState);
      },
    );
  };
};

export {handleFetchUsersData};
