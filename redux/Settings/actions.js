const settingsActions = {
  setLang: 'SETTINGS_SET_LANG',
};

const setLang = payload => ({
  type: settingsActions.setLang,
  payload,
});

export {settingsActions, setLang};
