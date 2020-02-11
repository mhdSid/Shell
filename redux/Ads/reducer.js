import {adActions} from './actions';
import {ENTRIES1} from '../../Constants/CarouselEntries';

const initialState = {
  ads: ENTRIES1,
};

const adsReducer = (state = initialState, action) => {
  console.log('adsReducer: ', action);

  switch (action.type) {
    case adActions.importAd: {
      return {
        ...state,
        ...action.payload,
      };
    }

    default: {
      return {
        ...initialState,
      };
    }
  }
};

export default adsReducer;
