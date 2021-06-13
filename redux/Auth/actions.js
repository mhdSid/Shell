import {errors} from '../../Constants/Texts';
import invoke from 'lodash/invoke';
import {Alert} from 'react-native';

const authActions = {
  login: 'AUTH_LOGIN_ACTION',
  logout: 'AUTH_LOGOUT_ACTION',
  update: 'AUTH_UPDATE_ACTION',
};

const loginAction = payload => {
  return dispatch => {
    return dispatch({type: authActions.login, payload});
  };
};

const logoutAction = payload => {
  return dispatch => {
    return dispatch({type: authActions.logout, payload});
  };
};

const updateAction = payload => {
  return dispatch => {
    return dispatch({type: authActions.update, payload});
  };
};

const handleError = props => {
  const {error} = props;
  const message = (error && error.message) || errors.error;
  invoke(props, 'onError');
  if (message) {
    Alert.alert(message);
  }
  return invoke(props, 'dispatch', {
    type: authActions.logout,
    payload: {
      loggedIn: false,
      user: false,
      verificationId: undefined,
      loading: false,
    },
  });
};

export {authActions, loginAction, logoutAction, updateAction, handleError};
