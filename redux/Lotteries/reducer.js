import {lotteriesActions} from './actions';

const initialState = {
  userJoinedLotteries: [],
  userCreatedLotteries: [],
  userLikedLotteries: [],
  userJoinedLotteriesPageToken: null,
  userCreatedLotteriesPageToken: null,
  userLikedLotteriesPageToken: null,
};

const lotteriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case lotteriesActions.setUserJoinedLotteriesPageToken: {
      return {
        ...state,
        userJoinedLotteriesPageToken: action.payload,
      };
    }
    case lotteriesActions.setUserCreatedLotteriesPageToken: {
      return {
        ...state,
        userCreatedLotteriesPageToken: action.payload,
      };
    }
    case lotteriesActions.setUserLikedLotteriesPageToken: {
      return {
        ...state,
        userLikedLotteriesPageToken: action.payload,
      };
    }
    case lotteriesActions.setUserCreatedLotteries: {
      if (Array.isArray(action.payload) && action.payload.length) {
        return {
          ...state,
          userCreatedLotteries: [
            ...state.userCreatedLotteries,
            ...action.payload,
          ],
        };
      } else if (
        typeof action.payload === 'object' &&
        Object.keys(action.payload).length
      ) {
        const {userCreatedLotteries} = state;
        if (
          Array.isArray(userCreatedLotteries) &&
          userCreatedLotteries.length
        ) {
          return {
            ...state,
            userCreatedLotteries: userCreatedLotteries.map(item => {
              if (`${item.id}` === `${action.payload.id}`) {
                return {
                  ...item,
                  ...action.payload,
                };
              }
              return item;
            }),
          };
        } else {
          return {
            ...state,
            userCreatedLotteries: [{...action.payload}],
          };
        }
      }
      return {
        ...state,
        userCreatedLotteries: [...action.payload],
      };
    }
    case lotteriesActions.setUserJoinedLotteries: {
      if (Array.isArray(action.payload) && action.payload.length) {
        return {
          ...state,
          userJoinedLotteries: action.payload,
        };
      } else if (
        typeof action.payload === 'object' &&
        Object.keys(action.payload).length
      ) {
        const {userJoinedLotteries} = state;
        if (Array.isArray(userJoinedLotteries) && userJoinedLotteries.length) {
          return {
            ...state,
            userJoinedLotteries: userJoinedLotteries.map(item => {
              if (`${item.id}` === `${action.payload.id}`) {
                return {
                  ...item,
                  ...action.payload,
                };
              }
              return item;
            }),
          };
        } else {
          return {
            ...state,
            userJoinedLotteries: [{...action.payload}],
          };
        }
      }
      return {
        ...state,
        userJoinedLotteries: action.payload,
      };
    }
    case lotteriesActions.setUserLikedLotteries: {
      if (Array.isArray(action.payload) && action.payload.length) {
        return {
          ...state,
          userLikedLotteries: action.payload,
        };
      } else if (
        typeof action.payload === 'object' &&
        Object.keys(action.payload).length
      ) {
        const {userLikedLotteries} = state;
        if (action.payload.remove) {
          return {
            ...state,
            userLikedLotteries: userLikedLotteries.filter(
              item => `${item.id}` !== `${action.payload.id}`,
            ),
          };
        }
        if (Array.isArray(userLikedLotteries) && userLikedLotteries.length) {
          return {
            ...state,
            userLikedLotteries: userLikedLotteries.map(item => {
              if (`${item.id}` === `${action.payload.id}`) {
                return {
                  ...item,
                  ...action.payload,
                };
              }
              return item;
            }),
          };
        } else {
          return {
            ...state,
            userLikedLotteries: [{...action.payload}],
          };
        }
      }
      return {
        ...state,
        userLikedLotteries: action.payload,
      };
    }
    case lotteriesActions.likeLottery: {
      let {userJoinedLotteries, userLikedLotteries} = state;
      const lottery = action.payload;
      if (lottery && lottery.id) {
        let updatedState = {};
        if (userJoinedLotteries && userJoinedLotteries.length) {
          updatedState = {
            ...updatedState,
            userJoinedLotteries: userJoinedLotteries.map(item => {
              if (`${item.id}` === `${lottery.id}`) {
                return {
                  ...lottery,
                  id: `${lottery.id}`,
                };
              }
              return item;
            }),
          };
        }
        if (userLikedLotteries && userLikedLotteries.length) {
          updatedState = {
            ...updatedState,
            userLikedLotteries: userLikedLotteries.map(item => {
              if (`${item.id}` === `${lottery.id}`) {
                return {
                  ...lottery,
                  id: `${lottery.id}`,
                };
              }
              return item;
            }),
          };
        }
        return {
          ...state,
          ...updatedState,
        };
      }
      return {
        ...state,
      };
    }
    case lotteriesActions.dislikeLottery: {
      let {userJoinedLotteries, userLikedLotteries} = state;
      const lottery = action.payload;
      if (lottery && lottery.id) {
        let updatedState = {};
        if (userJoinedLotteries && userJoinedLotteries.length) {
          updatedState = {
            ...updatedState,
            userJoinedLotteries: userJoinedLotteries.map(item => {
              if (`${item.id}` === `${lottery.id}`) {
                return {
                  ...lottery,
                  id: `${lottery.id}`,
                };
              }
              return item;
            }),
          };
        }
        if (userLikedLotteries && userLikedLotteries.length) {
          updatedState = {
            ...updatedState,
            userLikedLotteries: userLikedLotteries.filter(item => {
              if (`${item.id}` === `${lottery.id}`) {
                return false;
              }
              return true;
            }),
          };
        }
        return {
          ...state,
          ...updatedState,
        };
      }
      return {
        ...state,
      };
    }
    case lotteriesActions.resetState: {
      return {
        userJoinedLotteries: [],
        userCreatedLotteries: [],
        userLikedLotteries: [],
        userJoinedLotteriesPageToken: null,
        userCreatedLotteriesPageToken: null,
        userLikedLotteriesPageToken: null,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default lotteriesReducer;
