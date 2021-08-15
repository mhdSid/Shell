const lotteryResultActions = {
  showLotteryResult: 'SHOW_LOTTERY_RESULT',
  setWinnerUserData: 'SET_LOTTERY_RESULT_WINNER_USER_DATA',
  setAdPosterData: 'SET_LOTTREY_RESULT_AD_POSTER_DATA',
  setLotteryUsersData: 'SET_LOTTERY_RESULT_LOTTERY_USERS_DATA',
};

const showLotteryResult = payload => {
  return dispatch => {
    return dispatch({
      type: lotteryResultActions.showLotteryResult,
      payload,
    });
  };
};

export {lotteryResultActions, showLotteryResult};
