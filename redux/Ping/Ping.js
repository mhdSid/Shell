import {authActions} from '../Auth/actions';
import {ping} from '../../services/Auth';
import invoke from 'lodash/invoke';

export const handlePing = payload => {
  return dispatch => {
    const onPingError = ({error, country}) => {
      invoke(payload, 'onError');
      return dispatch({
        type: authActions.login,
        payload: {country, loggedIn: null, user: null},
      });
    };
    const onPingSuccess = data => {
      const {error, user: authUser, country} = data;
      if (error) {
        return onPingError({error, country});
      }
      invoke(payload, 'onPingSuccess', authUser ? authUser.id : null);
      return dispatch({
        type: authActions.login,
        payload: {
          loggedIn: true,
          user: authUser,
          country,
        },
      });
    };
    return ping().then(onPingSuccess, error => {
      return onPingError({error});
    });
  };
};
