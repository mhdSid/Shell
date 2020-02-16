const authActions = {
  LOGIN: 'AUTH_LOGIN',
  LOGOUT: 'AUTH_LOGOUT',
  UPDATE: 'AUTH_UPDATE',
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
