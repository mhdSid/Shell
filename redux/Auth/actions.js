const authActions = {
  LOGIN: 'AUTH_LOGIN',
  LOGOUT: 'AUTH_LOGOUT',
};

const loginAction = payload => ({
  type: authActions.LOGIN,
  payload,
});

const logoutAction = payload => ({
  type: authActions.LOGOUT,
  payload,
});

export {authActions, loginAction, logoutAction};
