import {errors} from '../../constants/Texts';
import invoke from 'lodash/invoke';
import {Alert} from 'react-native';

export const authActions = {
  login: 'AUTH_LOGIN_ACTION',
  logout: 'AUTH_LOGOUT_ACTION',
  update: 'AUTH_UPDATE_ACTION',
};

export const loginAction = payload => {
  return dispatch => {
    return dispatch({type: authActions.login, payload});
  };
};

export const logoutAction = payload => {
  return dispatch => {
    return dispatch({type: authActions.logout, payload});
  };
};

export const updateAction = payload => {
  return dispatch => {
    return dispatch({type: authActions.update, payload});
  };
};

export const handleError = (props, getState) => {
  const lang = getState().settingsReducer.lang;
  const {error} = props;
  const message = (error && error.message) || errors[lang].error;
  invoke(props, 'onError');
  if (message) {
    Alert.alert(message);
  }
  return invoke(props, 'dispatch', {
    type: authActions.logout,
    payload: {
      loggedIn: false,
      user: false,
      verificationCode: undefined,
      loading: false,
    },
  });
};
