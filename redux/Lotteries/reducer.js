import {lotteriesActions} from './actions';

const initialState = {
  userJoinedLotteries: undefined,
  userCreatedLotteries: undefined,
};

const lotteriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case lotteriesActions.setUserCreatedLotteries: {
      return {
        ...state,
        userCreatedLotteries: action.payload,
      };
    }
    case lotteriesActions.setUserJoinedLotteries: {
      return {
        ...state,
        userJoinedLotteries: action.payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default lotteriesReducer;
