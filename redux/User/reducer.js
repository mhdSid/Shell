import {userActions} from './actions';

const initialState = {
  myAds: undefined,
  myLotteries: undefined,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActions.SETMYADS: {
      return {
        ...state,
        myAds: action.payload,
      };
    }
    case userActions.SETMYLOTTERIES: {
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
