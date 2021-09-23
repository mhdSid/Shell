// import {uniqBy} from 'lodash';
import {createSelector} from 'reselect';

const getLotteries = state => state.lotteriesReducer.lotteries;
const getUsers = state => state.authReducer.user;
const getAdPosterData = state => state.lotteryDetailsReducer.adPosterData;
// const getLotteryUsersData = state => state.lotteryDetailsReducer.lotteryUsersData;
const getWinnerUserData = state => state.lotteryDetailsReducer.winnerUserData;
const getUserLotteries = state => state.lotteryDetailsReducer.userLotteries;

const getLotteriesSelector = createSelector(
  [getLotteries],
  lotteries => lotteries,
);

const getUsersSelector = createSelector(
  [getUsers],
  users => users,
);

const getAdPosterDataSelector = createSelector(
  [getAdPosterData],
  adPosterData => adPosterData,
);

// const getLotteryUsersDataSelector = createSelector(
//   [getLotteryUsersData],
//   lotteryUsersData => {
//     if (Array.isArray(lotteryUsersData) && lotteryUsersData.length) {
//       let lotteryUsers = [...lotteryUsersData];
//       for (let i = 0; i < lotteryUsers.length; i++) {
//         lotteryUsers[i].userJoinedLotteryCount = 1;
//         for (let j = i + 1; j < lotteryUsers.length; j++) {
//           if (`${lotteryUsers[i].id}` === `${lotteryUsers[j].id}`) {
//             lotteryUsers[i].userJoinedLotteryCount += 1;
//           }
//         }
//       }
//       return uniqBy([...lotteryUsers], 'id');
//     }
//     return null;
//   },
// );

const getWinnerUserDataSelector = createSelector(
  [getWinnerUserData],
  winnerUserData => winnerUserData,
);

const getUserLotteriesSelector = createSelector(
  [getUserLotteries],
  userLotteries => userLotteries,
);

export {
  getLotteriesSelector,
  getUsersSelector,
  getAdPosterDataSelector,
  // getLotteryUsersDataSelector,
  getWinnerUserDataSelector,
  getUserLotteriesSelector,
};
