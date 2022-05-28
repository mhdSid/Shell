import {Alert} from 'react-native';
import {errors} from '../../constants/Texts';
import invoke from 'lodash/invoke';

export const receiveLotteryActions = {
  showReceiveLotteryModal: 'SHOW_RECEIVE_LOTTERY_MODAL',
  setUserWonLotteries: 'SET_USER_WON_LOTTERIES',
  setPageToken: 'RECEIVE_LOTTERIES_SET_PAGE_TOKEN',
  setLotteryPosterData: 'RECEIVE_LOTTERY_MODAL_SET_LOTTERY_POSTER_DATA',
  markLotteryAsReceived: 'RECEIVE_LOTTERY_MODAL_MARK_AS_RECEIVED',
  resetState: 'RECEIVE_LOTTERY_RESET_STATE',
  likeLottery: 'RECEIVE_LOTTERY_LIKE_LOTTERY',
  dislikeLottery: 'RECEIVE_LOTTERY_DISLIKE_LOTTERY',
  cancelLottery: 'RECEIVE_LOTTERY_CANCEL_LOTTERY',
  enterLottery: 'RECEIVE_LOTTERY_ENTER_LOTTERY',
};

export const showReceiveLotteryModal = payload => {
  return dispatch => {
    return dispatch({
      type: receiveLotteryActions.showReceiveLotteryModal,
      payload,
    });
  };
};

export const setUserWonLotteries = payload => {
  return dispatch => {
    return dispatch({
      type: receiveLotteryActions.setUserWonLotteries,
      payload,
    });
  };
};

export const handleError = (props, getState) => {
  const lang = getState().settingsReducer.lang;
  const {error} = props;
  const message = (error && error.message) || errors[lang].error;
  invoke(props, 'onError');
  if (message) {
    Alert.alert(message);
  }
  return;
};
