import {Alert} from 'react-native';
import {errors} from '../../constants/Texts';
import invoke from 'lodash/invoke';
import SocketIOClient from 'socket.io-client';
import {apiRequest} from '../../constants/Api';

let socket = null;

const chatActions = {
  setChatConversation: 'SET_CHAT_COVERSTATION',
  initChatSocketCommunication: 'INIT_SOCKET_CHAT_COMMUNICATION',
  disconnectChatSocketCommunication: 'DISCONNECT_SOCKET_CHAT_COMMUNICATION',
  receiveChatMessage: 'CHAT_RECEIVE_MESSAGE',
  setChattableLotteries: 'CHAT_SET_CHATTABLE_LOTTERIES',
  likeLottery: 'CHAT_LIKE_LOTTERY',
  dislikeLottery: 'CHAT_DISLIKE_LOTTERY',
  editLottery: 'CHAT_EDIT_LOTTERY',
  cancelLottery: 'CHAT_CANCEL_LOTTERY',
  markLotteryAsReceived: 'CHAT_MARK_LOTTERY_AS_RECEIVED',
  markLotteryAsShipped: 'CHAT_MARK_LOTTERY_AS_SHIPPED',
  enterLottery: 'CHAT_ENTER_LOTTERY',
};

const handleInitChatSocketCommunication = payload => {
  return (dispatch, getState) => {
    const {userId} = payload;
    if (userId) {
      const isSocketInitiated = getState().chatReducer.isSocketInitiated;
      if (!isSocketInitiated) {
        socket = SocketIOClient(apiRequest.apiUri);
        socket.open();
        socket.connect();
        socket.on('connect', () => {
          return dispatch({
            type: chatActions.initChatSocketCommunication,
            payload: true,
          });
        });
      }
    }
  };
};

const handleDisconnectChatSocketCommunication = payload => {
  return (dispatch, getState) => {
    // const userId = getState().authReducer.user.id;
    // socket.emit('disconnect.userId', userId);
    socket.disconnect();
    socket.close();
    socket = null;
    return dispatch({
      type: chatActions.disconnectChatSocketCommunication,
      payload: false,
    });
  };
};

const handleReceiveChatMessage = payload => {
  return dispatch => {
    return dispatch({
      type: chatActions.receiveChatMessage,
      payload,
    });
  };
};

const handleSendChatMessage = payload => {
  return (dispatch, getState) => {
    const {
      lotteryPosterId,
      lotteryId,
      winnerUserId,
      chatMessage,
      from,
      to,
      onEror,
    } = payload;
    socket.emit('chatMessage', {
      from,
      to,
      lotteryPosterId,
      lotteryId,
      winnerUserId,
      chatMessage,
    });
  };
};

const handleError = (props, getState) => {
  const lang = getState().settingsReducer.lang;
  const {error} = props;
  const message = (error && error.message) || errors[lang].error;
  invoke(props, 'onError');
  if (message) {
    Alert.alert(message);
  }
  return;
};

export {
  chatActions,
  handleError,
  handleInitChatSocketCommunication,
  handleSendChatMessage,
  handleReceiveChatMessage,
  handleDisconnectChatSocketCommunication,
  socket,
};
