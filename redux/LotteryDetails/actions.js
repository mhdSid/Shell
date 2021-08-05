const lotteryDetailsActions = {
  setWinnerUserData: 'LOTTERY_DETAILS_SET_WINNER_USER_DATA',
  setAdPosterData: 'LOTTERY_DETAILS_SET_AD_POSTER_DATA',
  setLotteryUsersData: 'LOTTERY_DETAILS_SET_LOTTERY_USERS_DATA',
  showLotteryDetails: 'LOTTERY_DETAILS_SHOW',
  fetchUserAds: 'LOTTERY_FETCH_USER_ADS',
};

const showLotteryDetails = payload => {
  return dispatch => {
    return dispatch({
      type: lotteryDetailsActions.showLotteryDetails,
      payload,
    });
  };
};

export {lotteryDetailsActions, showLotteryDetails};
