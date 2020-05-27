import {adDetailsActions} from './actions';

const initialState = {
  lotteryUsersData: undefined,
  adPosterData: undefined,
  winnerUserData: undefined,
  adDetails: undefined,
  userAds: undefined,
};

const adDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case adDetailsActions.SETLOTTERYUSERSDATA: {
      return {
        ...state,
        lotteryUsersData: action.payload,
      };
    }
    case adDetailsActions.SETWINNERUSERDATA: {
      return {
        ...state,
        winnerUserData: action.payload,
      };
    }
    case adDetailsActions.FETCHUSERADS: {
      const {payload} = action;
      if (Array.isArray(payload) && payload.length > 0) {
        return {
          ...state,
          userAds: [...payload],
        };
      }
      return {
        ...state,
        userAds: undefined,
      };
    }
    case adDetailsActions.SETADPOSTERDATA: {
      return {
        ...state,
        adPosterData: action.payload,
      };
    }
    case adDetailsActions.SHOWADDETAILS: {
      return {
        ...state,
        adDetails: action.payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default adDetailsReducer;
