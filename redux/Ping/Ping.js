import {Alert} from 'react-native';
import {authActions} from '../Auth/actions';
import {ping} from '../../services/Auth';
import invoke from 'lodash/invoke';

const handlePing = payload => {
  return dispatch => {
    const onPingError = ({error, country}) => {
      const {message} = error;
      invoke(payload, 'onError');
      Alert.alert(message);
      return dispatch({
        type: authActions.LOGIN,
        payload: {country, loggedIn: false, user: false},
      });
    };
    const onPingSuccess = data => {
      const {error, user: authUser, country} = data;
      if (error) {
        return onPingError({error, country});
      }
      return dispatch({
        type: authActions.LOGIN,
        payload: {
          loggedIn: true,
          user: authUser,
          sessionID: authUser.sessionID,
          country,
        },
      });
    };
    return ping().then(onPingSuccess, error => {
      return onPingError({error});
    });
  };
};

export {handlePing};
