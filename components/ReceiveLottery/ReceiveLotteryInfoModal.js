import React, {useState} from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, ScrollView, Text, View} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Icon, Toolbar, Button} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import {loadingPopup} from '../Loading';
import {
  receiveLottery as receiveLotteryTexts,
  lotteryDetails as lotteryDetailsTexts,
} from '../../Constants/Texts';
import {getUserSelector} from '../Profile/Selectors';
import {connect} from 'react-redux';
import {
  getLotteryPosterDataSelector,
  getReceiveLotteryDetailsSelector,
} from './Selectors';
import {showReceiveLotteryModal} from '../../redux/ReceiveLottery/actions';
import {handleFetchLotteryPosterData} from '../../redux/ReceiveLottery/FetchLotteryPosterData';
import cancellableFetch from 'react-native-cancelable-fetch';
import FastImage from 'react-native-fast-image';
import ChatModal from '../Chat';
import formatDate from '../../lib/formatDate';
import {handleMarkLotteryAsReceived} from '../../redux/ReceiveLottery/MarkLotteryAsReceived';

const ReceiveLotteryInfoModal = props => {
  const {receiveLotteryDetails, user, lotteryPosterData} = props;
  const {
    id: lotteryId,
    name,
    description,
    category,
    currency,
    price,
    country,
    prefecture,
    city,
    publishDate,
    condition,
    userId,
    // cancelled,
    available,
    lotteryUserIds,
    winnerUserId,
    currentCollectedPrice,
    // images,
    // disableHeaderActions,
  } = receiveLotteryDetails;
  const isWinner = user && user.id && winnerUserId === user.id;
  const isLotteryPoster = user && userId === user.id;
  const [loading, setIsLoading] = useState(true);
  const [showChatModal, setShowChatModal] = useState(false);
  const [cancelHttpTag] = useState(22);

  const fetchUsersDataCallback = () => {
    setIsLoading(false);
  };
  const fetchLotteryPosterData = () => {
    setIsLoading(true);
    invoke(props, 'handleFetchLotteryPosterData', {
      lotteryPosterId: userId,
      onError: fetchUsersDataCallback,
      onSuccess: fetchUsersDataCallback,
      cancelHttpTag: cancelHttpTag,
    });
  };

  const handleCloseModal = () => {
    invoke(props, 'onClose');
    invoke(props, 'handleShowReceiveLotteryModal', undefined);
    cancellableFetch.abort(cancelHttpTag);
  };

  const handleChatButtonPress = () => {
    setShowChatModal(true);
  };
  const handleChatModalClose = () => {
    setShowChatModal(false);
  };

  const onShow = () => {
    fetchLotteryPosterData();
  };

  const handleMarkAsReceivedCallback = () => {
    setIsLoading(false);
    handleCloseModal();
  };
  const handleMarkAsReceivedPress = () => {
    setIsLoading(true);
    invoke(props, 'handleMarkLotteryAsReceived', {
      lotteryId,
      onSuccess: handleMarkAsReceivedCallback,
      onError: handleMarkAsReceivedCallback,
      cancelHttpTag: cancelHttpTag,
    });
  };

  return (
    <Modal
      animationType="slide"
      onShow={onShow}
      onDismiss={handleCloseModal}
      onRequestClose={handleCloseModal}>
      <SafeAreaView
        style={[sharedStyles.rootSafeAreaView, sharedStyles.container]}>
        <View style={sharedStyles.innerSafeAreaView}>
          <Toolbar
            style={{container: sharedStyles.toolbarContainer}}
            leftElement="arrow-back"
            centerElement={receiveLotteryTexts.receiveLottery}
            onLeftElementPress={handleCloseModal}
          />
          {showChatModal ? (
            <ChatModal
              onClose={handleChatModalClose}
              isWinner={isWinner}
              isLotteryPoster={isLotteryPoster}
              lotteryWinner={user}
              lotteryPoster={lotteryPosterData}
              authUserId={user.id}
              lottery={receiveLotteryDetails}
            />
          ) : null}
          {loading && loadingPopup}
          {!loading && lotteryPosterData ? (
            <>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={sharedStyles.lotteryShipReceiveStepsContainer}>
                  <View style={sharedStyles.lotteryShipReceiveStep}>
                    <FastImage
                      style={sharedStyles.stepImage}
                      source={{
                        uri: lotteryPosterData.image,
                        priority: FastImage.priority.high,
                        cache: FastImage.cacheControl.immutable,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                    <Button
                      primary
                      raised
                      style={{
                        container: sharedStyles.stepButton,
                      }}
                      icon={'chat'}
                      text={'Chat'}
                      onPress={handleChatButtonPress}
                    />
                  </View>
                  <Icon name="arrow-forward" />
                  <View style={sharedStyles.lotteryShipReceiveStep}>
                    <FastImage
                      style={sharedStyles.stepImage}
                      source={{
                        uri: receiveLotteryDetails.images[0],
                        priority: FastImage.priority.high,
                        cache: FastImage.cacheControl.immutable,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  </View>
                  <Icon name="arrow-forward" />
                  <View style={sharedStyles.lotteryShipReceiveStep}>
                    <FastImage
                      style={sharedStyles.stepImage}
                      source={{
                        uri: user.image,
                        priority: FastImage.priority.high,
                        cache: FastImage.cacheControl.immutable,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  </View>
                </View>
                <View style={sharedStyles.shipReceiveLotteryInfoContainer}>
                  <Icon name="notifications-active" color="black" />
                  <Text style={sharedStyles.receiveLotteryAnnouncement}>
                    {receiveLotteryTexts.announcement}
                  </Text>
                  <View style={sharedStyles.userDetailsIconTextContainer}>
                    <Icon color="rgba(0,0,0,.55)" name="dns" />
                    <Text style={sharedStyles.userDetailsText}>
                      {lotteryDetailsTexts.name}
                    </Text>
                  </View>
                  <View style={sharedStyles.aboutFirstSectionTextContainer}>
                    <Text style={sharedStyles.aboutFirstSectionText}>
                      {name}
                    </Text>
                  </View>
                  <View style={sharedStyles.userDetailsIconTextContainer}>
                    <Icon color="rgba(0,0,0,.55)" name="description" />
                    <Text style={sharedStyles.userDetailsText}>
                      {lotteryDetailsTexts.description}
                    </Text>
                  </View>
                  <View style={sharedStyles.aboutFirstSectionTextContainer}>
                    <Text style={sharedStyles.aboutFirstSectionText}>
                      {description}
                    </Text>
                  </View>
                  <View style={sharedStyles.userDetailsIconTextContainer}>
                    <Icon color="rgba(0,0,0,.55)" name="exposure" />
                    <Text style={sharedStyles.userDetailsText}>
                      {lotteryDetailsTexts.condition}
                    </Text>
                  </View>
                  <View style={sharedStyles.aboutFirstSectionTextContainer}>
                    <Text style={sharedStyles.aboutFirstSectionText}>
                      {condition}
                    </Text>
                  </View>
                  <View style={sharedStyles.userDetailsIconTextContainer}>
                    <Icon color="rgba(0,0,0,.55)" name="class" />
                    <Text style={sharedStyles.userDetailsText}>
                      {lotteryDetailsTexts.category}
                    </Text>
                  </View>
                  <View style={sharedStyles.aboutFirstSectionTextContainer}>
                    <Text style={sharedStyles.aboutFirstSectionText}>
                      {category}
                    </Text>
                  </View>
                  <View style={sharedStyles.userDetailsIconTextContainer}>
                    <Icon color="rgba(0,0,0,.55)" name="local-atm" />
                    <Text style={sharedStyles.userDetailsText}>
                      {lotteryDetailsTexts.totalPrice}
                    </Text>
                  </View>
                  <View style={sharedStyles.aboutFirstSectionTextContainer}>
                    <Text
                      style={
                        sharedStyles.aboutFirstSectionText
                      }>{`${currency} ${price}`}</Text>
                  </View>
                  <View style={sharedStyles.userDetailsIconTextContainer}>
                    <Icon color="rgba(0,0,0,.55)" name="credit-card" />
                    <Text style={sharedStyles.userDetailsText}>
                      {lotteryDetailsTexts.collectedPrice}
                    </Text>
                  </View>
                  <View style={sharedStyles.aboutFirstSectionTextContainer}>
                    <Text
                      style={
                        sharedStyles.aboutFirstSectionText
                      }>{`${currency} ${currentCollectedPrice || 0}`}</Text>
                  </View>
                  <View style={sharedStyles.userDetailsIconTextContainer}>
                    <Icon color="rgba(0,0,0,.55)" name="monetization-on" />
                    <Text style={sharedStyles.userDetailsText}>
                      {lotteryDetailsTexts.payToWin}
                    </Text>
                  </View>
                  <View style={sharedStyles.aboutFirstSectionTextContainer}>
                    <Text
                      style={
                        sharedStyles.aboutFirstSectionText
                      }>{`${currency} ${'100'}`}</Text>
                  </View>
                  <View style={sharedStyles.userDetailsIconTextContainer}>
                    <Icon color="rgba(0,0,0,.55)" name="today" />
                    <Text style={sharedStyles.userDetailsText}>
                      {lotteryDetailsTexts.publishDate}
                    </Text>
                  </View>
                  <View style={sharedStyles.aboutFirstSectionTextContainer}>
                    <Text style={sharedStyles.aboutFirstSectionText}>
                      {formatDate(publishDate)}
                    </Text>
                  </View>
                  <View style={sharedStyles.userDetailsIconTextContainer}>
                    <Icon color="rgba(0,0,0,.55)" name="pin-drop" />
                    <Text style={sharedStyles.userDetailsText}>
                      {lotteryDetailsTexts.location}
                    </Text>
                  </View>
                  <View style={sharedStyles.aboutFirstSectionTextContainer}>
                    <Text style={sharedStyles.aboutFirstSectionText}>
                      {`${country}, ${prefecture}, ${city}`}
                    </Text>
                  </View>
                </View>
              </ScrollView>
              <View style={sharedStyles.lotteryDetailsBottomToolbar}>
                <Button
                  primary
                  raised
                  style={{
                    container: sharedStyles.bottomToolbarActionButtonContainer,
                  }}
                  icon={'markunread-mailbox'}
                  text={'Mark as received'}
                  onPress={handleMarkAsReceivedPress}
                />
              </View>
            </>
          ) : null}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

ReceiveLotteryInfoModal.propTypes = {
  onClose: PropTypes.func,
  receiveLotteryDetails: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    user: getUserSelector(state),
    receiveLotteryDetails: getReceiveLotteryDetailsSelector(state),
    lotteryPosterData: getLotteryPosterDataSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleShowReceiveLotteryModal: payload =>
      dispatch(showReceiveLotteryModal(payload)),
    handleFetchLotteryPosterData: payload =>
      dispatch(handleFetchLotteryPosterData(payload)),
    handleMarkLotteryAsReceived: payload =>
      dispatch(handleMarkLotteryAsReceived(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReceiveLotteryInfoModal);
