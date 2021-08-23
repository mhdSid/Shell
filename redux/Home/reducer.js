import {homeActions} from './actions';
import uniqBy from 'lodash/uniqBy';
import {uniq} from 'lodash';

const initialState = {
  lotteries: [],
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case homeActions.setHomeLotteries: {
      const {payload} = action;
      let newLotteries = [];
      if (Array.isArray(payload) && payload.length) {
        newLotteries = [...payload];
      } else if (typeof payload === 'object' && Object.keys(payload).length) {
        newLotteries = [payload];
      }
      newLotteries = [...(newLotteries || [])].map(item => ({
        ...item,
        id: `${item.id}`,
      }));
      newLotteries = uniqBy(newLotteries, 'id').sort(
        (ad1, ad2) =>
          new Date(ad2.publishDate).getTime() -
          new Date(ad1.publishDate).getTime(),
      );
      return {
        lotteries: newLotteries,
      };
    }
    case homeActions.setLotteries: {
      const {payload} = action;
      let newLotteries = [];
      if (Array.isArray(payload) && payload.length) {
        newLotteries = [...payload];
      } else if (typeof payload === 'object' && Object.keys(payload).length) {
        newLotteries = [payload];
      }
      newLotteries = [...(state.lotteries || []), ...(newLotteries || [])].map(
        item => ({
          ...item,
          id: `${item.id}`,
        }),
      );
      newLotteries = uniqBy(newLotteries, 'id').sort(
        (ad1, ad2) =>
          new Date(ad2.publishDate).getTime() -
          new Date(ad1.publishDate).getTime(),
      );
      return {
        lotteries: newLotteries,
      };
    }
    case homeActions.updateLottery: {
      let {lotteries} = state;
      const lottery = action.payload;
      if (lottery && lottery.id) {
        const updatedLotteries = lotteries.map(item => {
          if (`${item.id}` === `${lottery.id}`) {
            return {
              ...item,
              ...lottery,
              id: `${lottery.id}`,
              lotteryUserIds: uniq(lottery.lotteryUserIds),
            };
          }
          return item;
        });
        return {
          lotteries: updatedLotteries,
        };
      }
      return {
        ...state,
      };
    }
    case homeActions.resetLotteries: {
      const {payload} = action;
      return {
        lotteries: payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default homeReducer;
