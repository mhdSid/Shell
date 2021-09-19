import React, {createRef, useEffect, useState} from 'react';
import invoke from 'lodash/invoke';
import {
  Modal,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Button, Icon, IconToggle, Toolbar} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import {loadingPopup} from '../Loading';
import {chat as chatText} from '../../Constants/Texts';
import {getConversationSelector} from './Selectors';
import {handleFetchConversation} from '../../redux/Chat/FetchConversation';
import {connect} from 'react-redux';
import {handleSendChatMessage} from '../../redux/Chat/SendChatMessage';
import {VirtualizedList} from 'react-native';
import formatDate from '../../lib/formatDate';
import {KeyboardAvoidingView} from 'react-native';
import { Animated } from 'react-native';
import { Keyboard } from 'react-native';

const ChatModal = props => {
  const {
    isWinner,
    isLotteryPoster,
    lottery,
    lotteryPoster,
    lotteryWinner,
    conversation,
  } = props;
  // console.log(conversation, lotteryPoster.id, lotteryWinner.id); // lotteryPosterId: 5758387459457024 lotteryWinnerUserId: 5662484329398272
  const [loading, setIsLoading] = useState(false);
  const [chatMessage, setChatMessage] = useState(false);

  const virtualizedListRef = createRef();

  const handleKeyboardDidShow = () => {
    // const scrollRef = virtualizedListHeight.current.getScrollRef().current;
    // console.log(virtualizedListRef.current.getScrollRef());
    // setVirtualizedListHeight(event.endCoordinates.height + 50);
    // Animated.timing(keyboardHeight, {
    //   duration: 0,
    //   toValue: event.endCoordinates.height - 35,
    // }).start();
    // setCurrentScrollPosition(currentScrollPosition);
    // virtualizedListRef.current.getScrollRef().scrollTo({
    //   x: 0,
    //   y: currentScrollPosition,
    //   animated: true,
    // });
    virtualizedListRef.current.scrollToEnd();
  };

  const handleKeyboardDidHide = () => {
    // setVirtualizedListHeight('100%');
    // Animated.timing(keyboardHeight, {
    //   duration: 0,
    //   toValue: 0,
    // }).start();
    // setCurrentScrollPosition(currentScrollPosition);
    // virtualizedListRef.current.getScrollRef().scrollTo({
    //   x: 0,
    //   y: currentScrollPosition,
    //   animated: true,
    // });
    virtualizedListRef.current.scrollToEnd();
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      handleKeyboardDidShow,
    );
    const hideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardDidHide,
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

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
    // setIsLoading(true);
    // invoke(props, 'handleFetchConversation', {
    //   onSuccess: handleFetchConversationCallback,
    //   onError: handleFetchConversationCallback,
    //   lotteryId: lottery.id,
    //   winnerUserId: lotteryWinner.id,
    //   lotteryPosterId: lotteryPoster.id,
    // });
    virtualizedListRef.current.scrollToEnd();
  };
  const handleSendMessagePress = () => {
    // invoke(props, 'handleSendChatMessage', {
    //   onSuccess: handleFetchConversationCallback,
    //   onError: handleFetchConversationCallback,
    //   lotteryId: lottery.id,
    //   winnerUserId: lotteryWinner.id,
    //   lotteryPosterId: lotteryPoster.id,
    //   message,
    // });
  };
  const getItem = (data, index) => data[index];
  const getItemCount = () => conversation.length;
  const getItemKey = item => item.id;
  const renderListItem = ({item, index}) => (
    <View
      style={[
        sharedStyles.chatListItem,
        isWinner &&
          item.userId === lotteryWinner.id &&
          sharedStyles.chatListItemPullRight,
        isLotteryPoster &&
          item.userId === lotteryPoster.id &&
          sharedStyles.chatListItemPullRight,
      ]}>
      <Text>{item.message}</Text>
      <Text>{formatDate(item.date)}</Text>
    </View>
  );

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
          <KeyboardAvoidingView
            style={sharedStyles.chatListAnimatedView}
            keyboardVerticalOffset={50}
            behavior={'padding'}>
            {!loading ? (
              <View style={sharedStyles.chatListContainer}>
                {Array.isArray(conversation) && conversation.length ? (
                  <VirtualizedList
                    initialNumToRender={10}
                    windowSize={2}
                    maxToRenderPerBatch={10}
                    updateCellsBatchingPeriod={0.0}
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
            ) : null}
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
  conversation: PropTypes.oneOfType([PropTypes.array, PropTypes.any]),
};

const mapStateToProps = state => {
  return {
    conversation: getConversationSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleFetchConversation: payload =>
      dispatch(handleFetchConversation(payload)),
    handleSendChatMessage: payload => dispatch(handleSendChatMessage(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatModal);
