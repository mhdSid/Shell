import {authActions} from './actions';

const initialState = {
  loggedIn: undefined,
  user: undefined,
  country: 'LB',
  email: undefined,
  password: undefined,
  verificationId: undefined,
  showSignup: undefined,
};

const authReducer = (state = initialState, action) => {
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
