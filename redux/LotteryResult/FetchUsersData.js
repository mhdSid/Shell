import {getUsersData} from '../../services/Auth';
import {handleError} from '../Home/actions';
import invoke from 'lodash/invoke';
import {lotteryResultActions} from './actions';

const handleFetchUsersData = payload => {
  return dispatch => {
    const {
      users: adUsers,
      winnerUserId,
      userId,
      onEror,
      lotteryUserIds,
      currentCollectedPrice,
      cancelTag,
    } = payload;
    const onGetUsersDataSuccess = data => {
      let {error, users} = data;
      if (error) {
        return handleError({error, onEror});
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
        if (currentCollectedPrice > 0) {
          const lotteryUsersData = lotteryUserIds.map(item => {
            const lotteryUser = users.find(user => `${item}` === `${user.id}`);
            return {
              ...lotteryUser,
            };
          });
          dispatch({
            type: lotteryResultActions.setLotteryUsersData,
            payload: lotteryUsersData,
          });
        }
      }
      return invoke(payload, 'onSuccess');
    };
    return getUsersData({users: adUsers, cancelTag}).then(
      onGetUsersDataSuccess,
      error => {
        return handleError({error, onEror});
      },
    );
  };
};

export {handleFetchUsersData};
