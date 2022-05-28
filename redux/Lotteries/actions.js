export const lotteriesActions = {
  setUserJoinedLotteries: 'SET_USER_JOINED_LOTTERIES',
  setUserCreatedLotteries: 'SET_USER_CREATED_LOTTERIES',
  setUserLikedLotteries: 'SET_USER_LIKED_LOTTERIES',
  setUserJoinedLotteriesPageToken: 'SET_USER_JOINED_LOTTERIES_PAGE_TOKEN',
  setUserCreatedLotteriesPageToken: 'SET_USER_CREATED_LOTTERIES_PAGE_TOKEN',
  setUserLikedLotteriesPageToken: 'SET_USER_LIKED_LOTTERIES_PAGE_TOKEN',
  resetState: 'LOTTERIES_REDUCER_RESET_STATE',
  likeLottery: 'LOTTERIES_REDUCER_LIKE_LOTTERY',
  dislikeLottery: 'LOTTERIES_REDUCER_DISLIKE_LOTTERY',
  editLottery: 'LOTTERIES_REDUCER_EDIT_LOTTERY',
  cancelLottery: 'LOTTERIES_CANCEL_LOTTERY',
  markLotteryAsReceived: 'LOTTERIES_MARK_LOTTERY_AS_RECEIVED',
  markLotteryAsShipped: 'LOTTERIES_MARK_LOTTERY_AS_SHIPPED',
  enterLottery: 'LOTTERIES_ENTER_LOTTERY',
};

export const setUserCreatedLotteriesPageToken = payload => {
  return dispatch => {
    return dispatch({
      type: lotteriesActions.setUserCreatedLotteriesPageToken,
      payload,
    });
  };
};
