import {handleError, authActions} from './actions';
import {signup} from '../../services/auth';
import invoke from 'lodash/invoke';

const handleSignUp = payload => {
  return (dispatch, getState) => {
    const {onError, newUser} = payload;
    const {verificationCode, email} = newUser;
    /*
     * signup Handler
     */
    const onSignupSuccess = data => {
      const {error, user} = data;
      if (error) {
        return handleError({error, onError, dispatch}, getState);
      }
      const {
        verificationCode: authVerificationCode,
        emailVerified,
        signedUp,
      } = user;
      if (
        emailVerified === true &&
        authVerificationCode &&
        authVerificationCode === verificationCode &&
        user.email === email &&
        signedUp === true
      ) {
        invoke(payload, 'onSuccess');
        return dispatch({
          type: authActions.login,
          payload: {
            loggedIn: true,
            user,
            showSignup: false,
            verificationCode: null,
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
      return handleError({error, onError, dispatch}, getState);
    });
  };
};

export {handleSignUp};
