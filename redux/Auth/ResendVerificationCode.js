import {resendVerificationCode} from '../../services/auth';
import {handleError, authActions} from './actions';
import invoke from 'lodash/invoke';
import {errors} from '../../Constants/Texts';
import {Alert} from 'react-native';

const handleResendVerificationCode = payload => {
  return dispatch => {
    const {email, passwordHash, onError} = payload;
    /*
     * Verify user Handler
     */
    // show confirmation button and request to /authenticate/email/verify with email and password again and verification id
    const onVerifyUserSuccess = data => {
      const {error, user: authUser, message} = data;
      if (error) {
        const errorMessage = (error && error.message) || errors.error;
        invoke(payload, 'onError');
        if (message) {
          Alert.alert(errorMessage);
        }
        return;
      }
      const {verificationCode: authVerificationCode} = authUser;
      invoke(payload, 'onSuccess');
      if (authVerificationCode) {
        if (message) {
          Alert.alert(message);
        }
        return dispatch({
          type: authActions.login,
          payload: {
            email,
            passwordHash,
            // show confirmation button and request to /authenticate/email/verify with email and password again and verification id
            verificationCode: authVerificationCode,
          },
        });
      }
    };
    if (email && passwordHash) {
      return resendVerificationCode({
        email,
        passwordHash,
      }).then(onVerifyUserSuccess, error => {
        return handleError({error, onError, dispatch});
      });
    }
  };
};

export {handleResendVerificationCode};
