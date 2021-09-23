import {chatActions} from './actions';

const initialState = {
  chatList: {},
  isSocketInitiated: false,
  chattableLotteries: [],
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case chatActions.initChatSocketCommunication: {
      return {
        ...state,
        isSocketInitiated: action.payload,
      };
    }
    case chatActions.disconnectChatSocketCommunication: {
      return {
        ...state,
        isSocketInitiated: false,
      };
    }
    case chatActions.setChatConversation: {
      const {
        conversation,
        lotteryPosterId,
        winnerUserId,
        lotteryId,
      } = action.payload;
      console.log('setChatConversation: ', action.payload);
      if (state.chatList[lotteryId]) {
        if (Array.isArray(conversation) && conversation.length) {
          const updatedChatList = {
            [lotteryId]: {
              conversation,
              lotteryPosterId,
              winnerUserId,
            },
          };
          return {
            ...state,
            chatList: {
              ...state.chatList,
              ...updatedChatList,
            },
          };
        }
      } else {
        return {
          ...state,
          chatList: {
            ...state.chatList,
            [lotteryId]: {
              conversation:
                Array.isArray(conversation) && conversation.length
                  ? conversation
                  : [],
              lotteryPosterId,
              winnerUserId,
            },
          },
        };
      }
      return {
        ...state,
      };
    }
    case chatActions.receiveChatMessage: {
      const {
        messageObject,
        lotteryPosterId,
        winnerUserId,
        lotteryId,
        from,
        to,
      } = action.payload;
      if (state.chatList[lotteryId]) {
        let updatedConversation = [...state.chatList[lotteryId].conversation];
        if (messageObject) {
          updatedConversation = [...updatedConversation, messageObject].filter(
            Boolean,
          );
        }
        const updatedChatList = {
          [lotteryId]: {
            conversation: updatedConversation || [],
            lotteryPosterId,
            winnerUserId,
          },
        };
        return {
          ...state,
          chatList: {
            ...state.chatList,
            ...updatedChatList,
          },
        };
      } else {
        return {
          ...state,
          chatList: {
            ...state.chatList,
            [lotteryId]: {
              conversation: messageObject ? [messageObject] : [],
              lotteryPosterId,
              winnerUserId,
            },
          },
        };
      }
    }
    case chatActions.setChattableLotteries: {
      return {
        ...state,
        chattableLotteries:
          Array.isArray(action.payload) && action.payload.length
            ? action.payload
            : [],
      };
    }
    case chatActions.likeLottery: {
      let {chattableLotteries: lotteries} = state;
      const lottery = action.payload;
      if (lottery && lottery.id && lotteries && lotteries.length) {
        return {
          ...state,
          chattableLotteries: lotteries.map(item => {
            if (`${item.id}` === `${lottery.id}`) {
              return {
                ...lottery,
                id: `${lottery.id}`,
                userId: `${lottery.userId}`,
              };
            }
            return item;
          }),
        };
      }
      return {
        ...state,
      };
    }
    case chatActions.dislikeLottery: {
      let {chattableLotteries: lotteries} = state;
      const lottery = action.payload;
      if (lottery && lottery.id && lotteries && lotteries.length) {
        return {
          ...state,
          chattableLotteries: lotteries.map(item => {
            if (`${item.id}` === `${lottery.id}`) {
              return {
                ...lottery,
                id: `${lottery.id}`,
                userId: `${lottery.userId}`,
              };
            }
            return item;
          }),
        };
      }
      return {
        ...state,
      };
    }
    case chatActions.editLottery: {
      if (
        action.payload &&
        Array.isArray(state.chattableLotteries) &&
        state.chattableLotteries.length
      ) {
        return {
          ...state,
          chattableLotteries: state.chattableLotteries.map(item => {
            if (`${item.id}` === `${action.payload.id}`) {
              return {
                ...action.payload,
                id: `${action.payload.id}`,
                userId: `${action.payload.userId}`,
              };
            }
            return item;
          }),
        };
      }
      return {
        ...state,
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
