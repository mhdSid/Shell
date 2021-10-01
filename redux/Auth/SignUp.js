import {handleError, authActions} from './actions';
import {signup} from '../../services/auth';
import invoke from 'lodash/invoke';

const handleSignUp = payload => {
  return dispatch => {
    const {onError, newUser} = payload;
    const {verificationId, email} = newUser;
    /*
     * signup Handler
     */
    const onSignupSuccess = data => {
      const {error, user} = data;
      if (error) {
        return handleError({error, onError, dispatch});
      }
      const {
        verificationId: authVerificationId,
        emailVerified,
        signedUp,
      } = user;
      if (
        emailVerified === true &&
        authVerificationId &&
        authVerificationId === verificationId &&
        user.email === email &&
        signedUp === true
      ) {
        invoke(payload, 'onSuccess');
        return dispatch({
          type: authActions.login,
          payload: {
            loggedIn: true,
            user,
            sessionID: user.sessionID,
            showSignup: false,
            verificationId: null,
          },
        });
      } else {
        invoke(payload, 'onError');
        dispatch({
          type: authActions.logout,
          payload: {
            loggedIn: false,
            user: false,
          },
        });
      }
    };
    return signup(newUser).then(onSignupSuccess, error => {
      return handleError({error, onError, dispatch});
    });
  };
};

export {handleSignUp};
