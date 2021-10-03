import {verify} from '../../services/auth';
import {handleError, authActions} from './actions';
import invoke from 'lodash/invoke';
import {errors} from '../../Constants/Texts';
import {Alert} from 'react-native';

const handleVerifyUser = payload => {
  return dispatch => {
    const {email, passwordHash, verificationCode, onError} = payload;
    /*
     * Verify user Handler
     */
    // show confirmation button and request to /authenticate/email/verify with email and password again and verification id
    const onVerifyUserSuccess = data => {
      const {error, user: authUser} = data;
      if (error) {
        const message = (error && error.message) || errors.error;
        invoke(payload, 'onError');
        if (message) {
          Alert.alert(message);
        }
        return;
      }
      const {verificationCode: authVerificationCode, emailVerified} = authUser;
      invoke(payload, 'onSuccess');
      if (emailVerified === true && authVerificationCode) {
        dispatch({
          type: authActions.login,
          payload: {
            showSignup: true,
          },
        });
      }
    };
    if (email && passwordHash && verificationCode) {
      return verify({email, passwordHash, verificationCode}).then(
        onVerifyUserSuccess,
        error => {
          return handleError({error, onError, dispatch});
        },
      );
    }
  };
};

export {handleVerifyUser};
