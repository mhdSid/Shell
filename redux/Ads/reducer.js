import {adActions} from './actions';
import {ENTRIES1} from '../../Constants/CarouselEntries';

// let set = new Set(ENTRIES1);
// set = Array.from(set);

const initialState = {
  ads: [],
};

const adsReducer = (state = initialState, action) => {
  // console.log('adsReducer: ', action);

  switch (action.type) {
    case adActions.importAd: {
      let {ads} = state;
      const newSet = new Set();

      if (Array.isArray(action.payload)) {
        ENTRIES1.forEach(item => {
          newSet.add(item);
        });
        action.payload.forEach(ad => {
          newSet.add({
            ...ad,
            images: ad.images.filter(Boolean),
          });
        });
      } else {
        ENTRIES1.forEach(item => {
          newSet.add(item);
        });
        newSet.add(action.payload);
      }
      // console.log('adsReducer: ', ads);

      ads = Array.from(newSet);

      // console.log('adsReducer: ', ads);

      return {
        // ...state,
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
