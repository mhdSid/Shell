import {adActions} from './actions';
import {ENTRIES1} from '../../Constants/CarouselEntries';

const initialState = {
  ads: [],
};

const adsReducer = (state = initialState, action) => {
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
      ads = Array.from(newSet);
      return {
        ads,
      };
    }
    case adActions.updateCurrentAd: {
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
        ...initialState,
      };
    }
  }
};

export default adsReducer;
