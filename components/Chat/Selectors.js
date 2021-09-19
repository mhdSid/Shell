import {createSelector} from 'reselect';

const getConversation = state => state.chatReducer.conversation;

const getConversationSelector = createSelector(
  [getConversation],
  conversation => conversation,
);

export {getConversationSelector};
