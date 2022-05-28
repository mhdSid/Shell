import {request} from './Request';
import sha256 from 'crypto-js/sha256';
import {password as hashkey} from './Encrypt';

export const getConversation = async props => {
  const {lotteryId, winnerUserId, lotteryPosterId, cancelTag} = props;
  return await request({
    endpoint: 'api/chat/conversation',
    method: 'POST',
    cancelTag,
    body: {
      lotteryId,
      winnerUserId,
      lotteryPosterId,
      hash: sha256(
        lotteryId + winnerUserId + lotteryPosterId + hashkey,
      ).toString(),
    },
  });
};

export const sendChatMessage = async props => {
  const {lotteryId, winnerUserId, lotteryPosterId, message, cancelTag} = props;
  return await request({
    endpoint: 'api/chat/conversation',
    method: 'POST',
    cancelTag,
    body: {
      lotteryId,
      winnerUserId,
      lotteryPosterId,
      message,
      hash: sha256(
        lotteryId + winnerUserId + lotteryPosterId + message + hashkey,
      ).toString(),
    },
  });
};
