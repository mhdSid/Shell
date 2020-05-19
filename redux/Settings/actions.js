const settingsActions = {
  setLang: 'SETTINGS_SET_LANG',
};

const setLang = payload => {
  return dispatch => {
    return dispatch({type: settingsActions.setLang, payload});
  };
};

export {settingsActions, setLang};
