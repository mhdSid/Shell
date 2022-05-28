import {Alert} from 'react-native';
import {errors} from '../../constants/Texts';
import invoke from 'lodash/invoke';

export const paymentActions = {
  enterLottery: 'PAYMENT_ENTERLOTTERY',
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
