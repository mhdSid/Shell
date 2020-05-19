import {Alert} from 'react-native';
import {errors} from '../../Constants/Texts';
import invoke from 'lodash/invoke';

const adActions = {
  IMPORTAD: 'AD_IMPORT',
  UPDATECURRENTAD: 'UPDATE_CURRENT_AD',
};

const addAd = payload => {
  return dispatch => {
    return dispatch({
      type: adActions.IMPORTAD,
      payload,
    });
  };
};

const updateCurrentAd = payload => {
  return dispatch => {
    return dispatch({type: adActions.UPDATECURRENTAD, payload});
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

export {adActions, addAd, updateCurrentAd, handleError};
