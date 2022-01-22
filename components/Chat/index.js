import React, {useEffect, useRef, useState} from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, Text, TextInput, View} from 'react-native';
import styles from './chat.style';
import {IconToggle, Toolbar} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import {loadingPopup} from '../Loading';
import {chat as chatText} from '../../constants/Texts';
import {
  getConversationSelector,
  getIsSocketInitiatedSelector,
} from './Selectors';
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
import {getLangSelector} from '../Settings/Selectors';

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
    lang,
  } = props;
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
  const renderListItem = ({item}) => {
    const pullRight =
      (isWinner && item.userId === lotteryWinner.id) ||
      (isLotteryPoster && item.userId === lotteryPoster.id);
    return (
      <View
        style={[
          styles.chatConversationListItemViewContainer,
          pullRight && styles.chatConversationListItemViewContainerPullRight,
        ]}>
        <View
          style={[
            styles.chatConversationTextMessageViewContainer,
            pullRight &&
              styles.chatConversationTextMessageViewContainerPullRight,
          ]}>
          <Text style={styles.chatConversationTextMessage}>{item.message}</Text>
        </View>
        <Text style={styles.chatConversationTextMessageDate}>
          {formatDate(item.date, lang)}
        </Text>
      </View>
    );
  };

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
        if (virtualizedListRef && virtualizedListRef.current) {
          virtualizedListRef.current.scrollToEnd();
        }
      });
      hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
        if (virtualizedListRef && virtualizedListRef.current) {
          virtualizedListRef.current.scrollToEnd();
        }
      });
    }
    return () => {
      if (socket) {
        socket.emit('disconnect.userId', {
          userId: authUserId,
          lotteryId: lottery.id,
          lotteryPosterId: lotteryPoster.id,
          winnerUserId: lotteryWinner.id,
        });
        socket.off('chatMessage', onChangeMessageCallback);
      }
      if (showSubscription) {
        showSubscription.remove();
      }
      if (hideSubscription) {
        hideSubscription.remove();
      }
    };
  }, [isSocketInitiated]);

  useEffect(() => {
    setTimeout(() => {
      if (virtualizedListRef && virtualizedListRef.current) {
        virtualizedListRef.current.scrollToEnd();
      }
    }, 500);
  }, [conversation]);

  return (
    <Modal
      animationType="slide"
      onRequestClose={handleCloseModal}
      onShow={onShow}>
      <SafeAreaView style={styles.rootSafeAreaView}>
        <View style={styles.innerSafeAreaView}>
          <Toolbar
            style={{container: styles.toolbarContainer}}
            leftElement="arrow-back"
            centerElement={
              isWinner
                ? chatText[lang].chatWithOwner
                : chatText[lang].chatWithWinner
            }
            onLeftElementPress={handleCloseModal}
          />
          {loading && loadingPopup}
          {!loading ? (
            <KeyboardAvoidingView
              style={styles.chatAnimatedKeyboardAvoidingView}
              keyboardVerticalOffset={50}
              behavior={'padding'}>
              <View style={styles.chatViewContainer}>
                <VirtualizedList
                  initialNumToRender={conversation ? conversation.length : 20}
                  maxToRenderPerBatch={conversation ? conversation.length : 20}
                  removeClippedSubviews={true}
                  refreshing={loading}
                  onRefresh={onShow}
                  horizontal={false}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={
                    styles.chatVirtualizedListContentContainer
                  }
                  data={conversation}
                  getItem={getItem}
                  getItemCount={getItemCount}
                  keyExtractor={getItemKey}
                  renderItem={renderListItem}
                  ref={virtualizedListRef}
                  ListEmptyComponent={
                    !loading ? (
                      <View style={styles.emptyChatViewContainer}>
                        <Text style={styles.emptyChatViewContainerText}>
                          {chatText[lang].emptyChat}
                        </Text>
                      </View>
                    ) : null
                  }
                />
              </View>
              <View style={styles.chatBottomToolbar}>
                <TextInput
                  style={styles.chatMessageTextInput}
                  onChangeText={handleOnMessageChange}
                  value={chatMessage}
                  autoCorrect={false}
                  autoCapitalize={false}
                  multiline={true}
                  numberOfLines={4}
                  maxLength={500}
                />
                <IconToggle
                  name="send"
                  color="white"
                  size={30}
                  disabled={!chatMessage}
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
  lang: PropTypes.string,
};

const mapStateToProps = (state, props) => {
  return {
    conversation: getConversationSelector(state, props),
    isSocketInitiated: getIsSocketInitiatedSelector(state),
    lang: getLangSelector(state),
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
