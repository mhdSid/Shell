const settingsActions = {
  SETLANG: 'SETTINGS_SET_LANG',
  SETHOMEVIEWSTYLE: 'SETTINGS_SET_HOME_VIEW_STYLE',
};

const setLang = payload => {
  return dispatch => {
    return dispatch({type: settingsActions.SETLANG, payload});
  };
};

const setHomeViewStyle = payload => {
  return dispatch => {
    return dispatch({type: settingsActions.SETHOMEVIEWSTYLE, payload});
  };
};

export {settingsActions, setLang, setHomeViewStyle};
