import {updateUserBackground} from '../../services/Auth';
import {handleError, authActions} from './actions';
import invoke from 'lodash/invoke';

const handleUpdateUserDataBackground = payload => {
  return dispatch => {
    const {onError, updatedUserData} = payload;
    const onUpdateUserSuccess = data => {
      let {error, user: updatedUser} = data;
      if (error) {
        return handleError({error, onError});
      }
      invoke(payload, 'onSuccess');
      return dispatch({
        type: authActions.update,
        payload: updatedUser,
      });
    };
    return updateUserBackground(updatedUserData).then(
      onUpdateUserSuccess,
      error => {
        return handleError({error, onError});
      },
    );
  };
};

export {handleUpdateUserDataBackground};
