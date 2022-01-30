import React, {useState} from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, ScrollView, Text, View} from 'react-native';
import styles, {stepImageWidth} from './receiveLotteryInfoModal.style';
import {Icon, Toolbar, Button} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import {loadingPopup} from '../Loading';
import {
  receiveLottery as receiveLotteryTexts,
  lotteryDetails as lotteryDetailsTexts,
} from '../../constants/Texts';
import {getUserSelector} from '../Profile/Selectors';
import {connect} from 'react-redux';
import {
  getLotteryPosterDataSelector,
  getReceiveLotteryDetailsSelector,
} from './Selectors';
import {showReceiveLotteryModal} from '../../redux/ReceiveLottery/actions';
import {handleFetchLotteryPosterData} from '../../redux/ReceiveLottery/FetchLotteryPosterData';
import cancellableFetch from 'react-native-cancelable-fetch';
import ChatModal from '../Chat';
import formatDate from '../../lib/formatDate';
import {handleMarkLotteryAsReceived} from '../../redux/ReceiveLottery/MarkLotteryAsReceived';
import FastImage from 'react-native-fast-image';
import {getLangSelector} from '../Settings/Selectors';
import {Alert} from 'react-native';

const ReceiveLotteryInfoModal = React.memo(props => {
  const {receiveLotteryDetails, user, lotteryPosterData, lang} = props;
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
    winnerUserId,
    currentCollectedPrice,
  } = receiveLotteryDetails;
  const isWinner = user && user.id && `${winnerUserId}` === `${user.id}`;
  const isLotteryPoster = user && `${userId}` === `${user.id}`;
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

  const markLotteryAsReceivedPress = () => {
    setIsLoading(true);
    invoke(props, 'handleMarkLotteryAsReceived', {
      lotteryId,
      onSuccess: handleMarkAsReceivedCallback,
      onError: handleMarkAsReceivedCallback,
      cancelHttpTag: cancelHttpTag,
    });
  };

  const handleMarkAsReceivedPress = () => {
    Alert.alert(
      receiveLotteryTexts[lang].receiveAlertTitle,
      receiveLotteryTexts[lang].receiveAlertMessage,
      [
        {
          text: receiveLotteryTexts[lang].markAsReceived,
          onPress: markLotteryAsReceivedPress,
        },
        {
          text: receiveLotteryTexts[lang].cancel,
          style: 'cancel',
        },
      ],
    );
  };

  return (
    <Modal
      animationType="slide"
      onShow={onShow}
      onDismiss={handleCloseModal}
      onRequestClose={handleCloseModal}>
      <SafeAreaView style={styles.rootSafeAreaView}>
        <View style={styles.innerSafeAreaView}>
          <Toolbar
            style={{container: styles.toolbarContainer}}
            leftElement="arrow-back"
            centerElement={receiveLotteryTexts[lang].receiveLottery}
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
              <ScrollView>
                <View style={styles.topStepsViewContainer}>
                  <View style={styles.topStepsSectionBlockContainer}>
                    {lotteryPosterData.image ? (
                      <FastImage
                        style={styles.topStepsSectionBlockContainerImage}
                        source={{
                          uri: lotteryPosterData.image,
                          priority: FastImage.priority.high,
                          cache: FastImage.cacheControl.web,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    ) : (
                      <Icon name="account-circle" size={stepImageWidth} />
                    )}
                    <Button
                      primary
                      raised
                      style={{
                        container: styles.topStepsSectionBlockContainerButton,
                      }}
                      icon={'chat'}
                      text={'Chat'}
                      onPress={handleChatButtonPress}
                    />
                  </View>
                  <Icon name="arrow-forward" />
                  <View style={styles.topStepsSectionBlockContainer}>
                    <FastImage
                      style={styles.topStepsSectionBlockContainerImage}
                      source={{
                        uri: receiveLotteryDetails.images[0],
                        priority: FastImage.priority.high,
                        cache: FastImage.cacheControl.web,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  </View>
                  <Icon name="arrow-forward" />
                  <View style={styles.topStepsSectionBlockContainer}>
                    {user.image ? (
                      <FastImage
                        style={styles.topStepsSectionBlockContainerImage}
                        source={{
                          uri: user.image,
                          priority: FastImage.priority.high,
                          cache: FastImage.cacheControl.web,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    ) : (
                      <Icon name="account-circle" size={stepImageWidth} />
                    )}
                  </View>
                </View>
                <View style={styles.scrollViewContainer}>
                  <Icon name="notifications-active" color="black" />
                  <Text style={styles.receiveLotteryAnnouncementText}>
                    {receiveLotteryTexts[lang].announcement}
                  </Text>
                  <View style={styles.iconTextContainer}>
                    <Icon color="rgba(0,0,0,.55)" name="dns" />
                    <Text style={styles.iconText}>
                      {lotteryDetailsTexts[lang].name}
                    </Text>
                  </View>
                  <View style={styles.sectionBlockContainer}>
                    <Text style={styles.sectionBlockContainerText}>{name}</Text>
                  </View>
                  <View style={styles.iconTextContainer}>
                    <Icon color="rgba(0,0,0,.55)" name="description" />
                    <Text style={styles.iconText}>
                      {lotteryDetailsTexts[lang].description}
                    </Text>
                  </View>
                  <View style={styles.sectionBlockContainer}>
                    <Text style={styles.sectionBlockContainerText}>
                      {description}
                    </Text>
                  </View>
                  <View style={styles.iconTextContainer}>
                    <Icon color="rgba(0,0,0,.55)" name="exposure" />
                    <Text style={styles.iconText}>
                      {lotteryDetailsTexts[lang].condition}
                    </Text>
                  </View>
                  <View style={styles.sectionBlockContainer}>
                    <Text style={styles.sectionBlockContainerText}>
                      {condition}
                    </Text>
                  </View>
                  <View style={styles.iconTextContainer}>
                    <Icon color="rgba(0,0,0,.55)" name="class" />
                    <Text style={styles.iconText}>
                      {lotteryDetailsTexts[lang].category}
                    </Text>
                  </View>
                  <View style={styles.sectionBlockContainer}>
                    <Text style={styles.sectionBlockContainerText}>
                      {category}
                    </Text>
                  </View>
                  <View style={styles.iconTextContainer}>
                    <Icon color="rgba(0,0,0,.55)" name="local-atm" />
                    <Text style={styles.iconText}>
                      {lotteryDetailsTexts[lang].totalPrice}
                    </Text>
                  </View>
                  <View style={styles.sectionBlockContainer}>
                    <Text
                      style={
                        styles.sectionBlockContainerText
                      }>{`${currency} ${price}`}</Text>
                  </View>
                  <View style={styles.iconTextContainer}>
                    <Icon color="rgba(0,0,0,.55)" name="credit-card" />
                    <Text style={styles.iconText}>
                      {lotteryDetailsTexts[lang].collectedPrice}
                    </Text>
                  </View>
                  <View style={styles.sectionBlockContainer}>
                    <Text
                      style={
                        styles.sectionBlockContainerText
                      }>{`${currency} ${currentCollectedPrice || 0}`}</Text>
                  </View>
                  <View style={styles.iconTextContainer}>
                    <Icon color="rgba(0,0,0,.55)" name="monetization-on" />
                    <Text style={styles.iconText}>
                      {lotteryDetailsTexts[lang].payToWin}
                    </Text>
                  </View>
                  <View style={styles.sectionBlockContainer}>
                    <Text
                      style={
                        styles.sectionBlockContainerText
                      }>{`${currency} ${'100'}`}</Text>
                  </View>
                  <View style={styles.iconTextContainer}>
                    <Icon color="rgba(0,0,0,.55)" name="today" />
                    <Text style={styles.iconText}>
                      {lotteryDetailsTexts[lang].publishDate}
                    </Text>
                  </View>
                  <View style={styles.sectionBlockContainer}>
                    <Text style={styles.sectionBlockContainerText}>
                      {formatDate(publishDate, lang)}
                    </Text>
                  </View>
                  <View style={styles.iconTextContainer}>
                    <Icon color="rgba(0,0,0,.55)" name="pin-drop" />
                    <Text style={styles.iconText}>
                      {lotteryDetailsTexts[lang].location}
                    </Text>
                  </View>
                  <View style={styles.sectionBlockContainer}>
                    <Text style={styles.sectionBlockContainerText}>
                      {`${country}, ${prefecture}, ${city}`}
                    </Text>
                  </View>
                </View>
              </ScrollView>
              <View style={styles.bottomToolbarViewContainer}>
                <Button
                  primary
                  raised
                  style={{
                    container: styles.markAsReceivedButtonContainer,
                  }}
                  icon={'markunread-mailbox'}
                  text={receiveLotteryTexts[lang].markAsReceived}
                  onPress={handleMarkAsReceivedPress}
                />
              </View>
            </>
          ) : null}
        </View>
      </SafeAreaView>
    </Modal>
  );
});

ReceiveLotteryInfoModal.propTypes = {
  onClose: PropTypes.func,
  receiveLotteryDetails: PropTypes.object,
  lang: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    user: getUserSelector(state),
    receiveLotteryDetails: getReceiveLotteryDetailsSelector(state),
    lotteryPosterData: getLotteryPosterDataSelector(state),
    lang: getLangSelector(state),
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
