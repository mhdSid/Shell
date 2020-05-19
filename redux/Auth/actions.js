import {errors} from '../../Constants/Texts';
import invoke from 'lodash/invoke';
import {Alert} from 'react-native';

const authActions = {
  LOGIN: 'AUTH_LOGIN_ACTION',
  LOGOUT: 'AUTH_LOGOUT_ACTION',
  UPDATE: 'AUTH_UPDATE_ACTION',
  HANDLELOGIN: 'AUTH_HANDLE_LOGIN',
  UPDATEUSER: 'AUTH_UPDATE_USER',
};

const loginAction = payload => {
  return dispatch => {
    return dispatch({type: authActions.LOGIN, payload});
  };
};

const logoutAction = payload => {
  return dispatch => {
    return dispatch({type: authActions.LOGOUT, payload});
  };
};

const updateAction = payload => {
  return dispatch => {
    return dispatch({type: authActions.UPDATE, payload});
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
    type: authActions.LOGOUT,
    payload: {
      loggedIn: false,
      user: false,
      verificationId: undefined,
      loading: false,
    },
  });
};

export {authActions, loginAction, logoutAction, updateAction, handleError};
