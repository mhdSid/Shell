import React, {useState} from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, ScrollView, Text, View} from 'react-native';
import styles, {stepImageWidth} from './shipLotteryInfoModal.style';
import {Button, Icon, Toolbar} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import {loadingPopup} from '../Loading';
import {
  shipLottery as shipLotteryTexts,
  lotteryDetails as lotteryDetailsTexts,
} from '../../constants/Texts';
import {getUserSelector} from '../Profile/Selectors';
import {connect} from 'react-redux';
import {
  getLotteryWinnerDataSelector,
  getShipLotteryDetailsSelector,
} from './Selectors';
import {showShipLotteryModal} from '../../redux/ShipLottery/actions';
import cancellableFetch from 'react-native-cancelable-fetch';
import {handleFetchLotteryWinnerUserData} from '../../redux/ShipLottery/FetchLotteryWinnerUserData';
import ChatModal from '../Chat';
import formatDate from '../../lib/formatDate';
import {handleMarkLotteryAsShipped} from '../../redux/ShipLottery/MarkLotteryAsShipped';
import FastImage from 'react-native-fast-image';
import {getLangSelector} from '../Settings/Selectors';
import {Alert} from 'react-native';

const ShipLotteryInfoModal = props => {
  const {shipLotteryDetails, user, lotteryWinnerData, lang} = props;
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
  } = shipLotteryDetails;
  const isWinner = user && user.id && winnerUserId === user.id;
  const isLotteryPoster = user && userId === user.id;
  const [loading, setIsLoading] = useState(true);
  const [showChatModal, setShowChatModal] = useState(false);
  const [cancelHttpTag] = useState(33);

  const fetchWinnerUserDataCallback = () => {
    setIsLoading(false);
  };
  const fetchLotteryWinnerData = () => {
    setIsLoading(true);
    invoke(props, 'handleFetchLotteryWinnerData', {
      winnerUserId,
      onError: fetchWinnerUserDataCallback,
      onSuccess: fetchWinnerUserDataCallback,
      cancelHttpTag: cancelHttpTag,
    });
  };
  const handleCloseModal = () => {
    invoke(props, 'onClose');
    invoke(props, 'handleShowShipLotteryModal', undefined);
    cancellableFetch.abort(cancelHttpTag);
  };
  const onShow = () => {
    fetchLotteryWinnerData();
  };
  const handleMarkAsShippedCallback = () => {
    setIsLoading(false);
    handleCloseModal();
  };
  const markLotteryAsReceivedPress = () => {
    setIsLoading(true);
    invoke(props, 'handleMarkLotteryAsShipped', {
      lotteryId,
      onSuccess: handleMarkAsShippedCallback,
      onError: handleMarkAsShippedCallback,
      cancelHttpTag: cancelHttpTag,
    });
  };
  const handleMarkAsShippedPress = () => {
    Alert.alert(
      shipLotteryTexts[lang].shipAlertTitle,
      shipLotteryTexts[lang].shipAlertMessage,
      [
        {
          text: shipLotteryTexts[lang].markAsShipped,
          onPress: markLotteryAsReceivedPress,
        },
        {
          text: shipLotteryTexts[lang].cancel,
          style: 'cancel',
        },
      ],
    );
  };
  const handleChatModalClose = () => {
    setShowChatModal(false);
  };
  const handleChatButtonPress = () => {
    setShowChatModal(true);
  };

  return (
    <Modal
      animationType="slide"
      onRequestClose={handleCloseModal}
      onShow={onShow}
      onDismiss={handleCloseModal}>
      <SafeAreaView style={styles.rootSafeAreaView}>
        <View style={styles.innerSafeAreaView}>
          <Toolbar
            style={{container: styles.toolbarContainer}}
            leftElement="arrow-back"
            centerElement={shipLotteryTexts[lang].shipLottery}
            onLeftElementPress={handleCloseModal}
          />
          {loading && loadingPopup}
          {showChatModal ? (
            <ChatModal
              onClose={handleChatModalClose}
              isWinner={isWinner}
              isLotteryPoster={isLotteryPoster}
              lotteryWinner={lotteryWinnerData}
              lotteryPoster={user}
              authUserId={user.id}
              lottery={shipLotteryDetails}
            />
          ) : null}
          {!loading && lotteryWinnerData ? (
            <>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.topStepsViewContainer}>
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
                  <Icon name="arrow-forward" />
                  <View style={styles.topStepsSectionBlockContainer}>
                    <FastImage
                      style={styles.topStepsSectionBlockContainerImage}
                      source={{
                        uri: shipLotteryDetails.images[0],
                        priority: FastImage.priority.high,
                        cache: FastImage.cacheControl.web,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  </View>
                  <Icon name="arrow-forward" />
                  <View style={styles.topStepsSectionBlockContainer}>
                    {lotteryWinnerData.image ? (
                      <FastImage
                        style={styles.topStepsSectionBlockContainerImage}
                        source={{
                          uri: lotteryWinnerData.image,
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
                </View>
                <View style={styles.scrollViewContainer}>
                  <Icon name="notifications-active" color="black" />
                  <Text style={styles.receiveLotteryAnnouncementText}>
                    {shipLotteryTexts[lang].announcement}
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
                    container: styles.markAsShippedButtonContainer,
                  }}
                  icon={'markunread-mailbox'}
                  text={shipLotteryTexts[lang].markAsShipped}
                  onPress={handleMarkAsShippedPress}
                />
              </View>
            </>
          ) : null}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

ShipLotteryInfoModal.propTypes = {
  onClose: PropTypes.func,
  shipLotteryDetails: PropTypes.object,
  lang: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    user: getUserSelector(state),
    shipLotteryDetails: getShipLotteryDetailsSelector(state),
    lotteryWinnerData: getLotteryWinnerDataSelector(state),
    lang: getLangSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleShowShipLotteryModal: payload =>
      dispatch(showShipLotteryModal(payload)),
    handleFetchLotteryWinnerData: payload =>
      dispatch(handleFetchLotteryWinnerUserData(payload)),
    handleMarkLotteryAsShipped: payload =>
      dispatch(handleMarkLotteryAsShipped(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShipLotteryInfoModal);
