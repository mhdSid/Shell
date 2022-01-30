import {createSelector} from 'reselect';

const getConversation = (state, props) => {
  const chatList = state.chatReducer.chatList;
  const {lottery, lotteryPoster, lotteryWinner} = props;
  const lotteryId = lottery.id;
  const lotteryPosterId = lotteryPoster.id;
  const winnerUserId = lotteryWinner.id;
  if (
    chatList &&
    chatList[`${lotteryId}`] &&
    `${chatList[`${lotteryId}`].lotteryPosterId}` === `${lotteryPosterId}` &&
    `${chatList[`${lotteryId}`].winnerUserId}` === `${winnerUserId}` &&
    Array.isArray(chatList[`${lotteryId}`].conversation) &&
    chatList[lotteryId].conversation.length
  ) {
    return chatList[`${lotteryId}`].conversation;
  }
  return [];
};

const getIsSocketInitiated = state => state.chatReducer.isSocketInitiated;

const getConversationSelector = createSelector(
  [getConversation],
  conversation => conversation,
);

const getChattableLotteries = state => state.chatReducer.chattableLotteries;

const getChattableLotteriesSelector = createSelector(
  [getChattableLotteries],
  chattableLotteries => chattableLotteries,
);

const getIsSocketInitiatedSelector = createSelector(
  [getIsSocketInitiated],
  isSocketInitiated => isSocketInitiated,
);

export {
  getConversationSelector,
  getIsSocketInitiatedSelector,
  getChattableLotteriesSelector,
};
