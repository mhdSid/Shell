import {adActions} from './actions';
// import {ENTRIES1} from '../../Constants/CarouselEntries';
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
      newAds = uniqBy([...(state.ads || []), ...(newAds || [])], 'id').sort(
        (ad1, ad2) => +new Date(ad2.publishDate) - +new Date(ad1.publishDate),
      );
      console.log(newAds);
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
            console.log(
              'current_currentCollectedPrice: ',
              item.currentCollectedPrice,
            );
            console.log(
              'updated_currentCollectedPrice: ',
              ad.currentCollectedPrice,
            );
            return {
              ...item,
              ...ad,
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
