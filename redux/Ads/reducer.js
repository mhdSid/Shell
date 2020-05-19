import {adActions} from './actions';
import {ENTRIES1} from '../../Constants/CarouselEntries';

const initialState = {
  ads: [],
};

const adsReducer = (state = initialState, action) => {
  switch (action.type) {
    case adActions.IMPORTAD: {
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
      ads = Array.from(newSet);
      return {
        ads,
      };
    }
    case adActions.UPDATECURRENTAD: {
      let {ads} = state;
      const ad = action.payload;
      if (ad && ad.id) {
        const updatedAds = ads.map(item => {
          if (item.id === ad.id) {
            return {
              ...item,
              ...ad,
            };
          }
          return item;
        });
        return {
          ads: [...updatedAds],
        };
      }
      break;
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default adsReducer;
