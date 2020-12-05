import {Alert} from 'react-native';
import {errors} from '../../Constants/Texts';
import invoke from 'lodash/invoke';

const paymentActions = {
  enterLottery: 'PAYMENT_ENTERLOTTERY',
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

export {paymentActions, handleError};
