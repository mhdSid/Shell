import {Alert} from 'react-native';
import {errors} from '../../Constants/Texts';
import invoke from 'lodash/invoke';

const receiveLotteryActions = {
  showReceiveLotteryModal: 'SHOW_RECEIVE_LOTTERY_MODAL',
  setUserWonLotteries: 'SET_USER_WON_LOTTERIES',
  setPageToken: 'RECEIVE_LOTTERIES_SET_PAGE_TOKEN',
  setLotteryPosterData: 'RECEIVE_LOTTERY_MODAL_SET_LOTTERY_POSTER_DATA',
  markLotteryAsReceived: 'RECEIVE_LOTTERY_MODAL_MARK_AS_RECEIVED',
  resetState: 'RECEIVE_LOTTERY_RESET_STATE',
};

const showReceiveLotteryModal = payload => {
  return dispatch => {
    return dispatch({
      type: receiveLotteryActions.showReceiveLotteryModal,
      payload,
    });
  };
};

const setUserWonLotteries = payload => {
  return dispatch => {
    return dispatch({
      type: receiveLotteryActions.setUserWonLotteries,
      payload,
    });
  };
};

const handleError = props => {
  const {error} = props;
  const message = (error && error.message) || errors.error;
  invoke(props, 'onError');
  if (message) {
    Alert.alert(message);
  }
  return;
};

export {
  receiveLotteryActions,
  handleError,
  showReceiveLotteryModal,
  setUserWonLotteries,
};
