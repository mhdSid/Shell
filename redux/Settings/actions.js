export const settingsActions = {
  setLanguage: 'SETTINGS_SET_LANG',
  setHomeViewStyle: 'SETTINGS_SET_HOME_VIEW_STYLE',
  resetState: 'SETTINGS_RESET_STATE',
};

export const setLang = payload => {
  return dispatch => {
    return dispatch({type: settingsActions.setLanguage, payload});
  };
};

export const setHomeViewStyle = payload => {
  return dispatch => {
    return dispatch({type: settingsActions.setHomeViewStyle, payload});
  };
};
