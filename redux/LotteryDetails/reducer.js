import {isNil} from 'lodash';
import {lotteryDetailsActions} from './actions';

const initialState = {
  // lotteryUsersData: undefined,
  adPosterData: undefined,
  winnerUserData: undefined,
  lotteryDetails: undefined,
  userLotteries: undefined,
  userLotteriesPageToken: null,
};

const lotteryDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case lotteryDetailsActions.setUserLotteriesPageToken: {
      return {
        ...state,
        userLotteriesPageToken: action.payload,
      };
    }
    // case lotteryDetailsActions.setLotteryUsersData: {
    //   return {
    //     ...state,
    //     lotteryUsersData: action.payload,
    //   };
    // }
    case lotteryDetailsActions.setWinnerUserData: {
      return {
        ...state,
        winnerUserData: action.payload,
      };
    }
    case lotteryDetailsActions.setUserLotteries: {
      let userLotteries = [];
      if (Array.isArray(state.userLotteries) && state.userLotteries.length) {
        userLotteries = [...userLotteries, ...state.userLotteries];
      }
      if (Array.isArray(action.payload) && action.payload.length) {
        userLotteries = [...userLotteries, ...action.payload];
      }
      return {
        ...state,
        userLotteries,
      };
    }
    // case lotteryDetailsActions.setUserLotteries: {
    //   const {payload} = action;
    //   const currentLotteries = state.userLotteries;
    //   let updatedLotteries = [];
    //   if (Array.isArray(currentLotteries) && currentLotteries.length) {
    //     updatedLotteries = updatedLotteries.concat(currentLotteries);
    //   }
    //   if (Array.isArray(payload) && payload.length) {
    //     updatedLotteries = updatedLotteries.concat(payload);
    //   }
    //   return {
    //     ...state,
    //     userLotteries: updatedLotteries.length ? updatedLotteries : undefined,
    //   };
    // }
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
        };
        if (
          !isNil(action.payload.resetState) &&
          action.payload.resetState === false
        ) {
          return {
            ...state,
            lotteryDetails,
          };
        }
        return {
          // lotteryUsersData: undefined,
          userLotteriesPageToken: null,
          adPosterData: undefined,
          winnerUserData: undefined,
          userLotteries: undefined,
          lotteryDetails,
        };
      }
      return {
        // lotteryUsersData: undefined,
        adPosterData: undefined,
        winnerUserData: undefined,
        userLotteries: undefined,
        lotteryDetails: undefined,
        userLotteriesPageToken: null,
      };
    }
    case lotteryDetailsActions.cancelLottery: {
      if (action.payload) {
        return {
          ...state,
          lotteryDetails: {
            ...state.lotteryDetails,
            ...action.payload,
          },
          userLotteries:
            Array.isArray(state.userLotteries) && state.userLotteries.length
              ? state.userLotteries.map(item => {
                  if (`${item.id}` === `${action.payload.id}`) {
                    return {
                      ...action.payload,
                      id: `${action.payload.id}`,
                      userId: `${action.payload.userId}`,
                    };
                  }
                  return item;
                })
              : state.userLotteries,
        };
      }
      return {
        ...state,
      };
    }
    case lotteryDetailsActions.resetState: {
      return {
        // lotteryUsersData: undefined,
        adPosterData: undefined,
        winnerUserData: undefined,
        lotteryDetails: undefined,
        userLotteries: undefined,
        userLotteriesPageToken: null,
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
