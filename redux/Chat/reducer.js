import {chatActions} from './actions';

// lotteryPosterId: 5758387459457024 lotteryWinnerUserId: 5662484329398272

const initialState = {
  conversation: [
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
  ],
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case chatActions.setChatConversation: {
      const stateConversation =
        Array.isArray(state.conversation) && state.conversation.length
          ? state.conversation
          : [];
      let conversation = [...stateConversation];
      if (Array.isArray(action.payload) && action.payload.length) {
        conversation = [...conversation, ...action.payload];
      }
      return {
        ...state,
        conversation,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default chatReducer;
