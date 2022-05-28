import {Alert} from 'react-native';
import {errors} from '../../constants/Texts';
import invoke from 'lodash/invoke';

export const homeActions = {
  resetLotteries: 'HOME_RESET_LOTTERIES',
  setLotteries: 'HOME_SET_LOTTERIES',
  setHomeLotteries: 'SET_HOME_VIEW_LOTTERIES',
  resetHomeLotteries: 'RESET_HOME_LOTTERIES',
  updateLottery: 'HOME_UPDATE_LOTTERy',
  setPageToken: 'HOME_SET_PAGE_TOKEN',
  setSearchPageToken: 'HOME_SET_SEARCH_PAGE_TOKEN',
  resetState: 'HOME_RESET_STATE',
  likeLottery: 'HOME_REDUCER_LIKE_LOTTERY',
  dislikeLottery: 'HOME_REDUCER_DISLIKE_LOTTERY',
  editLottery: 'HOME_REDUCER_EDIT_LOTTERY',
  cancelLottery: 'HOME_CANCEL_LOTTERY',
  markLotteryAsReceived: 'HOME_MARK_LOTTERY_AS_RECEIVED',
  markLotteryAsShipped: 'HOME_MARK_LOTTERY_AS_SHIPPED',
  enterLottery: 'HOME_ENTER_LOTTERY',
};

export const updateLottery = payload => {
  return dispatch => {
    return dispatch({type: homeActions.updateLottery, payload});
  };
};

export const setPageToken = payload => {
  return dispatch => {
    return dispatch({type: homeActions.setPageToken, payload});
  };
};

export const resetHomeLotteries = payload => {
  return dispatch => {
    return dispatch({type: homeActions.resetHomeLotteries, payload});
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
