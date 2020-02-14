const adActions = {
  importAd: 'AD_IMPORT',
};

const addAd = payload => ({
  type: adActions.importAd,
  payload,
});

export {adActions, addAd};
