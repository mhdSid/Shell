const authActions = {
  LOGIN: 'AUTH_LOGIN_ACTION',
  LOGOUT: 'AUTH_LOGOUT_ACTION',
  UPDATE: 'AUTH_UPDATE_ACTION',
};

const loginAction = payload => ({
  type: authActions.LOGIN,
  payload,
});

const logoutAction = payload => ({
  type: authActions.LOGOUT,
  payload,
});

const updateAction = payload => ({
  type: authActions.UPDATE,
  payload,
});

export {authActions, loginAction, logoutAction, updateAction};
