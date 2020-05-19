import {verify} from '../../services/Auth';
import {handleError, authActions} from './actions';
import invoke from 'lodash/invoke';

const handleVerifyUser = payload => {
  return dispatch => {
    const {email, password, verificationId, onError} = payload;
    /*
     * Verify user Handler
     */
    // show confirmation button and request to /authenticate/email/verify with email and password again and verification id
    const onVerifyUserSuccess = data => {
      const {error, user: authUser} = data;
      if (error) {
        return handleError({error, onError, dispatch});
      }
      const {verificationId: authVerificationId, emailVerified} = authUser;
      invoke(payload, 'onSuccess');
      if (emailVerified === true && authVerificationId) {
        dispatch({
          type: authActions.LOGIN,
          payload: {
            showSignup: true,
          },
        });
      }
    };
    if (email && password && verificationId) {
      return verify({email, password, verificationId}).then(
        onVerifyUserSuccess,
        error => {
          return handleError({error, onError, dispatch});
        },
      );
    }
  };
};

export {handleVerifyUser};
