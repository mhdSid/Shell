import {getUsersData} from '../../services/Auth';
import {handleError} from '../Ads/actions';
import invoke from 'lodash/invoke';
import {adDetailsActions} from './actions';

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
        let lotteryUsers = [];
        users.forEach(user => {
          if (user.id === winnerUserId) {
            dispatch({
              type: adDetailsActions.setWinnerUserData,
              payload: user,
            });
          } else if (user.id === userId) {
            dispatch({
              type: adDetailsActions.setAdPosterData,
              payload: user,
            });
          } else {
            lotteryUsers = [...lotteryUsers, user];
          }
        });
        console.log(lotteryUsers);
        dispatch({
          type: adDetailsActions.setLotteryUsersData,
          payload: lotteryUsers,
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
