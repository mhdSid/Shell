import {Alert} from 'react-native';
import {errors} from '../../constants/Texts';
import invoke from 'lodash/invoke';

export const shipLotteryActions = {
  showShipLotteryModal: 'SHOW_SHIP_LOTTERY_MODAL',
  setUserCreatedWonLotteries: 'SET_USER_CREATED_WON_LOTTERIES',
  setLotteryWinnerUserData: 'SHIP_LOTTERY_MODAL_SET_LOTTERY_WINNER_USER_DATA',
  markLotteryAsShipped: 'SHIP_LOTTERY_MODAL_MARK_AS_SHIPPED',
  resetState: 'SHIP_LOTTERY_RESET_STATE',
  editLottery: 'SHIP_LOTTERY_REDUCER_EDIT_LOTTERY',
  cancelLottery: 'SHIP_LOTTERY_REDUCER_CANCEL_LOTTERY',
  enterLottery: 'SHIP_LOTTERY_ENTER_LOTTERY',
};

export const showShipLotteryModal = payload => {
  return dispatch => {
    return dispatch({
      type: shipLotteryActions.showShipLotteryModal,
      payload,
    });
  };
};

export const setUserCreatedWonLotteries = payload => {
  return dispatch => {
    return dispatch({
      type: shipLotteryActions.setUserCreatedWonLotteries,
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
