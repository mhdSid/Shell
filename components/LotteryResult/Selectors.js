import {uniqBy} from 'lodash';
import {createSelector} from 'reselect';

const getLotteryResult = state => state.lotteryResultReducer.lotteryResult;
const getAdPosterData = state => state.lotteryResultReducer.adPosterData;
const getLotteryUsersData = state =>
  state.lotteryResultReducer.lotteryUsersData;
const getWinnerUserData = state => state.lotteryResultReducer.winnerUserData;

const getLotteryResultSelector = createSelector(
  [getLotteryResult],
  lotteryResult => lotteryResult,
);

const getAdPosterDataSelector = createSelector(
  [getAdPosterData],
  adPosterData => adPosterData,
);

const getLotteryUsersDataSelector = createSelector(
  [getLotteryUsersData],
  lotteryUsersData => {
    if (Array.isArray(lotteryUsersData) && lotteryUsersData.length) {
      let lotteryUsers = [...lotteryUsersData];
      for (let i = 0; i < lotteryUsers.length; i++) {
        lotteryUsers[i].userJoinedLotteryCount = 1;
        for (let j = i + 1; j < lotteryUsers.length; j++) {
          if (`${lotteryUsers[i].id}` === `${lotteryUsers[j].id}`) {
            lotteryUsers[i].userJoinedLotteryCount += 1;
          }
        }
      }
      return uniqBy([...lotteryUsers], 'id');
    }
    return null;
  },
);

const getWinnerUserDataSelector = createSelector(
  [getWinnerUserData],
  winnerUserData => winnerUserData,
);

export {
  getLotteryResultSelector,
  getAdPosterDataSelector,
  getLotteryUsersDataSelector,
  getWinnerUserDataSelector,
};
