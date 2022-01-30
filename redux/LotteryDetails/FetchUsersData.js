import {getUsersData} from '../../services/Auth';
import {handleError} from '../Home/actions';
import invoke from 'lodash/invoke';
import {lotteryDetailsActions} from './actions';

const handleFetchUsersData = payload => {
  return (dispatch, getState) => {
    const {
      users: adUsers,
      winnerUserId,
      userId,
      onEror,
      currentCollectedPrice,
      price,
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
          if (
            `${currentCollectedPrice}` === `${price}` &&
            `${user.id}` === `${winnerUserId}`
          ) {
            dispatch({
              type: lotteryDetailsActions.setWinnerUserData,
              payload: user,
            });
          } else if (`${user.id}` === `${userId}`) {
            dispatch({
              type: lotteryDetailsActions.setAdPosterData,
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
