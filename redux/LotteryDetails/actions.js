const lotteryDetailsActions = {
  setWinnerUserData: 'LOTTERY_DETAILS_SET_WINNER_USER_DATA',
  setAdPosterData: 'LOTTERY_DETAILS_SET_AD_POSTER_DATA',
  showLotteryDetails: 'LOTTERY_DETAILS_SHOW',
  setUserLotteries: 'LOTTERY_DETAILS_SET_USER_LOTTERIES',
  resetState: 'LOTTERY_DETAILS_RESET_STATE',
  setUserLotteriesPageToken: 'LOTTERY_DETAILS_SET_USER_LOTTERIES_PAGE_TOKEN',
  cancelLottery: 'LOTTERY_DETAILS_CANCEL_LOTTERY',
};

const showLotteryDetails = payload => {
  return dispatch => {
    return dispatch({
      type: lotteryDetailsActions.showLotteryDetails,
      payload,
    });
  };
};

const setUserLotteriesPageToken = payload => {
  return dispatch => {
    return dispatch({
      type: lotteryDetailsActions.setUserLotteriesPageToken,
      payload,
    });
  };
};

export {lotteryDetailsActions, showLotteryDetails, setUserLotteriesPageToken};
