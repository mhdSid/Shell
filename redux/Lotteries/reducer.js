// import {adActions} from './actions';

const initialState = {
  lotteries: undefined,
};

const lotteriesReducer = (state = initialState, action) => {
  console.log('lotteriesReducer: ', action);

  switch (action.type) {
    // case adActions.importAd: {
    //   return {
    //     ...state,
    //     ...action.payload,
    //   };
    // }

    default: {
      return {
        ...initialState,
      };
    }
  }
};

export default lotteriesReducer;
