import {connect} from 'react-redux';
import React, {useRef, useState} from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, ScrollView, View} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Button, Icon, Toolbar} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import {
  lotteryDetails as lotteryDetailsTexts,
  lotteryResult as lotteryResultTexts,
} from '../../constants/Texts';
import {
  getAdPosterDataSelector,
  getLotteryResultSelector,
  getWinnerUserDataSelector,
} from './Selectors';
import {showLotteryResult} from '../../redux/LotteryResult/actions';
import {getUserSelector} from '../Profile/Selectors';
import {handleFetchUsersData} from '../../redux/LotteryResult/FetchUsersData';
import {loadingPopup} from '../Loading';
import LotteryDetailsUserListItem from '../LotteryDetails/LotteryDetailsUserListItem';
import {Text} from 'react-native';
import formatDate from '../../lib/formatDate';
import cancellableFetch from 'react-native-cancelable-fetch';
import {showReceiveLotteryModal} from '../../redux/ReceiveLottery/actions';
import {showShipLotteryModal} from '../../redux/ShipLottery/actions';
import Confetti from 'react-native-confetti';
import {confettiColors} from '../../constants/Colors';
import {getLangSelector} from '../Settings/Selectors';

let ChatModal = null;
let ReceiveLotteryModal = null;
let ShipLotteryModal = null;

const LotteryResult = props => {
  const {
    lotteryResult,
    user: authUser,
    adPosterData,
    winnerUserData,
    item: lotteryDetails,
    lang,
  } = props;
  const {
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
  } = lotteryDetails || lotteryResult;

  const isWinner = authUser && authUser.id && winnerUserId === authUser.id;
  const isLotteryPoster = authUser && userId === authUser.id;
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(null);
  const [cancelHttpTag] = useState(11);
  let confettiRef = useRef();

  const handleCloseModal = () => {
    invoke(props, 'showLotteryResult', undefined);
    invoke(props, 'onClose', undefined);
    cancellableFetch.abort(cancelHttpTag);
  };
  const fetchUsersDataCallback = () => {
    setIsLoading(false);
  };
  const fetchUsersData = () => {
    setIsLoading(true);
    invoke(props, 'handleFetchUsersData', {
      winnerUserId,
      userId,
      users: [userId, winnerUserId],
      onError: fetchUsersDataCallback,
      onSuccess: fetchUsersDataCallback,
      currentCollectedPrice,
      cancelHttpTag: cancelHttpTag,
    });
  };
  const onShow = () => {
    fetchUsersData();
  };
  const handleActionPress = {
    [lotteryResultTexts[lang].actionOptions.receive]: () => {
      if (!ReceiveLotteryModal) {
        ReceiveLotteryModal = require('../ReceiveLottery/ReceiveLotteryInfoModal')
          .default;
      }
      invoke(
        props,
        'handleShowReceiveLotteryModal',
        lotteryDetails || lotteryResult,
      );
      setShowModal('receiveLotteryModal');
    },
    [lotteryResultTexts[lang].actionOptions.ship]: () => {
      if (!ShipLotteryModal) {
        ShipLotteryModal = require('../ShipLotteries/ShipLotteryInfoModal')
          .default;
      }
      invoke(
        props,
        'handleShowShipLotteryModal',
        lotteryDetails || lotteryResult,
      );
      setShowModal('shipLotteryModal');
    },
    [lotteryResultTexts[lang].actionOptions.chat]: () => {
      if (!ChatModal) {
        ChatModal = require('../Chat').default;
      }
      setShowModal('chatModal');
    },
  };
  const handleModalClose = () => {
    setShowModal(null);
  };
  const handleReceiveLotteryModalClose = () => {
    setShowModal(null);
    invoke(props, 'handleShowReceiveLotteryModal', undefined);
  };
  const handleShipLotteryModalClose = () => {
    setShowModal(null);
    invoke(props, 'handleShowShipLotteryModal', undefined);
  };
  const modals = {
    chatModal: (
      <ChatModal
        onClose={handleModalClose}
        isWinner={isWinner}
        lottery={lotteryDetails || lotteryResult}
        isLotteryPoster={isLotteryPoster}
        lotteryWinner={winnerUserData}
        lotteryPoster={adPosterData}
        authUserId={authUser.id}
      />
    ),
    receiveLotteryModal: (
      <ReceiveLotteryModal onClose={handleReceiveLotteryModalClose} />
    ),
    shipLotteryModal: (
      <ShipLotteryModal onClose={handleShipLotteryModalClose} />
    ),
  };
  const handleOnDismiss = () => {
    cancellableFetch.abort(cancelHttpTag);
    if (confettiRef && confettiRef.stopConfetti) {
      confettiRef.stopConfetti();
    }
  };
  const handleConfettiRef = node => {
    if (node && node.startConfetti) {
      confettiRef = node;
      confettiRef.startConfetti();
      setTimeout(() => {
        confettiRef.stopConfetti();
      }, 15000);
    }
  };

  return (
    <Modal
      animationType="slide"
      onShow={onShow}
      onRequestClose={handleCloseModal}
      onDismiss={handleOnDismiss}>
      {showModal && modals[showModal]}
      <SafeAreaView
        style={[sharedStyles.rootSafeAreaView, sharedStyles.container]}>
        <View style={sharedStyles.innerSafeAreaView}>
          <Toolbar
            style={{container: sharedStyles.toolbarContainer}}
            leftElement="arrow-back"
            centerElement={lotteryResultTexts[lang].lotteryResult}
            onLeftElementPress={handleCloseModal}
          />
          {isWinner ? (
            <View style={sharedStyles.confettiView}>
              <Confetti
                ref={handleConfettiRef}
                colors={confettiColors}
                confettiCount={500}
                duration={6000}
              />
            </View>
          ) : null}
          {isLoading ? loadingPopup : null}
          {!isLoading ? (
            <>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={sharedStyles.lotteryDetailsContainer}>
                  {!winnerUserId ? (
                    <View style={sharedStyles.lotteryResultNoWinnerContainer}>
                      <Icon name="notifications-active" color="black" />
                      <Text style={sharedStyles.lotteryResultNoWinnerText}>
                        {lotteryDetailsTexts[lang].winnerAccouncementSoon}
                      </Text>
                      <Text style={sharedStyles.lotteryResultNoWinnerText}>
                        {lotteryDetailsTexts[lang].inProgress}
                      </Text>
                    </View>
                  ) : null}
                  {(isWinner || isLotteryPoster) && winnerUserId ? (
                    <View style={sharedStyles.congratulationsContainer}>
                      <Text style={sharedStyles.congratulationsText}>
                        {lotteryResultTexts[lang].congratulations}
                      </Text>
                      <Text style={sharedStyles.congratulationsWinnerText}>
                        {isWinner
                          ? lotteryDetailsTexts[lang].youAreTheWinner
                          : lotteryDetailsTexts[lang].lotteryPosterWinner}
                      </Text>
                    </View>
                  ) : null}
                  <View style={sharedStyles.userDetailsIconTextContainer}>
                    <Icon color="rgba(0,0,0,.55)" name="person" />
                    <Text style={sharedStyles.userDetailsText}>
                      {lotteryDetailsTexts[lang].user}
                    </Text>
                  </View>
                  <View style={sharedStyles.aboutFirstSectionTextContainer}>
                    <LotteryDetailsUserListItem user={adPosterData} />
                  </View>
                  <View style={sharedStyles.userDetailsIconTextContainer}>
                    <Icon color="rgba(0,0,0,.55)" name="dns" />
                    <Text style={sharedStyles.userDetailsText}>
                      {lotteryDetailsTexts[lang].name}
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
                      {lotteryDetailsTexts[lang].description}
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
                      {lotteryDetailsTexts[lang].condition}
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
                      {lotteryDetailsTexts[lang].category}
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
                      {lotteryDetailsTexts[lang].totalPrice}
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
                      {lotteryDetailsTexts[lang].collectedPrice}
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
                      {lotteryDetailsTexts[lang].payToWin}
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
                      {lotteryDetailsTexts[lang].publishDate}
                    </Text>
                  </View>
                  <View style={sharedStyles.aboutFirstSectionTextContainer}>
                    <Text style={sharedStyles.aboutFirstSectionText}>
                      {formatDate(publishDate, lang)}
                    </Text>
                  </View>
                  <View style={sharedStyles.userDetailsIconTextContainer}>
                    <Icon color="rgba(0,0,0,.55)" name="pin-drop" />
                    <Text style={sharedStyles.userDetailsText}>
                      {lotteryDetailsTexts[lang].location}
                    </Text>
                  </View>
                  <View style={sharedStyles.aboutFirstSectionTextContainer}>
                    <Text style={sharedStyles.aboutFirstSectionText}>
                      {`${country}, ${prefecture}, ${city}`}
                    </Text>
                  </View>
                </View>
              </ScrollView>
              {(isLotteryPoster && winnerUserId) || isWinner ? (
                <View style={sharedStyles.lotteryDetailsBottomToolbar}>
                  {isLotteryPoster && winnerUserId
                    ? lotteryResultTexts[lang].lotteryPosterActions.map(
                        action => (
                          <Button
                            primary
                            raised
                            disabled={action.action === 'chat' && !winnerUserId}
                            style={{
                              container:
                                sharedStyles.bottomToolbarActionButtonContainer,
                            }}
                            icon={action.icon}
                            text={action.text}
                            onPress={handleActionPress[action.action]}
                          />
                        ),
                      )
                    : isWinner
                    ? lotteryResultTexts[lang].lotteryWinnerActions.map(
                        action => (
                          <Button
                            primary
                            raised
                            style={{
                              container:
                                sharedStyles.bottomToolbarActionButtonContainer,
                            }}
                            icon={action.icon}
                            text={action.text}
                            onPress={handleActionPress[action.action]}
                          />
                        ),
                      )
                    : null}
                </View>
              ) : null}
            </>
          ) : null}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

LotteryResult.propTypes = {
  lotteryResult: PropTypes.object,
  item: PropTypes.oneOfType([PropTypes.object, PropTypes.any]),
  onClose: PropTypes.func,
  lang: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    lotteryResult: getLotteryResultSelector(state),
    user: getUserSelector(state),
    adPosterData: getAdPosterDataSelector(state),
    winnerUserData: getWinnerUserDataSelector(state),
    lang: getLangSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showLotteryResult: payload => dispatch(showLotteryResult(payload)),
    handleFetchUsersData: payload => dispatch(handleFetchUsersData(payload)),
    handleShowReceiveLotteryModal: payload =>
      dispatch(showReceiveLotteryModal(payload)),
    handleShowShipLotteryModal: payload =>
      dispatch(showShipLotteryModal(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LotteryResult);
