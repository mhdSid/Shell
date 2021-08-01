import uniq from 'lodash/uniq';
import {adDetailsActions} from './actions';

const initialState = {
  lotteryUsersData: undefined,
  adPosterData: undefined,
  winnerUserData: undefined,
  adDetails: undefined,
  userAds: undefined,
};

const adDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case adDetailsActions.setLotteryUsersData: {
      return {
        ...state,
        lotteryUsersData: action.payload,
      };
    }
    case adDetailsActions.setWinnerUserData: {
      return {
        ...state,
        winnerUserData: action.payload,
      };
    }
    case adDetailsActions.fetchUserAds: {
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
    case adDetailsActions.setAdPosterData: {
      return {
        ...state,
        adPosterData: action.payload,
      };
    }
    case adDetailsActions.showAdDetails: {
      if (action.payload) {
        const adDetails = {
          ...action.payload,
          // lotteryUserIds: action.payload.lotteryUserIds || [],
        };
        return {
          lotteryUsersData: undefined,
          adPosterData: undefined,
          winnerUserData: undefined,
          userAds: undefined,
          adDetails,
        };
      }
      return {
        lotteryUsersData: undefined,
        adPosterData: undefined,
        winnerUserData: undefined,
        userAds: undefined,
        adDetails: undefined,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default adDetailsReducer;
