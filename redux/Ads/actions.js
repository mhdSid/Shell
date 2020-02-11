const adActions = {
  importAd: 'AD_IMPORT',
};

const importAd = payload => ({
  type: adActions.importAd,
  payload,
});

export {adActions, importAd};
