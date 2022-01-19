import {receiveLotteryActions} from './actions';

const initialState = {
  receiveLotteryDetails: undefined,
  userWonLotteries: undefined,
  lotteryPosterData: undefined,
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
    case receiveLotteryActions.setUserWonLotteries: {
      return {
        ...state,
        userWonLotteries: action.payload,
      };
    }
    case receiveLotteryActions.markLotteryAsReceived: {
      const userWonLotteries = [...(state.userWonLotteries || [])];
      return {
        ...state,
        userWonLotteries: userWonLotteries.map(lottery => {
          if (`${lottery.id}` === `${action.payload.id}`) {
            return {
              ...action.payload,
              id: `${action.payload.id}`,
              userId: `${action.payload.userId}`,
            };
          }
          return lottery;
        }),
      };
    }
    case receiveLotteryActions.enterLottery: {
      if (
        action.payload &&
        Array.isArray(state.userWonLotteries) &&
        state.userWonLotteries.length
      ) {
        return {
          ...state,
          userWonLotteries: state.userWonLotteries.map(item => {
            if (`${item.id}` === `${action.payload.id}`) {
              return {
                ...action.payload,
                id: `${action.payload.id}`,
                userId: `${action.payload.userId}`,
              };
            }
            return item;
          }),
        };
      }
      return {
        ...state,
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
    case receiveLotteryActions.likeLottery: {
      let {userWonLotteries: lotteries, receiveLotteryDetails} = state;
      const lottery = action.payload;
      let updatedState = {};
      if (lottery && lottery.id && lotteries && lotteries.length) {
        updatedState = {
          ...state,
          ...updatedState,
          userWonLotteries: lotteries.map(item => {
            if (`${item.id}` === `${lottery.id}`) {
              return {
                ...lottery,
                id: `${lottery.id}`,
                userId: `${lottery.userId}`,
              };
            }
            return item;
          }),
        };
      }
      if (
        receiveLotteryDetails &&
        `${receiveLotteryDetails.id}` === `${lottery.id}`
      ) {
        updatedState = {
          ...updatedState,
          receiveLotteryDetails: {
            ...receiveLotteryDetails,
            likedBy: lottery.likedBy,
          },
        };
      }
      return {
        ...state,
        ...updatedState,
      };
    }
    case receiveLotteryActions.dislikeLottery: {
      let {userWonLotteries: lotteries, receiveLotteryDetails} = state;
      const lottery = action.payload;
      let updatedState = {};
      if (lottery && lottery.id && lotteries && lotteries.length) {
        updatedState = {
          ...state,
          ...updatedState,
          userWonLotteries: lotteries.map(item => {
            if (`${item.id}` === `${lottery.id}`) {
              return {
                ...lottery,
                id: `${lottery.id}`,
                userId: `${lottery.userId}`,
              };
            }
            return item;
          }),
        };
      }
      if (
        receiveLotteryDetails &&
        `${receiveLotteryDetails.id}` === `${lottery.id}`
      ) {
        updatedState = {
          ...updatedState,
          receiveLotteryDetails: {
            ...receiveLotteryDetails,
            likedBy: lottery.likedBy,
          },
        };
      }
      return {
        ...state,
        ...updatedState,
      };
    }
    case receiveLotteryActions.cancelLottery: {
      if (
        action.payload &&
        Array.isArray(state.userWonLotteries) &&
        state.userWonLotteries.length
      ) {
        return {
          ...state,
          userWonLotteries: state.userWonLotteries.map(item => {
            if (`${item.id}` === `${action.payload.id}`) {
              return {
                ...action.payload,
                id: `${action.payload.id}`,
                userId: `${action.payload.userId}`,
              };
            }
            return item;
          }),
        };
      }
      return {
        ...state,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default receiveLotteryReducer;
