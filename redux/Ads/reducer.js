import {adActions} from './actions';
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';

const initialState = {
  ads: [],
};

const adsReducer = (state = initialState, action) => {
  switch (action.type) {
    case adActions.importAd: {
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
      newAds = [...(state.ads || []), ...(newAds || [])].map(item => ({
        ...item,
        id: `${item.id}`,
      }));
      newAds = uniqBy(newAds, 'id').sort(
        (ad1, ad2) => +new Date(ad2.publishDate) - +new Date(ad1.publishDate),
      );
      return {
        ads: newAds,
      };
    }
    case adActions.updateCurrentAd: {
      let {ads} = state;
      const ad = action.payload;
      if (ad && ad.id) {
        const updatedAds = ads.map(item => {
          if (`${item.id}` === `${ad.id}`) {
            return {
              ...item,
              ...ad,
              id: `${ad.id}`,
              lotteryUserIds: uniq(ad.lotteryUserIds),
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
