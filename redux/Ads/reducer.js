import {adActions} from './actions';
import {ENTRIES1} from '../../Constants/CarouselEntries';

const initialState = {
  ads: ENTRIES1,
};

const adsReducer = (state = initialState, action) => {
  console.log('adsReducer: ', action);

  switch (action.type) {
    case adActions.importAd: {
      let {ads} = state;
      if (Array.isArray(action.payload)) {
        ads = ads.concat(action.payload);
      } else {
        ads = [...ads, action.payload];
      }

      return {
        ...state,
        ads,
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
