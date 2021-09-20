import React, {createRef, useEffect, useRef, useState} from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, Text, TextInput, View} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Button, Icon, IconToggle, Toolbar} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import {loadingPopup} from '../Loading';
import {chat as chatText} from '../../Constants/Texts';
import {getConversationSelector, getIsSocketInitiatedSelector} from './Selectors';
import {handleFetchConversation} from '../../redux/Chat/FetchConversation';
import {connect} from 'react-redux';
import {VirtualizedList} from 'react-native';
import formatDate from '../../lib/formatDate';
import {KeyboardAvoidingView} from 'react-native';
import {Keyboard} from 'react-native';
import {
  handleReceiveChatMessage,
  handleSendChatMessage,
  socket,
} from '../../redux/Chat/actions';

const ChatModal = props => {
  const {
    isWinner,
    isLotteryPoster,
    lottery,
    lotteryPoster,
    lotteryWinner,
    conversation,
    authUserId,
    isSocketInitiated,
  } = props;
  // console.log(conversation, lotteryPoster.id, lotteryWinner.id); // lotteryPosterId: 5758387459457024 lotteryWinnerUserId: 5662484329398272
  const [loading, setIsLoading] = useState(true);
  const [chatMessage, setChatMessage] = useState(false);

  const virtualizedListRef = useRef();

  const handleOnMessageChange = value => {
    setChatMessage(value);
  };

  const handleCloseModal = () => {
    invoke(props, 'onClose');
  };
  const handleFetchConversationCallback = () => {
    setIsLoading(false);
  };
  const onShow = () => {
    setIsLoading(true);
    invoke(props, 'handleFetchConversation', {
      onSuccess: handleFetchConversationCallback,
      onError: handleFetchConversationCallback,
      lotteryId: lottery.id,
      winnerUserId: lotteryWinner.id,
      lotteryPosterId: lotteryPoster.id,
    });
  };
  const handleSendMessagePress = () => {
    if (chatMessage) {
      setChatMessage('');
      invoke(props, 'handleSendChatMessage', {
        onSuccess: handleFetchConversationCallback,
        onError: handleFetchConversationCallback,
        from: authUserId,
        to: isWinner
          ? lotteryPoster.id
          : isLotteryPoster
          ? lotteryWinner.id
          : null,
        lotteryId: lottery.id,
        winnerUserId: lotteryWinner.id,
        lotteryPosterId: lotteryPoster.id,
        chatMessage,
      });
    }
  };
  const getItem = (data, index) => data[index];
  const getItemCount = () => conversation.length;
  const getItemKey = item => item.id;
  const renderListItem = ({item, index}) => (
    <View
      style={[
        sharedStyles.chatListItem,
        ((isWinner && item.userId === lotteryWinner.id) ||
          (isLotteryPoster && item.userId === lotteryPoster.id)) &&
          sharedStyles.chatListItemPullRight,
      ]}>
      <View
        style={[
          sharedStyles.chatTextMessageContainer,
          ((isWinner && item.userId === lotteryWinner.id) ||
            (isLotteryPoster && item.userId === lotteryPoster.id)) &&
            sharedStyles.chatTextMessagePullRight,
        ]}>
        <Text style={sharedStyles.chatTextMessage}>{item.message}</Text>
      </View>
      <Text style={sharedStyles.chatTextMessageDate}>
        {formatDate(item.date)}
      </Text>
    </View>
  );

  useEffect(() => {
    let showSubscription = null;
    let hideSubscription = null;
    let onChangeMessageCallback = null;
    if (isSocketInitiated) {
      socket.emit('connect.userId', {
        userId: authUserId,
        lotteryId: lottery.id,
        lotteryPosterId: lotteryPoster.id,
        winnerUserId: lotteryWinner.id,
      });
      onChangeMessageCallback = data => {
        console.log('just received chat message: ', data);
        // TODO: update this
        if (data) {
          const {
            lotteryPosterId,
            lotteryId,
            winnerUserId,
            messageObject,
            from,
            to,
          } = data;
          if (
            Object.keys(messageObject).length &&
            lotteryPosterId === lotteryPoster.id &&
            lotteryId === lottery.id &&
            winnerUserId === lotteryWinner.id
            // to === authUserId &&
            // ((isWinner && from === lotteryPoster.id) ||
            //   (isLotteryPoster && from === lotteryWinner.id))
          ) {
            invoke(props, 'handleReceiveChatMessage', {
              ...data,
            });
          }
        }
      };
      socket.on('chatMessage', onChangeMessageCallback);
      showSubscription = Keyboard.addListener('keyboardDidShow', () => {
        setTimeout(() => {
          if (virtualizedListRef && virtualizedListRef.current) {
            virtualizedListRef.current.scrollToEnd();
          }
        }, 1000);
      });
      hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
        setTimeout(() => {
          if (virtualizedListRef && virtualizedListRef.current) {
            virtualizedListRef.current.scrollToEnd();
          }
        }, 1000);
      });
    }
    return () => {
      socket.emit('disconnect.userId', {
        userId: authUserId,
        lotteryId: lottery.id,
        lotteryPosterId: lotteryPoster.id,
        winnerUserId: lotteryWinner.id,
      });
      socket.off('chatMessage', onChangeMessageCallback);
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [isSocketInitiated]);

  useEffect(() => {
    setTimeout(() => {
      if (virtualizedListRef && virtualizedListRef.current) {
        virtualizedListRef.current.scrollToEnd();
      }
    }, 1000);
  }, [conversation]);

  return (
    <Modal
      animationType="slide"
      onRequestClose={handleCloseModal}
      onShow={onShow}>
      <SafeAreaView
        style={[sharedStyles.rootSafeAreaView, sharedStyles.chatListView]}>
        <View style={sharedStyles.innerSafeAreaView}>
          <Toolbar
            style={{container: sharedStyles.toolbarContainer}}
            leftElement="arrow-back"
            centerElement={
              isWinner ? chatText.chatWithOwner : chatText.chatWithWinner
            }
            onLeftElementPress={handleCloseModal}
          />
          {loading && loadingPopup}
          {!loading ? (
            <KeyboardAvoidingView
              style={sharedStyles.chatListAnimatedView}
              keyboardVerticalOffset={50}
              behavior={'padding'}>
              <View style={sharedStyles.chatListContainer}>
                {Array.isArray(conversation) && conversation.length ? (
                  <VirtualizedList
                    initialNumToRender={conversation ? conversation.length : 20}
                    maxToRenderPerBatch={
                      conversation ? conversation.length : 20
                    }
                    removeClippedSubviews={true}
                    refreshing={loading}
                    onRefresh={onShow}
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={
                      sharedStyles.chatVirtualizedListContainer
                    }
                    data={conversation}
                    getItem={getItem}
                    getItemCount={getItemCount}
                    keyExtractor={getItemKey}
                    renderItem={renderListItem}
                    ref={virtualizedListRef}
                  />
                ) : (
                  <View style={sharedStyles.emptySearchResultsView}>
                    <Text style={sharedStyles.emptySearchResultsText}>
                      {chatText.emptyChat}
                    </Text>
                  </View>
                )}
              </View>
              <View style={sharedStyles.chatBottomToolbar}>
                <TextInput
                  style={sharedStyles.chatMessageInput}
                  onChangeText={handleOnMessageChange}
                  value={chatMessage}
                  multiline={true}
                  placeholder="Send a message"
                  numberOfLines={4}
                  maxLength={500}
                  // keyboardType="numeric"
                />
                <IconToggle
                  name="send"
                  size={30}
                  onPress={handleSendMessagePress}
                />
              </View>
            </KeyboardAvoidingView>
          ) : null}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

ChatModal.propTypes = {
  onClose: PropTypes.func,
  lottery: PropTypes.object,
  lotteryPoster: PropTypes.object,
  lotteryWinner: PropTypes.object,
  isWinner: PropTypes.bool,
  isLotteryPoster: PropTypes.bool,
  authUserId: PropTypes.string,
  conversation: PropTypes.oneOfType([PropTypes.array, PropTypes.any]),
  isSocketInitiated: PropTypes.bool,
};

const mapStateToProps = (state, props) => {
  return {
    conversation: getConversationSelector(state, props),
    isSocketInitiated: getIsSocketInitiatedSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleFetchConversation: payload =>
      dispatch(handleFetchConversation(payload)),
    handleSendChatMessage: payload => dispatch(handleSendChatMessage(payload)),
    handleReceiveChatMessage: payload =>
      dispatch(handleReceiveChatMessage(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatModal);
