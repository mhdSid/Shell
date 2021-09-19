import {receiveLotteryActions} from './actions';

const initialState = {
  receiveLotteryDetails: undefined,
  userWonLotteries: undefined,
  lotteryPosterData: undefined,
  // pageToken: null,
};

const receiveLotteryReducer = (state = initialState, action) => {
  switch (action.type) {
    case receiveLotteryActions.showReceiveLotteryModal: {
      return {
        ...state,
        lotteryPosterData: undefined,
        receiveLotteryDetails: action.payload,
      };
    }
    // case receiveLotteryActions.setUserWonLotteries: {
    //   const stateLotteries = Array.isArray(state.userWonLotteries)
    //     ? [...state.userWonLotteries]
    //     : [];
    //   let userWonLotteries = [...stateLotteries];
    //   if (Array.isArray(action.payload) && action.payload.length) {
    //     userWonLotteries = [...userWonLotteries, ...action.payload];
    //   }
    //   return {
    //     ...state,
    //     userWonLotteries,
    //   };
    // }
    case receiveLotteryActions.setUserWonLotteries: {
      return {
        ...state,
        userWonLotteries: action.payload,
      };
    }
    case receiveLotteryActions.markLotteryAsReceived: {
      const userWonLotteries = [...state.userWonLotteries];
      return {
        ...state,
        userWonLotteries: userWonLotteries.map(lottery => {
          if (`${lottery.id}` === `${action.payload.id}`) {
            return {...action.payload};
          }
          return lottery;
        }),
      };
    }
    case receiveLotteryActions.setLotteryPosterData: {
      return {
        ...state,
        lotteryPosterData: action.payload,
      };
    }
    case receiveLotteryActions.resetState: {
      return {
        receiveLotteryDetails: undefined,
        userWonLotteries: undefined,
        lotteryPosterData: undefined,
      };
    }
    // case receiveLotteryActions.setPageToken: {
    //   return {
    //     ...state,
    //     pageToken: action.payload,
    //   };
    // }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default receiveLotteryReducer;
