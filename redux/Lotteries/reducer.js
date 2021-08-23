import {lotteriesActions} from './actions';

const initialState = {
  userJoinedLotteries: undefined,
  userCreatedLotteries: undefined,
  userLikedLotteries: undefined,
};

const lotteriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case lotteriesActions.setUserCreatedLotteries: {
      if (Array.isArray(action.payload) && action.payload.length) {
        return {
          ...state,
          userCreatedLotteries: action.payload,
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
        userCreatedLotteries: action.payload,
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
    default: {
      return {
        ...state,
      };
    }
  }
};

export default lotteriesReducer;
