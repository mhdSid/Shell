const adActions = {
  importAd: 'AD_IMPORT',
  updateCurrentAd: 'UPDATE_CURRENT_AD',
};

const addAd = payload => ({
  type: adActions.importAd,
  payload,
});

const updateCurrentAd = payload => ({
  type: adActions.updateCurrentAd,
  payload,
});

export {adActions, addAd, updateCurrentAd};
