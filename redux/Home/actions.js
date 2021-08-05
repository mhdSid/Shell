import {Alert} from 'react-native';
import {errors} from '../../Constants/Texts';
import invoke from 'lodash/invoke';

const homeActions = {
  resetLotteries: 'HOME_RESET_LOTTERIES',
  setLotteries: 'HOME_SET_LOTTERIES',
  updateLottery: 'HOME_UPDATE_LOTTERy',
};

const updateLottery = payload => {
  return dispatch => {
    return dispatch({type: homeActions.updateLottery, payload});
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

export {homeActions, handleError, updateLottery};
