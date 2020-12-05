import {Alert} from 'react-native';
import {errors} from '../../Constants/Texts';
import invoke from 'lodash/invoke';

const adActions = {
  importAd: 'AD_IMPORT',
  updateCurrentAd: 'UPDATE_CURRENT_AD',
};

const addAd = payload => {
  return dispatch => {
    return dispatch({
      type: adActions.importAd,
      payload,
    });
  };
};

const updateCurrentAd = payload => {
  return dispatch => {
    return dispatch({type: adActions.updateCurrentAd, payload});
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
