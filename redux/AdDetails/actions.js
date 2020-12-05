const adDetailsActions = {
  setWinnerUserData: 'AD_DETAILS_SET_WINNER_USER_DATA',
  setAdPosterData: 'AD_DETAILS_SET_AD_POSTER_DATA',
  setLotteryUsersData: 'AD_DETAILS_SET_LOTTERY_USERS_DATA',
  showAdDetails: 'AD_DETAILS_SHOW',
  fetchUserAds: 'AD_FETCH_USER_ADS',
};

const showAdDetails = payload => {
  return dispatch => {
    return dispatch({
      type: adDetailsActions.showAdDetails,
      payload,
    });
  };
};

export {adDetailsActions, showAdDetails};
