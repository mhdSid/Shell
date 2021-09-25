import {homeActions} from './actions';
import uniqBy from 'lodash/uniqBy';

const initialState = {
  lotteries: [],
  pageToken: null,
  searchPageToken: null,
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case homeActions.setHomeLotteries: {
      let newLotteries = [];
      if (Array.isArray(action.payload) && action.payload.length) {
        newLotteries = [...action.payload];
      }
      return {
        ...state,
        lotteries: [...state.lotteries, ...newLotteries],
      };
    }
    case homeActions.resetHomeLotteries: {
      let newLotteries = [];
      if (Array.isArray(action.payload) && action.payload.length) {
        newLotteries = [...action.payload];
      }
      return {
        ...state,
        lotteries: newLotteries && newLotteries.length ? newLotteries : [],
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
        ...state,
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
            };
          }
          return item;
        });
        return {
          ...state,
          lotteries: updatedLotteries,
        };
      }
      return {
        ...state,
      };
    }
    case homeActions.likeLottery: {
      let {lotteries} = state;
      const lottery = action.payload;
      if (lottery && lottery.id && lotteries && lotteries.length) {
        return {
          ...state,
          lotteries: lotteries.map(item => {
            if (`${item.id}` === `${lottery.id}`) {
              return {
                ...lottery,
                id: `${lottery.id}`,
                userId: `${lottery.userId}`,
              };
            }
            return item;
          }),
        };
      }
      return {
        ...state,
      };
    }
    case homeActions.dislikeLottery: {
      let {lotteries} = state;
      const lottery = action.payload;
      if (lottery && lottery.id && lotteries && lotteries.length) {
        return {
          ...state,
          lotteries: lotteries.map(item => {
            if (`${item.id}` === `${lottery.id}`) {
              return {
                ...lottery,
                id: `${lottery.id}`,
                userId: `${lottery.userId}`,
              };
            }
            return item;
          }),
        };
      }
      return {
        ...state,
      };
    }
    case homeActions.resetLotteries: {
      const {payload} = action;
      return {
        ...state,
        lotteries: payload,
      };
    }
    case homeActions.resetState: {
      return {
        lotteries: [],
        pageToken: null,
        searchPageToken: null,
      };
    }
    case homeActions.setPageToken: {
      return {
        ...state,
        pageToken: action.payload,
      };
    }
    case homeActions.setSearchPageToken: {
      return {
        ...state,
        searchPageToken: action.payload,
      };
    }
    case homeActions.editLottery: {
      if (
        action.payload &&
        Array.isArray(state.lotteries) &&
        state.lotteries.length
      ) {
        return {
          ...state,
          lotteries: state.lotteries.map(item => {
            if (`${item.id}` === `${action.payload.id}`) {
              return {
                ...action.payload,
                id: `${action.payload.id}`,
                userId: `${action.payload.userId}`,
              };
            }
            return item;
          }),
        };
      }
      return {
        ...state,
      };
    }
    case homeActions.cancelLottery: {
      if (
        action.payload &&
        Array.isArray(state.lotteries) &&
        state.lotteries.length
      ) {
        return {
          ...state,
          lotteries: state.lotteries.map(item => {
            if (`${item.id}` === `${action.payload.id}`) {
              return {
                ...action.payload,
                id: `${action.payload.id}`,
                userId: `${action.payload.userId}`,
              };
            }
            return item;
          }),
        };
      }
      return {
        ...state,
      };
    }
    case homeActions.markLotteryAsShipped: {
      if (
        action.payload &&
        Array.isArray(state.lotteries) &&
        state.lotteries.length
      ) {
        return {
          ...state,
          lotteries: state.lotteries.map(item => {
            if (`${item.id}` === `${action.payload.id}`) {
              return {
                ...action.payload,
                id: `${action.payload.id}`,
                userId: `${action.payload.userId}`,
              };
            }
            return item;
          }),
        };
      }
      return {
        ...state,
      };
    }
    case homeActions.markLotteryAsReceived: {
      if (
        action.payload &&
        Array.isArray(state.lotteries) &&
        state.lotteries.length
      ) {
        return {
          ...state,
          lotteries: state.lotteries.map(item => {
            if (`${item.id}` === `${action.payload.id}`) {
              return {
                ...action.payload,
                id: `${action.payload.id}`,
                userId: `${action.payload.userId}`,
              };
            }
            return item;
          }),
        };
      }
      return {
        ...state,
      };
    }
    case homeActions.enterLottery: {
      if (
        action.payload &&
        Array.isArray(state.lotteries) &&
        state.lotteries.length
      ) {
        return {
          ...state,
          lotteries: state.lotteries.map(item => {
            if (`${item.id}` === `${action.payload.id}`) {
              return {
                ...action.payload,
                id: `${action.payload.id}`,
                userId: `${action.payload.userId}`,
              };
            }
            return item;
          }),
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

export default homeReducer;
