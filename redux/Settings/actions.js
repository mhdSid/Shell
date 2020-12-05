const settingsActions = {
  setLanguage: 'SETTINGS_SET_LANG',
  setHomeViewStyle: 'SETTINGS_SET_HOME_VIEW_STYLE',
};

const setLang = payload => {
  return dispatch => {
    return dispatch({type: settingsActions.setLanguage, payload});
  };
};

const setHomeViewStyle = payload => {
  return dispatch => {
    return dispatch({type: settingsActions.setHomeViewStyle, payload});
  };
};

export {settingsActions, setLang, setHomeViewStyle};
