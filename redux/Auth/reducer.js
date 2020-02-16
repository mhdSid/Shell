import {authActions} from './actions';

const initialState = {
  loggedIn: undefined,
  user: undefined,
  country: 'LB',
};

const authReducer = (state = initialState, action) => {
  // console.log('authReducer: ', action);

  switch (action.type) {
    case authActions.LOGIN: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case authActions.UPDATE: {
      const user = {
        ...state.user,
        ...action.payload,
      };
      return {
        ...state,
        user,
      };
    }

    case authActions.LOGOUT: {
      return {
        ...initialState,
        ...action.payload,
      };
    }

    default: {
      return (
        state || {
          ...initialState,
        }
      );
    }
  }
};

export default authReducer;
