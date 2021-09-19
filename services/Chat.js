import {request} from './Request';
import sha256 from 'crypto-js/sha256';
import {decrypt, encrypt, password as hashkey} from './Encrypt';

const getConversation = async props => {
  const {lotteryId, winnerUserId, lotteryPosterId, cancelTag} = props;
  const data = await request({
    endpoint: 'chat/conversation',
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
  return data;
};

const sendChatMessage = async props => {
  const {lotteryId, winnerUserId, lotteryPosterId, message, cancelTag} = props;
  const data = await request({
    endpoint: 'chat/conversation',
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
  return data;
};

export {getConversation, sendChatMessage};
