import {Alert} from 'react-native';
import {errors} from '../../Constants/Texts';
import invoke from 'lodash/invoke';

const homeActions = {
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

const updateLottery = payload => {
  return dispatch => {
    return dispatch({type: homeActions.updateLottery, payload});
  };
};

const setPageToken = payload => {
  return dispatch => {
    return dispatch({type: homeActions.setPageToken, payload});
  };
};

const resetHomeLotteries = payload => {
  return dispatch => {
    return dispatch({type: homeActions.resetHomeLotteries, payload});
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
  homeActions,
  handleError,
  updateLottery,
  setPageToken,
  resetHomeLotteries,
};
