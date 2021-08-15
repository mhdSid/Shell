import {lotteryResultActions} from './actions';

const initialState = {
  lotteryUsersData: undefined,
  adPosterData: undefined,
  winnerUserData: undefined,
  lotteryResult: undefined,
};

const lotteryResultReducer = (state = initialState, action) => {
  switch (action.type) {
    case lotteryResultActions.setLotteryUsersData: {
      return {
        ...state,
        lotteryUsersData: action.payload,
      };
    }
    case lotteryResultActions.setWinnerUserData: {
      return {
        ...state,
        winnerUserData: action.payload,
      };
    }
    case lotteryResultActions.setAdPosterData: {
      return {
        ...state,
        adPosterData: action.payload,
      };
    }
    case lotteryResultActions.showLotteryResult: {
      if (action.payload) {
        return {
          lotteryUsersData: undefined,
          adPosterData: undefined,
          winnerUserData: undefined,
          lotteryResult: {
            ...action.payload,
          },
        };
      }
      return {
        lotteryResult: undefined,
        lotteryUsersData: undefined,
        adPosterData: undefined,
        winnerUserData: undefined,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default lotteryResultReducer;
