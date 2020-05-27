import {update} from '../../services/Auth';
import {handleError, authActions} from './actions';
import invoke from 'lodash/invoke';

const handlerUpdateUserData = payload => {
  return dispatch => {
    const {onError, updatedUserData} = payload;
    const onUpdateUserSuccess = data => {
      let {error, user: updatedUser} = data;
      if (error) {
        return handleError({error, onError});
      }
      invoke(payload, 'onSuccess');
      return dispatch({
        type: authActions.UPDATE,
        payload: updatedUser,
      });
    };
    return update(updatedUserData).then(onUpdateUserSuccess, error => {
      return handleError({error, onError});
    });
  };
};

export {handlerUpdateUserData};
