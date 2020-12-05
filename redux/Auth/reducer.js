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
    case authActions.login: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case authActions.update: {
      const user = {
        ...state.user,
        ...action.payload,
      };
      return {
        ...state,
        user,
      };
    }
    case authActions.logout: {
      return {
        ...initialState,
        ...action.payload,
      };
    }
    default: {
      // return (
      //   state || {
      //     ...initialState,
      //   }
      // );
      return {
        ...state,
      };
    }
  }
};

export default authReducer;
