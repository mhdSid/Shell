import {handleError, authActions} from './actions';
import {logout} from '../../services/Auth';
import invoke from 'lodash/invoke';
import {homeActions} from '../Home/actions';
import {lotteriesActions} from '../Lotteries/actions';
import {lotteryDetailsActions} from '../LotteryDetails/actions';
import {lotteryResultActions} from '../LotteryResult/actions';
import {receiveLotteryActions} from '../ReceiveLottery/actions';
import {searchActions} from '../Search/actions';
import {settingsActions} from '../Settings/actions';
import {shipLotteryActions} from '../ShipLottery/actions';

const handleLogout = payload => {
  return (dispatch, getState) => {
    const {onError} = payload;
    /*
     * Logout Handler
     */
    const onLogoutSuccess = data => {
      const {error} = data;
      if (error) {
        return handleError({error, onError, dispatch}, getState);
      }
      invoke(payload, 'onSuccess');
      dispatch({
        type: homeActions.resetState,
      });
      dispatch({
        type: lotteriesActions.resetState,
      });
      dispatch({
        type: lotteryDetailsActions.resetState,
      });
      dispatch({
        type: lotteryResultActions.resetState,
      });
      dispatch({
        type: receiveLotteryActions.resetState,
      });
      dispatch({
        type: searchActions.resetState,
      });
      dispatch({
        type: settingsActions.resetState,
      });
      dispatch({
        type: shipLotteryActions.resetState,
      });
      return dispatch({
        type: authActions.logout,
        payload: {
          loggedIn: false,
          user: false,
        },
      });
    };
    return logout().then(onLogoutSuccess, error => {
      return handleError({error, onError, dispatch}, getState);
    });
  };
};

export {handleLogout};
