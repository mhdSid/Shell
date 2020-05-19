import {adDetailsActions} from './actions';

const initialState = {
  lotteryUsersData: undefined,
  adPosterData: undefined,
  winnerUserData: undefined,
  adDetails: undefined,
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
