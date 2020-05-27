import {adActions} from './actions';
import {ENTRIES1} from '../../Constants/CarouselEntries';
import uniqBy from 'lodash/uniqBy';

const initialState = {
  ads: [...ENTRIES1],
};

const adsReducer = (state = initialState, action) => {
  switch (action.type) {
    case adActions.IMPORTAD: {
      const {payload} = action;
      let newAds = [];
      if (Array.isArray(payload) && payload.length > 0) {
        newAds = [...payload];
      } else if (
        typeof payload === 'object' &&
        Object.keys(payload).length > 0
      ) {
        newAds = [payload];
      }
      newAds = uniqBy([...state.ads, ...newAds], 'id').sort(
        (ad1, ad2) => +new Date(ad2.publishDate) - +new Date(ad1.publishDate),
      );

      return {
        ads: newAds,
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
          ads: updatedAds,
        };
      }
      return {
        ...state,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default adsReducer;
