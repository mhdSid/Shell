import {handleError, authActions} from './actions';
import {logout} from '../../services/Auth';
import invoke from 'lodash/invoke';

const handleLogout = payload => {
  return dispatch => {
    const {onError} = payload;
    /*
     * Logout Handler
     */
    const onLogoutSuccess = data => {
      const {error} = data;
      if (error) {
        return handleError({error, onError, dispatch});
      }
      invoke(payload, 'onSuccess');
      return dispatch({
        type: authActions.logout,
        payload: {
          loggedIn: false,
          user: false,
        },
      });
    };
    return logout().then(onLogoutSuccess, error => {
      return handleError({error, onError, dispatch});
    });
  };
};

export {handleLogout};
