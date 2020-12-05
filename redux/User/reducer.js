import {userActions} from './actions';

const initialState = {
  myAds: undefined,
  myLotteries: undefined,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActions.setMyAds: {
      return {
        ...state,
        myAds: action.payload,
      };
    }
    case userActions.setMyLotteries: {
      return {
        ...state,
        myLotteries: action.payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default userReducer;
