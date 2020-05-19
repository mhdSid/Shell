import {handleError, authActions} from './actions';
import {signup} from '../../services/Auth';
import invoke from 'lodash/invoke';

const handleSignUp = payload => {
  return dispatch => {
    const {onError, newUser, verificationId, email} = payload;

    /*
     * signup Handler
     */
    const onSignupSuccess = data => {
      const {error, user: authUser} = data;
      if (error) {
        return handleError({error, onError, dispatch});
      }
      const {
        verificationId: authVerificationId,
        emailVerified,
        signedUp,
      } = authUser;
      if (
        emailVerified === true &&
        authVerificationId &&
        authVerificationId === verificationId &&
        authUser.email === email &&
        signedUp === true
      ) {
        invoke(payload, 'onSuccess');
        dispatch({
          type: authActions.LOGIN,
          payload: {
            loggedIn: true,
            user: authUser,
            showSignup: false,
            verificationId: undefined,
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
