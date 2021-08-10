import {isNil} from 'lodash';
import {lotteryDetailsActions} from './actions';

const initialState = {
  lotteryUsersData: undefined,
  adPosterData: undefined,
  winnerUserData: undefined,
  lotteryDetails: undefined,
  userAds: undefined,
};

const lotteryDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case lotteryDetailsActions.setLotteryUsersData: {
      return {
        ...state,
        lotteryUsersData: action.payload,
      };
    }
    case lotteryDetailsActions.setWinnerUserData: {
      return {
        ...state,
        winnerUserData: action.payload,
      };
    }
    case lotteryDetailsActions.fetchUserAds: {
      const {payload} = action;
      if (Array.isArray(payload) && payload.length > 0) {
        return {
          ...state,
          userAds: [...payload],
        };
      }
      return {
        ...state,
        userAds: undefined,
      };
    }
    case lotteryDetailsActions.setAdPosterData: {
      return {
        ...state,
        adPosterData: action.payload,
      };
    }
    case lotteryDetailsActions.showLotteryDetails: {
      if (action.payload) {
        const lotteryDetails = {
          ...action.payload,
          lotteryUserIds: action.payload.lotteryUserIds || [],
        };
        return {
          lotteryUsersData: undefined,
          adPosterData: undefined,
          winnerUserData: undefined,
          userAds: undefined,
          lotteryDetails,
        };
      }
      return {
        lotteryUsersData: undefined,
        adPosterData: undefined,
        winnerUserData: undefined,
        userAds: undefined,
        lotteryDetails: undefined,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default lotteryDetailsReducer;
