import {createSelector} from 'reselect';

// lotteryPosterId: 5758387459457024 lotteryWinnerUserId: 5662484329398272

const testConversation = [
  {
    message: 'hello, I want to send you the item that you have won',
    date: new Date(),
    id: '111',
    userId: '5758387459457024',
  },
  {
    message: 'hello, ok what information do you need from me?',
    date: new Date(),
    id: '222',
    userId: '5662484329398272',
  },
  {
    message: 'Please send me your address',
    date: new Date(),
    id: '333',
    userId: '5758387459457024',
  },
  {
    message:
      'My address is Tokyo, Sumida-ku, Kikukawa 3-8-1 Kamida hana building 202',
    date: new Date(),
    id: '444',
    userId: '5662484329398272',
  },
  {
    message:
      'Got it, thanks for sending it to me. I will let you know once I ship it.',
    date: new Date(),
    id: '555',
    userId: '5758387459457024',
  },
  {
    message: 'hello, I want to send you the item that you have won',
    date: new Date(),
    id: '6',
    userId: '5758387459457024',
  },
  {
    message: 'hello, ok what information do you need from me?',
    date: new Date(),
    id: '7',
    userId: '5662484329398272',
  },
  {
    message: 'Please send me your address',
    date: new Date(),
    id: '8',
    userId: '5758387459457024',
  },
  {
    message:
      'My address is Tokyo, Sumida-ku, Kikukawa 3-8-1 Kamida hana building 202',
    date: new Date(),
    id: '9',
    userId: '5662484329398272',
  },
  {
    message:
      'Got it, thanks for sending it to me. I will let you know once I ship it.',
    date: new Date(),
    id: '11',
    userId: '5758387459457024',
  },
];

const getConversation = (state, props) => {
  const chatList = state.chatReducer.chatList;
  const {lottery, lotteryPoster, lotteryWinner} = props;
  const lotteryId = lottery.id;
  const lotteryPosterId = lotteryPoster.id;
  const winnerUserId = lotteryWinner.id;
  if (
    chatList &&
    chatList[`${lotteryId}`] &&
    chatList[`${lotteryId}`].lotteryPosterId === lotteryPosterId &&
    chatList[`${lotteryId}`].winnerUserId === winnerUserId &&
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
