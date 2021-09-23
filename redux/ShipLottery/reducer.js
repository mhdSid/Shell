import {shipLotteryActions} from './actions';

const initialState = {
  shipLotteryDetails: undefined,
  userCreatedWonLotteries: undefined,
  lotteryWinnerData: undefined,
};

const shipLotteryReducer = (state = initialState, action) => {
  switch (action.type) {
    case shipLotteryActions.showShipLotteryModal: {
      return {
        ...state,
        lotteryWinnerData: undefined,
        shipLotteryDetails: action.payload,
      };
    }
    case shipLotteryActions.setLotteryWinnerUserData: {
      return {
        ...state,
        lotteryWinnerData: action.payload,
      };
    }
    case shipLotteryActions.markLotteryAsShipped: {
      const userCreatedWonLotteries = [...state.userCreatedWonLotteries];
      return {
        ...state,
        userCreatedWonLotteries: userCreatedWonLotteries.map(lottery => {
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
    case shipLotteryActions.setUserCreatedWonLotteries: {
      return {
        ...state,
        userCreatedWonLotteries: action.payload,
      };
    }
    case shipLotteryActions.editLottery: {
      if (
        action.payload &&
        Array.isArray(state.userCreatedWonLotteries) &&
        state.userCreatedWonLotteries.length
      ) {
        return {
          ...state,
          userCreatedWonLotteries: state.userCreatedWonLotteries.map(item => {
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
    case shipLotteryActions.cancelLottery: {
      if (
        action.payload &&
        Array.isArray(state.userCreatedWonLotteries) &&
        state.userCreatedWonLotteries.length
      ) {
        return {
          ...state,
          userCreatedWonLotteries: state.userCreatedWonLotteries.map(item => {
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
    case shipLotteryActions.resetState: {
      return {
        shipLotteryDetails: undefined,
        userCreatedWonLotteries: undefined,
        lotteryWinnerData: undefined,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default shipLotteryReducer;
