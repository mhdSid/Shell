import {lotteriesActions} from './actions';

const initialState = {
  lotteries: undefined,
};

const lotteriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case lotteriesActions.fetchLotteries: {
      return {
        ...state,
        lotteries: action.payload,
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
