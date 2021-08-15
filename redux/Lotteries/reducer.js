import {lotteriesActions} from './actions';

const initialState = {
  userJoinedLotteries: undefined,
  userCreatedLotteries: undefined,
  userLikedLotteries: undefined,
};

const lotteriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case lotteriesActions.setUserCreatedLotteries: {
      return {
        ...state,
        userCreatedLotteries: action.payload,
      };
    }
    case lotteriesActions.setUserJoinedLotteries: {
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
