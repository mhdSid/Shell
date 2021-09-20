// import {handleError} from '../Home/actions';
// import invoke from 'lodash/invoke';
// import {chatActions} from './actions';
// import {sendChatMessage} from '../../services/Chat';

// const handleSendChatMessage = payload => {
//   return dispatch => {
//     const {
//       lotteryPosterId,
//       lotteryId,
//       winnerUserId,
//       message,
//       onEror,
//       cancelTag,
//     } = payload;
//     const onGetSuccess = data => {
//       let {error, sentMessage} = data;
//       if (error) {
//         return handleError({error, onEror});
//       }
//       if (typeof sentMessage === 'string' && sendChatMessage.length) {
//         dispatch({
//           type: chatActions.setChatConversation,
//           payload: [sentMessage],
//         });
//       }
//       return invoke(payload, 'onSuccess');
//     };
//     return sendChatMessage({
//       lotteryId,
//       winnerUserId,
//       lotteryPosterId,
//       message,
//       cancelTag,
//     }).then(onGetSuccess, error => {
//       return handleError({error, onEror});
//     });
//   };
// };

// export {handleSendChatMessage};
