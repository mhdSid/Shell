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
            return {...action.payload};
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
