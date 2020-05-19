const adDetailsActions = {
  SETWINNERUSERDATA: 'AD_DETAILS_SET_WINNER_USER_DATA',
  SETADPOSTERDATA: 'AD_DETAILS_SET_AD_POSTER_DATA',
  SETLOTTERYUSERSDATA: 'AD_DETAILS_SET_LOTTERY_USERS_DATA',
  SHOWADDETAILS: 'AD_DETAILS_SHOW',
};

const showAdDetails = payload => {
  return dispatch => {
    return dispatch({
      type: adDetailsActions.SHOWADDETAILS,
      payload,
    });
  };
};

export {adDetailsActions, showAdDetails};
