import React, {useState, createRef, useEffect, useRef} from 'react';
import {
  Text,
  View,
  Modal,
  SafeAreaView,
  ScrollView,
  Share,
  VirtualizedList,
} from 'react-native';
import {connect} from 'react-redux';
import styles from './lotteryDetails.style';
import {Button, Icon, IconToggle} from 'react-native-material-ui';
import {Toolbar} from 'react-native-material-ui';
import invoke from 'lodash/invoke';
import PropTypes from 'prop-types';
import {SimpleLoader} from '../Loading';
import formatDate from '../../lib/formatDate';
import LotteryDetailsUserListItem from './LotteryDetailsUserListItem.js';
import {lotteryDetails as lotteryDetailsTexts} from '../../constants/Texts';
import {
  getLotteriesSelector,
  getUsersSelector,
  getAdPosterDataSelector,
  getWinnerUserDataSelector,
  getUserLotteriesSelector,
} from './Selectors';
import {handleFetchUserLotteries} from '../../redux/LotteryDetails/FetchUserLotteries';
import CardListItem from '../Home/CardListItem';
import {
  setUserLotteriesPageToken,
  showLotteryDetails,
} from '../../redux/LotteryDetails/actions';
import {CarouselComponent} from '../Carousel';
import {handleFetchUsersData} from '../../redux/LotteryDetails/FetchUsersData';
import {handleLikeLottery} from '../../redux/Lotteries/HandleLikeLottery';
import {handleDislikeLottery} from '../../redux/Lotteries/HandleDislikeLottery';
import {getLotteryDetailsSelector} from '../Pinger/Selectors';
import cancellableFetch from 'react-native-cancelable-fetch';
import {showReceiveLotteryModal} from '../../redux/ReceiveLottery/actions';
import {showShipLotteryModal} from '../../redux/ShipLottery/actions';
import {handleCancelLottery} from '../../redux/LotteryDetails/CancelLottery';
import {Alert} from 'react-native';
import Confetti from 'react-native-confetti';
import {confettiColors} from '../../constants/Colors';
import {getLangSelector} from '../Settings/Selectors';
import formatedNumberOfLikes from '../../lib/formatNumberOfLikes';

let ImagesViewer = null;
let Payment = null;
let LotteryResultModal = null;
let ChatModal = null;
let ReceiveLotteryModal = null;
let ShipLotteryModal = null;
let EditLotteryModal = null;

const LotteryDetails = React.memo(props => {
  const {
    item,
    user: authUser,
    adPosterData,
    winnerUserData,
    userLotteries,
    lotteryDetails,
    lang,
  } = props;
  const {
    name,
    description,
    shippingInformation,
    lotteryRules,
    category,
    currency,
    price,
    country,
    prefecture,
    city,
    publishDate,
    cancelDate,
    condition,
    userId,
    cancelled,
    id: lotteryId,
    available,
    lotteryUsersLength,
    winnerUserId,
    currentCollectedPrice,
    images,
    likedBy,
  } = lotteryDetails || item;
  const [usersDataLoading, setUsersDataLoading] = useState(true);
  const [didCongratulateUser, setDidCongratulateUser] = useState(false);
  const [userLotteriesLoading, setUserLotteriesLoading] = useState(true);
  const [cancelHttpTag] = useState(10);
  const [showModal, setShowModal] = useState(null);
  const [viewImageUri, setViewImageUri] = useState(images[0]);
  const isVisitor = authUser && authUser.id && `${userId}` !== `${authUser.id}`;
  const isLotteryPoster =
    authUser && authUser.id && `${userId}` === `${authUser.id}`;
  const isWinner =
    authUser && authUser.id && `${winnerUserId}` === `${authUser.id}`;
  const canEnterLottery =
    authUser &&
    `${userId}` !== `${authUser.id}` &&
    !cancelled &&
    available &&
    Number(currentCollectedPrice || 0) < Number(price);
  let confettiRef = useRef();

  const scrollViewRef = createRef();

  const fetchUsersDataCallback = () => {
    setUsersDataLoading(false);
  };
  const fetchUsersLotteriesCallback = () => {
    setUserLotteriesLoading(false);
  };
  const fetchUsersData = () => {
    const users = [
      userId,
      lotteryDetails.winnerUserId || item.winnerUserId || false,
    ].filter(Boolean);

    if (users.length) {
      invoke(props, 'handleFetchUsersData', {
        winnerUserId: lotteryDetails.winnerUserId || item.winnerUserId,
        userId,
        users,
        cancelTag: cancelHttpTag,
        onError: fetchUsersDataCallback,
        onSuccess: fetchUsersDataCallback,
        currentCollectedPrice:
          lotteryDetails.currentCollectedPrice || item.currentCollectedPrice,
        price,
      });
    }
  };
  const onShow = () => {
    fetchUsersData();
    invoke(props, 'handleFetchUserLotteries', {
      userId,
      cancelTag: cancelHttpTag,
      onError: fetchUsersLotteriesCallback,
      onSuccess: fetchUsersLotteriesCallback,
    });
  };

  const handleUserLotteryPress = userLottery => {
    return () => {
      scrollViewRef.current.scrollTo({x: 0, y: 0, animated: true});
      if (props.updateLotteryDetails) {
        invoke(props, 'updateLotteryDetails', userLottery);
      } else {
        invoke(props, 'showLotteryDetails', userLottery);
      }
    };
  };
  const handleCloseModal = () => {
    invoke(props, 'showLotteryDetails', null);
    invoke(props, 'onClose');
    cancellableFetch.abort(cancelHttpTag);
  };
  const handleEnterDraw = () => {
    if (!canEnterLottery) {
      return;
    }
    if (!Payment) {
      Payment = require('../Payment').default;
    }
    setShowModal('paymentModal');
  };
  const onPaymentClose = () => {
    setShowModal(null);
  };
  const empty = <Icon name="face" size={40} />;
  const getItem = (data, index) => data[index];
  const getUserLotteriesCount = () => userLotteries.length;
  const getVirtualKey = _item => _item.id;
  const renderUserAdItem = ({item: ad}) => (
    <CardListItem
      item={ad}
      smallImage={true}
      horizontal={true}
      onItemPress={handleUserLotteryPress(ad)}
    />
  );
  const handleShowImagesViewer = url => {
    if (!ImagesViewer) {
      ImagesViewer = require('../ImageViewer').default;
    }
    setViewImageUri(url);
    setShowModal('imagesViewerModal');
  };
  const onImagesViewerClose = () => {
    setShowModal(null);
  };
  const handleLotteryResultModalClose = () => {
    setShowModal(null);
  };
  const handleEditLotteryModalClose = () => {
    setShowModal(null);
  };
  const handleChatModalClose = () => {
    setShowModal(null);
  };
  const handleReceiveLotteryModalClose = () => {
    invoke(props, 'handleShowReceiveLotteryModal', undefined);
    setShowModal(null);
  };
  const handleShipLotteryModalClose = () => {
    invoke(props, 'handleShowShipLotteryModal', undefined);
    setShowModal(null);
  };
  const handleActionPress = {
    [lotteryDetailsTexts[lang].actionOptions.share]: async () => {
      try {
        const result = await Share.share({
          message: `Come check this lottery and have a chance to win ${name}`,
          // title: ''
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {}
    },
    [lotteryDetailsTexts[lang].actionOptions.chat]: () => {
      if (!ChatModal) {
        ChatModal = require('../Chat').default;
      }
      setShowModal('chatModal');
    },
    [lotteryDetailsTexts[lang].actionOptions.receive]: () => {
      if (!ReceiveLotteryModal) {
        ReceiveLotteryModal = require('../ReceiveLottery/ReceiveLotteryInfoModal')
          .default;
      }
      invoke(props, 'handleShowReceiveLotteryModal', lotteryDetails || item);
      setShowModal('receiveLotteryModal');
    },
    [lotteryDetailsTexts[lang].actionOptions.ship]: () => {
      if (!ShipLotteryModal) {
        ShipLotteryModal = require('../ShipLotteries/ShipLotteryInfoModal')
          .default;
      }
      invoke(props, 'handleShowShipLotteryModal', lotteryDetails || item);
      setShowModal('shipLotteryModal');
    },
    [lotteryDetailsTexts[lang].actionOptions.cancel]: () => {
      if (authUser && authUser.id) {
        Alert.alert(
          lotteryDetailsTexts[lang].cancelLottery,
          lotteryDetailsTexts[lang].areYouSureCancel,
          [
            {
              text: lotteryDetailsTexts[lang].cancelThisLottery,
              onPress: () => {
                invoke(props, 'handleCancelLottery', {
                  userId: authUser && authUser.id,
                  lotteryId,
                });
              },
              style: 'default',
            },
            {
              text: lotteryDetailsTexts[lang].close,
              style: 'cancel',
            },
          ],
        );
      }
    },
    [lotteryDetailsTexts[lang].actionOptions.readd]: () => {
      if (authUser && authUser.id) {
        Alert.alert(
          lotteryDetailsTexts[lang].reAddLottery,
          lotteryDetailsTexts[lang].areYouSureReAdd,
          [
            {
              text: lotteryDetailsTexts[lang].reAddThisLottery,
              onPress: () => {
                invoke(props, 'handleCancelLottery', {
                  userId: authUser && authUser.id,
                  lotteryId,
                  reAdd: true,
                });
              },
              style: 'default',
            },
            {
              text: lotteryDetailsTexts[lang].close,
              style: 'cancel',
            },
          ],
        );
      }
    },
    [lotteryDetailsTexts[lang].actionOptions.result]: () => {
      if (!LotteryResultModal) {
        LotteryResultModal = require('../LotteryResult').default;
      }
      setShowModal('lotteryResultModal');
    },
    [lotteryDetailsTexts[lang].actionOptions.like]: () => {
      if (authUser && authUser.id) {
        invoke(props, 'handleLikeLottery', {
          userId: authUser && authUser.id,
          cancelTag: cancelHttpTag,
          lotteryId: (lotteryDetails || item).id,
          showLotteryDetails: true,
        });
      }
    },
    [lotteryDetailsTexts[lang].actionOptions.dislike]: () => {
      if (authUser && authUser.id) {
        invoke(props, 'handleDislikeLottery', {
          userId: authUser && authUser.id,
          cancelTag: cancelHttpTag,
          lotteryId: (lotteryDetails || item).id,
          showLotteryDetails: true,
        });
      }
    },
    [lotteryDetailsTexts[lang].actionOptions.win]:
      canEnterLottery && handleEnterDraw,
  };
  const handleEditLottery = () => {
    if (!EditLotteryModal) {
      EditLotteryModal = require('../EditLottery').default;
    }
    setShowModal('editLotteryModal');
  };
  const modals = {
    editLotteryModal: (
      <EditLotteryModal item={item} onClose={handleEditLotteryModalClose} />
    ),
    lotteryResultModal: (
      <LotteryResultModal item={item} onClose={handleLotteryResultModalClose} />
    ),
    imagesViewerModal: (
      <ImagesViewer
        imageText={name}
        uri={viewImageUri}
        onClose={onImagesViewerClose}
      />
    ),
    chatModal:
      authUser && authUser.id ? (
        <ChatModal
          onClose={handleChatModalClose}
          isWinner={isWinner}
          lottery={lotteryDetails || item}
          isLotteryPoster={isLotteryPoster}
          lotteryPoster={adPosterData}
          lotteryWinner={winnerUserData}
          authUserId={authUser.id}
        />
      ) : null,
    receiveLotteryModal: (
      <ReceiveLotteryModal onClose={handleReceiveLotteryModalClose} />
    ),
    shipLotteryModal: (
      <ShipLotteryModal onClose={handleShipLotteryModalClose} />
    ),
    paymentModal: canEnterLottery && (
      <Payment onClose={onPaymentClose} item={lotteryDetails || item} />
    ),
  };
  const handleOnDismiss = () => {
    cancellableFetch.abort(cancelHttpTag);
    if (confettiRef && confettiRef.stopConfetti) {
      confettiRef.stopConfetti();
    }
  };
  const handleOnEndReached = () => {
    invoke(props, 'handleFetchUserLotteries', {
      userId,
      cancelTag: cancelHttpTag,
      onError: fetchUsersLotteriesCallback,
      onSuccess: fetchUsersLotteriesCallback,
    });
  };
  const handleConfettiRef = node => {
    if (node && node.startConfetti && !didCongratulateUser) {
      confettiRef = node;
      confettiRef.startConfetti();
      setDidCongratulateUser(true);
      setTimeout(() => {
        confettiRef.stopConfetti();
      }, 15000);
    }
  };

  useEffect(() => {
    onShow();
  }, [item, lotteryDetails]);

  return (
    <Modal
      animationType="slide"
      onRequestClose={handleCloseModal}
      onDismiss={handleOnDismiss}>
      {showModal && modals[showModal]}
      <SafeAreaView style={styles.rootSafeAreaView}>
        <View style={styles.innerSafeAreaView}>
          <Toolbar
            style={{container: styles.toolbarContainer}}
            leftElement="arrow-back"
            onLeftElementPress={handleCloseModal}
            centerElement={name}
            rightElement={
              <>
                {isLotteryPoster ? (
                  <IconToggle
                    name="edit"
                    onPress={handleEditLottery}
                    color="white"
                  />
                ) : null}
              </>
            }
          />
          {isWinner ? (
            <View style={styles.confettiViewContainer}>
              <Confetti
                bsize={2}
                colors={confettiColors}
                ref={handleConfettiRef}
                confettiCount={500}
                duration={6000}
              />
            </View>
          ) : null}
          <ScrollView ref={scrollViewRef}>
            <View style={styles.lotteryImagesViewContainer}>
              <CarouselComponent
                onItemPress={handleShowImagesViewer}
                items={images}
                imageOnly={true}
              />
            </View>
            <View style={styles.scrollViewContainer}>
              {canEnterLottery ? (
                <View style={styles.paymentButtonViewContainer}>
                  <Button
                    raised
                    primary
                    disabled={`${currentCollectedPrice}` === `${price}`}
                    icon="payment"
                    text={lotteryDetailsTexts[lang].enterDraw}
                    style={{
                      container:
                        `${currentCollectedPrice}` !== `${price}` &&
                        styles.paymentButtonContainer,
                    }}
                    onPress={handleEnterDraw}
                  />
                </View>
              ) : null}
              <View style={styles.iconTextViewContainer}>
                <Icon
                  color={available ? 'green' : 'red'}
                  name={available ? 'verified-user' : 'close'}
                />
                <Text style={styles.iconText}>
                  {lotteryDetailsTexts[lang].availability}
                </Text>
              </View>
              <View style={styles.sectionBlockContainer}>
                <Text style={styles.sectionBlockContainerText}>
                  {available
                    ? lotteryDetailsTexts[lang].lotteryAvailable
                    : lotteryDetailsTexts[lang].lotteryNotAvailable}
                </Text>
              </View>
              {cancelled ? (
                <>
                  <View style={styles.iconTextViewContainer}>
                    <Icon color="red" name="cancel" />
                    <Text style={styles.iconText}>
                      {lotteryDetailsTexts[lang].cancelled}
                    </Text>
                  </View>
                  <View style={styles.sectionBlockContainer}>
                    <Text style={styles.sectionBlockContainerText}>
                      {`${lotteryDetailsTexts[lang].cancelledOn}${formatDate(
                        cancelDate,
                        lang,
                      )}`}
                    </Text>
                  </View>
                </>
              ) : null}
              <View style={styles.iconTextViewContainer}>
                <Icon color="rgba(0,0,0,.55)" name="dns" />
                <Text style={styles.iconText}>
                  {lotteryDetailsTexts[lang].name}
                </Text>
              </View>
              <View style={styles.sectionBlockContainer}>
                <Text style={styles.sectionBlockContainerText}>{name}</Text>
              </View>
              <View style={styles.iconTextViewContainer}>
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
              <View style={styles.iconTextViewContainer}>
                <Icon color="rgba(0,0,0,.55)" name="gavel" />
                <Text style={styles.iconText}>
                  {lotteryDetailsTexts[lang].lotteryRules}
                </Text>
              </View>
              <View style={styles.sectionBlockContainer}>
                <Text style={styles.sectionBlockContainerText}>
                  {lotteryRules}
                </Text>
              </View>
              <View style={styles.iconTextViewContainer}>
                <Icon color="rgba(0,0,0,.55)" name="local-shipping" />
                <Text style={styles.iconText}>
                  {lotteryDetailsTexts[lang].shippingInformation}
                </Text>
              </View>
              <View style={styles.sectionBlockContainer}>
                <Text style={styles.sectionBlockContainerText}>
                  {shippingInformation}
                </Text>
              </View>
              <View style={styles.iconTextViewContainer}>
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
              <View style={styles.iconTextViewContainer}>
                <Icon color="rgba(0,0,0,.55)" name="class" />
                <Text style={styles.iconText}>
                  {lotteryDetailsTexts[lang].category}
                </Text>
              </View>
              <View style={styles.sectionBlockContainer}>
                <Text style={styles.sectionBlockContainerText}>{category}</Text>
              </View>
              {!cancelled ? (
                <>
                  <View style={styles.iconTextViewContainer}>
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
                  <View style={styles.iconTextViewContainer}>
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
                  <View style={styles.iconTextViewContainer}>
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
                  <View style={styles.iconTextViewContainer}>
                    <Icon color="rgba(0,0,0,.55)" name="group-add" />
                    <Text style={styles.iconText}>
                      {lotteryDetailsTexts[lang].currentLotteryUsers}
                    </Text>
                  </View>
                  <View style={styles.sectionBlockContainer}>
                    <Text style={styles.sectionBlockContainerText}>
                      {lotteryDetailsTexts[lang].currentLotteryUsersNumber(
                        lotteryUsersLength,
                      )}
                    </Text>
                  </View>
                  <View style={styles.iconTextViewContainer}>
                    <Icon color="green" name="star" />
                    <Text style={styles.iconText}>
                      {lotteryDetailsTexts[lang].winner}
                    </Text>
                  </View>
                  <View style={styles.sectionBlockContainer}>
                    {usersDataLoading && SimpleLoader}
                    {!usersDataLoading &&
                    winnerUserData &&
                    (lotteryDetails.winnerUserId || item.winnerUserId) ? (
                      <LotteryDetailsUserListItem user={winnerUserData} />
                    ) : null}
                    {!usersDataLoading && (!winnerUserData || !winnerUserId) ? (
                      <Text style={styles.sectionBlockContainerText}>
                        {lotteryDetailsTexts[lang].inProgress}
                      </Text>
                    ) : null}
                  </View>
                </>
              ) : null}
              <View style={styles.iconTextViewContainer}>
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
              <View style={styles.iconTextViewContainer}>
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
              <View style={styles.iconTextViewContainer}>
                <Icon color="rgba(0,0,0,.55)" name="person" />
                <Text style={styles.iconText}>
                  {lotteryDetailsTexts[lang].user}
                </Text>
              </View>
              <View style={styles.sectionBlockContainer}>
                {usersDataLoading && SimpleLoader}
                {!usersDataLoading && adPosterData && (
                  <LotteryDetailsUserListItem user={adPosterData} />
                )}
                {!usersDataLoading && !adPosterData && empty}
              </View>
              <View style={styles.iconTextViewContainer}>
                <Icon color="rgba(0,0,0,.55)" name="collections" />
                <Text style={styles.iconText}>
                  {lotteryDetailsTexts[lang].userLotteries}
                </Text>
              </View>
              <View style={styles.sectionBlockContainerNoFlex}>
                {userLotteriesLoading && SimpleLoader}
                {!userLotteriesLoading && userLotteries && (
                  <VirtualizedList
                    initialNumToRender={10}
                    windowSize={100}
                    maxToRenderPerBatch={10}
                    contentInsetAdjustmentBehavior={'automatic'}
                    removeClippedSubviews={true}
                    horizontal={true}
                    showsHorizontalScrollIndicator={true}
                    data={userLotteries}
                    onEndReachedThreshold={0.1}
                    onEndReached={handleOnEndReached}
                    getItem={getItem}
                    getItemCount={getUserLotteriesCount}
                    keyExtractor={getVirtualKey}
                    renderItem={renderUserAdItem}
                    contentContainerStyle={
                      styles.virtualizedListContentContainer
                    }
                  />
                )}
                {!userLotteriesLoading && !userLotteries && (
                  <Text style={styles.iconText}>
                    {lotteryDetailsTexts[lang].emptyUserLotteries}
                  </Text>
                )}
              </View>
            </View>
          </ScrollView>
          {authUser && authUser.id ? (
            <View style={styles.bottomToolbarViewContainer}>
              {isLotteryPoster ? (
                <>
                  {lotteryDetailsTexts[lang].lotteryPosterActions.map(
                    userAction => (
                      <Button
                        primary
                        raised
                        style={{
                          container: styles.bottomToolbarActionButtonContainer,
                        }}
                        icon={userAction.icon}
                        text={''}
                        onPress={handleActionPress[userAction.action]}
                      />
                    ),
                  )}
                  {winnerUserId
                    ? lotteryDetailsTexts[lang].shipActions.map(shipAction => (
                        <Button
                          primary
                          raised
                          style={{
                            container:
                              styles.bottomToolbarActionButtonContainer,
                          }}
                          icon={shipAction.icon}
                          text={''}
                          onPress={handleActionPress[shipAction.action]}
                        />
                      ))
                    : null}
                  {!cancelled
                    ? lotteryDetailsTexts[lang].cancelActions.map(
                        cancelAction => (
                          <Button
                            primary
                            raised
                            style={{
                              container:
                                styles.bottomToolbarActionButtonContainer,
                            }}
                            icon={cancelAction.icon}
                            text={''}
                            onPress={handleActionPress[cancelAction.action]}
                          />
                        ),
                      )
                    : null}
                  {cancelled
                    ? lotteryDetailsTexts[lang].reAddActions.map(
                        reAddAction => (
                          <Button
                            primary
                            raised
                            style={{
                              container:
                                styles.bottomToolbarActionButtonContainer,
                            }}
                            icon={reAddAction.icon}
                            text={''}
                            onPress={handleActionPress[reAddAction.action]}
                          />
                        ),
                      )
                    : null}
                </>
              ) : isWinner && !cancelled && available ? (
                lotteryDetailsTexts[lang].lotteryWinnerActions.map(
                  winnerAction => (
                    <Button
                      primary
                      raised
                      style={{
                        container: styles.bottomToolbarActionButtonContainer,
                      }}
                      icon={winnerAction.icon}
                      text={''}
                      onPress={handleActionPress[winnerAction.action]}
                    />
                  ),
                )
              ) : isVisitor && !cancelled && available ? (
                lotteryDetailsTexts[lang].visitorActions.map(visitorAction => (
                  <Button
                    primary
                    raised
                    style={{
                      container: styles.bottomToolbarActionButtonContainer,
                    }}
                    disabled={
                      visitorAction.action ===
                        lotteryDetailsTexts[lang].actionOptions.win &&
                      `${currentCollectedPrice}` === `${price}`
                    }
                    icon={visitorAction.icon}
                    text={''}
                    onPress={handleActionPress[visitorAction.action]}
                  />
                ))
              ) : null}
              {isVisitor &&
              Array.isArray(likedBy) &&
              likedBy.length &&
              likedBy.find(val => `${val}` === `${authUser.id}`) ? (
                <Button
                  primary
                  raised
                  style={{
                    container: styles.bottomToolbarActionButtonContainer,
                    text: styles.likedByNumberButtonText,
                  }}
                  icon={
                    <Icon
                      name={lotteryDetailsTexts[lang].dislike.icon}
                      color="#e34977"
                      style={styles.likedByNumberIcon}
                      size={25}
                    />
                  }
                  text={
                    likedBy.length ? formatedNumberOfLikes(likedBy.length) : ''
                  }
                  onPress={
                    handleActionPress[lotteryDetailsTexts[lang].dislike.action]
                  }
                />
              ) : null}
              {isVisitor &&
              (!Array.isArray(likedBy) ||
                !likedBy.length ||
                !likedBy.find(val => `${val}` === `${authUser.id}`)) ? (
                <Button
                  primary
                  raised
                  style={{
                    container: styles.bottomToolbarActionButtonContainer,
                    text: styles.likedByNumberButtonText,
                  }}
                  icon={lotteryDetailsTexts[lang].like.icon}
                  text={
                    Array.isArray(likedBy) && likedBy.length
                      ? formatedNumberOfLikes(likedBy.length)
                      : ''
                  }
                  onPress={
                    handleActionPress[lotteryDetailsTexts[lang].like.action]
                  }
                />
              ) : null}
            </View>
          ) : null}
        </View>
      </SafeAreaView>
    </Modal>
  );
});

LotteryDetails.propTypes = {
  item: PropTypes.object,
  onClose: PropTypes.func,
  updateLotteryDetails: PropTypes.func,
  handleLikeLottery: PropTypes.func,
  handleDislikeLottery: PropTypes.func,
  lotteries: PropTypes.oneOfType([PropTypes.array, PropTypes.any]),
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.any]),
  adPosterData: PropTypes.oneOfType([PropTypes.object, PropTypes.any]),
  winnerUserData: PropTypes.oneOfType([PropTypes.object, PropTypes.any]),
  userLotteries: PropTypes.oneOfType([PropTypes.array, PropTypes.any]),
  lotteryDetails: PropTypes.oneOfType([PropTypes.object, PropTypes.any]),
  lang: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    lotteries: getLotteriesSelector(state),
    user: getUsersSelector(state),
    adPosterData: getAdPosterDataSelector(state),
    winnerUserData: getWinnerUserDataSelector(state),
    userLotteries: getUserLotteriesSelector(state),
    lotteryDetails: getLotteryDetailsSelector(state),
    lang: getLangSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleFetchUsersData: payload => dispatch(handleFetchUsersData(payload)),
    handleFetchUserLotteries: payload =>
      dispatch(handleFetchUserLotteries(payload)),
    showLotteryDetails: payload => dispatch(showLotteryDetails(payload)),
    handleLikeLottery: payload => dispatch(handleLikeLottery(payload)),
    handleDislikeLottery: payload => dispatch(handleDislikeLottery(payload)),
    handleShowReceiveLotteryModal: payload =>
      dispatch(showReceiveLotteryModal(payload)),
    handleShowShipLotteryModal: payload =>
      dispatch(showShipLotteryModal(payload)),
    handleCancelLottery: payload => dispatch(handleCancelLottery(payload)),
    handleSetUserLotteriesPageToken: payload =>
      dispatch(setUserLotteriesPageToken(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LotteryDetails);
