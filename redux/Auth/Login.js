import {handleError, authActions} from './actions';
import {login} from '../../services/auth';
import invoke from 'lodash/invoke';

const handleLogin = payload => {
  return dispatch => {
    const {email, password, onError} = payload;
    /*
     * First submit Handler
     */
    const onSubmitSuccess = data => {
      const {error, user: authUser} = data;
      if (error) {
        return handleError({error, onError, dispatch});
      }
      const {
        verificationCode,
        emailVerified,
        signedUp,
        email: authEmail,
        passwordHash,
      } = authUser;
      invoke(payload, 'onSuccess');
      // should show confirmation button and go to sign up screen afterwards
      if (emailVerified === false && verificationCode) {
        return dispatch({
          type: authActions.login,
          payload: {
            email,
            passwordHash,
            // show confirmation button and request to /authenticate/email/verify with email and password again and verification id
            verificationCode,
          },
        });
      }
      // user exists in the database and can login normally
      else if (emailVerified === true && verificationCode) {
        if (signedUp === false) {
          return dispatch({
            type: authActions.login,
            payload: {
              verificationCode,
              showSingup: true,
              email: authEmail,
              passwordHash,
            },
          });
        }
        return dispatch({
          type: authActions.login,
          payload: {
            loggedIn: true,
            user: authUser,
          },
        });
      }
    };
    return login({email, password}).then(onSubmitSuccess, error => {
      return handleError({error, onError, dispatch});
    });
  };
};

export {handleLogin};
