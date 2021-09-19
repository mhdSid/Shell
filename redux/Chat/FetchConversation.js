import {handleError} from '../Home/actions';
import invoke from 'lodash/invoke';
import {chatActions} from './actions';
import {getConversation} from '../../services/Chat';

const handleFetchConversation = payload => {
  return dispatch => {
    const {
      lotteryPosterId,
      lotteryId,
      winnerUserId,
      onEror,
      cancelTag,
    } = payload;
    const onGetSuccess = data => {
      let {error, conversation} = data;
      if (error) {
        return handleError({error, onEror});
      }
      if (Array.isArray(conversation) && conversation.length) {
        dispatch({
          type: chatActions.setChatConversation,
          payload: conversation,
        });
      }
      return invoke(payload, 'onSuccess');
    };
    return getConversation({
      lotteryId,
      winnerUserId,
      lotteryPosterId,
      cancelTag,
    }).then(onGetSuccess, error => {
      return handleError({error, onEror});
    });
  };
};

export {handleFetchConversation};
