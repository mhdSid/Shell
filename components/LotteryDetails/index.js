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
import sharedStyles from '../../assets/styles/sharedStyles';
import {Button, Icon, IconToggle} from 'react-native-material-ui';
import {Toolbar} from 'react-native-material-ui';
import invoke from 'lodash/invoke';
import PropTypes from 'prop-types';
import {SimpleLoader} from '../Loading';
import formatDate from '../../lib/formatDate';
import LotteryDetailsUserListItem from './LotteryDetailsUserListItem.js';
import {lotteryDetails as lotteryDetailsTexts} from '../../Constants/Texts';
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
import {confettiColors} from '../../Constants/Colors';

let ImagesViewer = null;
let Payment = null;
let LotteryResultModal = null;
let ChatModal = null;
let ReceiveLotteryModal = null;
let ShipLotteryModal = null;
let EditLotteryModal = null;

const LotteryDetails = props => {
  const {
    item,
    user: authUser,
    adPosterData,
    winnerUserData,
    userLotteries,
    // lotteryUsersData,
    lotteryDetails,
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
    disableHeaderActions,
  } = lotteryDetails || item;
  const [usersDataLoading, setUsersDataLoading] = useState(true);
  const [userLotteriesLoading, setUserLotteriesLoading] = useState(true);
  const [cancelHttpTag] = useState(10);
  const [showModal, setShowModal] = useState(null);
  const [viewImageUri, setViewImageUri] = useState(images[0]);
  const isVisitor = authUser && authUser.id && userId !== authUser.id;
  const isLotteryPoster = authUser && authUser.id && userId === authUser.id;
  const isWinner = authUser && authUser.id && winnerUserId === authUser.id;
  let confettiRef = useRef();

  const scrollViewRef = createRef();

  const fetchUsersDataCallback = () => {
    setUsersDataLoading(false);
  };
  const fetchUsersLotteriesCallback = () => {
    setUserLotteriesLoading(false);
  };
  const fetchUsersData = () => {
    const users = [userId, winnerUserId || false].filter(Boolean);

    if (users.length) {
      invoke(props, 'handleFetchUsersData', {
        winnerUserId,
        userId,
        users,
        cancelTag: cancelHttpTag,
        onError: fetchUsersDataCallback,
        onSuccess: fetchUsersDataCallback,
        currentCollectedPrice,
      });
    }
  };
  const onShow = () => {
    console.log('showing lottery details');
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
  // const getLotteryUsersCount = () => lotteryUsersData.length;
  const getVirtualKey = _item => _item.id;
  const renderUserAdItem = ({item: ad}) => (
    <CardListItem
      item={ad}
      smallImage={true}
      horizontal={true}
      onItemPress={handleUserLotteryPress(ad)}
    />
  );
  // const renderLotteryUserItem = ({item: _user}) => (
  //   <LotteryDetailsUserListItem user={_user} withNotificationNum={true} />
  // );
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
    [lotteryDetailsTexts.actionOptions.share]: async () => {
      // Alert.alert(
      //   lotteryDetailsTexts.shareLottery,
      //   lotteryDetailsTexts.areYouSureShare,
      //   [
      //     {
      //       text: lotteryDetailsTexts.areYouSureShare,
      //       onPress: async () => {
      //         // invoke(props, 'handleShareLottery', {
      //         //   userId: authUser.id,
      //         //   lotteryId,
      //         // });
      //       },
      //       style: 'default',
      //     },
      //     {
      //       text: lotteryDetailsTexts.close,
      //       style: 'cancel',
      //     },
      //   ],
      // );
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
    [lotteryDetailsTexts.actionOptions.chat]: () => {
      if (!ChatModal) {
        ChatModal = require('../Chat').default;
      }
      setShowModal('chatModal');
    },
    [lotteryDetailsTexts.actionOptions.receive]: () => {
      if (!ReceiveLotteryModal) {
        ReceiveLotteryModal = require('../ReceiveLottery/ReceiveLotteryInfoModal')
          .default;
      }
      invoke(props, 'handleShowReceiveLotteryModal', lotteryDetails || item);
      setShowModal('receiveLotteryModal');
    },
    [lotteryDetailsTexts.actionOptions.ship]: () => {
      if (!ShipLotteryModal) {
        ShipLotteryModal = require('../ShipLotteries/ShipLotteryInfoModal')
          .default;
      }
      invoke(props, 'handleShowShipLotteryModal', lotteryDetails || item);
      setShowModal('shipLotteryModal');
    },
    [lotteryDetailsTexts.actionOptions.cancel]: () => {
      Alert.alert(
        lotteryDetailsTexts.cancelLottery,
        lotteryDetailsTexts.areYouSureCancel,
        [
          {
            text: lotteryDetailsTexts.cancelThisLottery,
            onPress: () => {
              invoke(props, 'handleCancelLottery', {
                userId: authUser.id,
                lotteryId,
              });
            },
            style: 'default',
          },
          {
            text: lotteryDetailsTexts.close,
            style: 'cancel',
          },
        ],
      );
    },
    [lotteryDetailsTexts.actionOptions.readd]: () => {
      Alert.alert(
        lotteryDetailsTexts.reAddLottery,
        lotteryDetailsTexts.areYouSureReAdd,
        [
          {
            text: lotteryDetailsTexts.reAddThisLottery,
            onPress: () => {
              invoke(props, 'handleCancelLottery', {
                userId: authUser.id,
                lotteryId,
                reAdd: true,
              });
            },
            style: 'default',
          },
          {
            text: lotteryDetailsTexts.close,
            style: 'cancel',
          },
        ],
      );
    },
    [lotteryDetailsTexts.actionOptions.result]: () => {
      if (!LotteryResultModal) {
        LotteryResultModal = require('../LotteryResult').default;
      }
      setShowModal('lotteryResultModal');
    },
    [lotteryDetailsTexts.actionOptions.like]: () => {
      invoke(props, 'handleLikeLottery', {
        userId: authUser && authUser.id,
        cancelTag: cancelHttpTag,
        lotteryId: (lotteryDetails || item).id,
        showLotteryDetails: true,
      });
    },
    [lotteryDetailsTexts.actionOptions.dislike]: () => {
      invoke(props, 'handleDislikeLottery', {
        userId: authUser && authUser.id,
        cancelTag: cancelHttpTag,
        lotteryId: (lotteryDetails || item).id,
        showLotteryDetails: true,
      });
    },
    [lotteryDetailsTexts.actionOptions.win]: handleEnterDraw,
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
    chatModal: (
      <ChatModal
        onClose={handleChatModalClose}
        isWinner={isWinner}
        lottery={lotteryDetails || item}
        isLotteryPoster={isLotteryPoster}
        lotteryPoster={adPosterData}
        lotteryWinner={winnerUserData}
        authUserId={authUser.id}
      />
    ),
    receiveLotteryModal: (
      <ReceiveLotteryModal onClose={handleReceiveLotteryModalClose} />
    ),
    shipLotteryModal: (
      <ShipLotteryModal onClose={handleShipLotteryModalClose} />
    ),
    paymentModal: (
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
    if (node && node.startConfetti) {
      confettiRef = node;
      confettiRef.startConfetti();
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

      <SafeAreaView
        style={[sharedStyles.container, sharedStyles.rootSafeAreaView]}>
        <View style={sharedStyles.innerSafeAreaView}>
          <Toolbar
            style={{container: sharedStyles.lotteryDetailsToolbarContainer}}
            leftElement="arrow-back"
            onLeftElementPress={handleCloseModal}
            centerElement={name}
            rightElement={
              <>
                {isLotteryPoster && !disableHeaderActions ? (
                  <IconToggle
                    name="edit"
                    onPress={handleEditLottery}
                    color="white"
                  />
                ) : null}
                {authUser &&
                `${userId}` !== `${authUser.id}` &&
                !disableHeaderActions ? (
                  <Button
                    disabled={`${currentCollectedPrice}` === `${price}`}
                    onPress={handleEnterDraw}
                    raised
                    style={{
                      container: sharedStyles.mainButtonContainer,
                      text: {color: '#b69cf6'},
                    }}
                    text={lotteryDetailsTexts.enterDraw}
                    icon="shop"
                  />
                ) : null}
              </>
            }
          />
          {isWinner ? (
            <View style={sharedStyles.confettiView}>
              <Confetti
                bsize={2}
                colors={confettiColors}
                ref={handleConfettiRef}
                confettiCount={500}
                duration={6000}
              />
            </View>
          ) : null}
          <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
            <View style={sharedStyles.flexRow}>
              <CarouselComponent
                onItemPress={handleShowImagesViewer}
                items={images}
                imageOnly={true}
              />
            </View>
            <View style={sharedStyles.lotteryDetailsContainer}>
              <View style={sharedStyles.userDetailsIconTextContainer}>
                <Icon
                  color={available ? 'green' : 'red'}
                  name={available ? 'verified-user' : 'close'}
                />
                <Text style={sharedStyles.userDetailsText}>
                  {lotteryDetailsTexts.availability}
                </Text>
              </View>
              <View style={sharedStyles.aboutFirstSectionTextContainer}>
                <Text style={sharedStyles.aboutFirstSectionText}>
                  {available
                    ? lotteryDetailsTexts.lotteryAvailable
                    : lotteryDetailsTexts.lotteryNotAvailable}
                </Text>
              </View>
              {cancelled ? (
                <>
                  <View style={sharedStyles.userDetailsIconTextContainer}>
                    <Icon color="red" name="cancel" />
                    <Text style={sharedStyles.userDetailsText}>
                      {lotteryDetailsTexts.cancelled}
                    </Text>
                  </View>
                  <View style={sharedStyles.aboutFirstSectionTextContainer}>
                    <Text style={sharedStyles.aboutFirstSectionText}>
                      {`${lotteryDetailsTexts.cancelledOn}${formatDate(
                        cancelDate,
                      )}`}
                    </Text>
                  </View>
                </>
              ) : null}
              <View style={sharedStyles.userDetailsIconTextContainer}>
                <Icon color="rgba(0,0,0,.55)" name="dns" />
                <Text style={sharedStyles.userDetailsText}>
                  {lotteryDetailsTexts.name}
                </Text>
              </View>
              <View style={sharedStyles.aboutFirstSectionTextContainer}>
                <Text style={sharedStyles.aboutFirstSectionText}>{name}</Text>
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
              {!cancelled ? (
                <>
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
                    <Icon color="rgba(0,0,0,.55)" name="group-add" />
                    <Text style={sharedStyles.userDetailsText}>
                      {lotteryDetailsTexts.currentLotteryUsers}
                    </Text>
                  </View>
                  <View style={sharedStyles.aboutFirstSectionTextContainer}>
                    <Text style={sharedStyles.aboutFirstSectionText}>
                      {lotteryDetailsTexts.currentLotteryUsersNumber(
                        lotteryUsersLength,
                      )}
                    </Text>
                  </View>
                  <View style={sharedStyles.userDetailsIconTextContainer}>
                    <Icon color="green" name="star" />
                    <Text style={sharedStyles.userDetailsText}>
                      {lotteryDetailsTexts.winner}
                    </Text>
                  </View>
                  <View style={sharedStyles.aboutFirstSectionTextContainer}>
                    {usersDataLoading && SimpleLoader}
                    {!usersDataLoading && winnerUserData && winnerUserId ? (
                      <LotteryDetailsUserListItem user={winnerUserData} />
                    ) : null}
                    {!usersDataLoading && (!winnerUserData || !winnerUserId) ? (
                      <Text style={sharedStyles.aboutFirstSectionText}>
                        {lotteryDetailsTexts.inProgress}
                      </Text>
                    ) : null}
                  </View>
                </>
              ) : null}
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
              <View style={sharedStyles.userDetailsIconTextContainer}>
                <Icon color="rgba(0,0,0,.55)" name="person" />
                <Text style={sharedStyles.userDetailsText}>
                  {lotteryDetailsTexts.user}
                </Text>
              </View>
              <View style={sharedStyles.aboutFirstSectionTextContainer}>
                {usersDataLoading && SimpleLoader}
                {!usersDataLoading && adPosterData && (
                  <LotteryDetailsUserListItem user={adPosterData} />
                )}
                {!usersDataLoading && !adPosterData && empty}
              </View>
              <View style={sharedStyles.userDetailsIconTextContainer}>
                <Icon color="rgba(0,0,0,.55)" name="collections" />
                <Text style={sharedStyles.userDetailsText}>
                  {lotteryDetailsTexts.userLotteries}
                </Text>
              </View>
              <View style={sharedStyles.aboutFirstSectionTextContainerNoFlex}>
                {userLotteriesLoading && SimpleLoader}
                {!userLotteriesLoading && userLotteries && (
                  <VirtualizedList
                    initialNumToRender={5}
                    windowSize={1}
                    maxToRenderPerBatch={5}
                    updateCellsBatchingPeriod={0.0}
                    removeClippedSubviews={true}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={userLotteries}
                    onEndReachedThreshold={0.1}
                    onEndReached={handleOnEndReached}
                    getItem={getItem}
                    getItemCount={getUserLotteriesCount}
                    keyExtractor={getVirtualKey}
                    renderItem={renderUserAdItem}
                  />
                )}
                {!userLotteriesLoading && !userLotteries && (
                  <Text style={sharedStyles.userDetailsText}>
                    {lotteryDetailsTexts.emptyUserLotteries}
                  </Text>
                )}
              </View>
            </View>
          </ScrollView>
          {authUser && authUser.id ? (
            <View style={sharedStyles.lotteryDetailsBottomToolbar}>
              {isLotteryPoster ? (
                <>
                  {lotteryDetailsTexts.lotteryPosterActions.map(userAction => (
                    <Button
                      primary
                      raised
                      style={{
                        container:
                          sharedStyles.bottomToolbarActionButtonContainer,
                      }}
                      icon={userAction.icon}
                      text={''}
                      onPress={handleActionPress[userAction.action]}
                    />
                  ))}
                  {winnerUserId
                    ? lotteryDetailsTexts.shipActions.map(shipAction => (
                        <Button
                          primary
                          raised
                          style={{
                            container:
                              sharedStyles.bottomToolbarActionButtonContainer,
                          }}
                          icon={shipAction.icon}
                          text={''}
                          onPress={handleActionPress[shipAction.action]}
                        />
                      ))
                    : null}
                  {!cancelled
                    ? lotteryDetailsTexts.cancelActions.map(cancelAction => (
                        <Button
                          primary
                          raised
                          style={{
                            container:
                              sharedStyles.bottomToolbarActionButtonContainer,
                          }}
                          icon={cancelAction.icon}
                          text={''}
                          onPress={handleActionPress[cancelAction.action]}
                        />
                      ))
                    : null}
                  {cancelled
                    ? lotteryDetailsTexts.reAddActions.map(reAddAction => (
                        <Button
                          primary
                          raised
                          style={{
                            container:
                              sharedStyles.bottomToolbarActionButtonContainer,
                          }}
                          icon={reAddAction.icon}
                          text={''}
                          onPress={handleActionPress[reAddAction.action]}
                        />
                      ))
                    : null}
                </>
              ) : isWinner && !cancelled && available ? (
                lotteryDetailsTexts.lotteryWinnerActions.map(winnerAction => (
                  <Button
                    primary
                    raised
                    style={{
                      container:
                        sharedStyles.bottomToolbarActionButtonContainer,
                    }}
                    icon={winnerAction.icon}
                    text={''}
                    onPress={handleActionPress[winnerAction.action]}
                  />
                ))
              ) : isVisitor && !cancelled && available ? (
                lotteryDetailsTexts.visitorActions.map(visitorAction => (
                  <Button
                    primary
                    raised
                    style={{
                      container:
                        sharedStyles.bottomToolbarActionButtonContainer,
                    }}
                    disabled={
                      visitorAction.action ===
                        lotteryDetailsTexts.actionOptions.win &&
                      `${currentCollectedPrice}` === `${price}`
                    }
                    icon={visitorAction.icon}
                    text={''}
                    onPress={handleActionPress[visitorAction.action]}
                  />
                ))
              ) : null}
              {isVisitor &&
              !cancelled &&
              available &&
              Array.isArray(likedBy) &&
              likedBy.length &&
              likedBy.includes(authUser.id) ? (
                <Button
                  primary
                  raised
                  style={{
                    container: sharedStyles.bottomToolbarActionButtonContainer,
                  }}
                  icon={
                    <Icon
                      name={lotteryDetailsTexts.dislike.icon}
                      color="#e34977"
                      style={{marginRight: 7}}
                      size={25}
                    />
                  }
                  text={''}
                  onPress={
                    handleActionPress[lotteryDetailsTexts.dislike.action]
                  }
                />
              ) : null}
              {isVisitor &&
              (!Array.isArray(likedBy) ||
                !likedBy.length ||
                !likedBy.includes(authUser.id)) ? (
                <Button
                  primary
                  raised
                  style={{
                    container: sharedStyles.bottomToolbarActionButtonContainer,
                  }}
                  icon={lotteryDetailsTexts.like.icon}
                  text={''}
                  onPress={handleActionPress[lotteryDetailsTexts.like.action]}
                />
              ) : null}
            </View>
          ) : null}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

LotteryDetails.propTypes = {
  item: PropTypes.object,
  onClose: PropTypes.func,
  updateLotteryDetails: PropTypes.func,
  disableHeaderActions: PropTypes.bool,
  handleLikeLottery: PropTypes.func,
  handleDislikeLottery: PropTypes.func,
  lotteries: PropTypes.oneOfType([PropTypes.array, PropTypes.any]),
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.any]),
  adPosterData: PropTypes.oneOfType([PropTypes.object, PropTypes.any]),
  // lotteryUsersData: PropTypes.oneOfType([PropTypes.array, PropTypes.any]),
  winnerUserData: PropTypes.oneOfType([PropTypes.object, PropTypes.any]),
  userLotteries: PropTypes.oneOfType([PropTypes.array, PropTypes.any]),
  lotteryDetails: PropTypes.oneOfType([PropTypes.object, PropTypes.any]),
};

const mapStateToProps = state => {
  return {
    lotteries: getLotteriesSelector(state),
    user: getUsersSelector(state),
    adPosterData: getAdPosterDataSelector(state),
    // lotteryUsersData: getLotteryUsersDataSelector(state),
    winnerUserData: getWinnerUserDataSelector(state),
    userLotteries: getUserLotteriesSelector(state),
    lotteryDetails: getLotteryDetailsSelector(state),
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
