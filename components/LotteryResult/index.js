import {connect} from 'react-redux';
import React, {useState} from 'react';
import invoke from 'lodash/invoke';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  View,
  VirtualizedList,
} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Button, Icon, Toolbar} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import {
  lotteryDetails as lotteryDetailsTexts,
  lotteryResult as lotteryResultTexts,
} from '../../Constants/Texts';
import {
  getAdPosterDataSelector,
  getLotteryResultSelector,
  getLotteryUsersDataSelector,
  getWinnerUserDataSelector,
} from './Selectors';
import {showLotteryResult} from '../../redux/LotteryResult/actions';
import {getUserSelector} from '../Profile/Selectors';
import {handleFetchUsersData} from '../../redux/LotteryResult/FetchUsersData';
import {loadingPopup} from '../Loading';
import LotteryDetailsUserListItem from '../LotteryDetails/LotteryDetailsUserListItem';
import {Text} from 'react-native';
import formatDate from '../../lib/formatDate';

let ChatModal = null;
let ReceiveLotteryModal = null;

const LotteryResult = props => {
  const {
    lotteryResult,
    user: authUser,
    lotteryUsersData,
    adPosterData,
    winnerUserData,
    item: lotteryDetails,
  } = props;
  const {
    name,
    description,
    category,
    currency,
    price,
    country,
    prefecture,
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
  } = lotteryDetails || lotteryResult;

  const isWinner = authUser && authUser.id && winnerUserId === authUser.id;
  const isLotteryPoster = authUser && userId === authUser.id;
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(null);

  const handleCloseModal = () => {
    invoke(props, 'showLotteryResult', undefined);
    invoke(props, 'onClose', undefined);
  };
  const fetchUsersDataCallback = () => {
    setIsLoading(false);
  };
  const fetchUsersData = () => {
    setIsLoading(true);
    invoke(props, 'handleFetchUsersData', {
      winnerUserId,
      userId,
      users: [userId, ...lotteryUserIds, winnerUserId],
      lotteryUserIds,
      onError: fetchUsersDataCallback,
      onSuccess: fetchUsersDataCallback,
      currentCollectedPrice,
    });
  };
  const onShow = () => {
    fetchUsersData();
  };
  const getItem = (data, index) => data[index];
  const getItemCount = () => lotteryUsersData.length;
  const getVirtualKey = item => item.id;
  const renderLotteryUserItem = ({item: user}) => (
    <LotteryDetailsUserListItem
      user={user}
      winnerUserId={winnerUserId}
      withNotificationNum={true}
      largeImage={true}
    />
  );
  const handleActionPress = {
    [lotteryResultTexts.actionOptions.receive]: () => {
      if (!ReceiveLotteryModal) {
        ReceiveLotteryModal = require('../ReceiveLottery').default;
      }
      setShowModal('receiveLotteryModal');
    },
    [lotteryResultTexts.actionOptions.chat]: () => {
      if (!ChatModal) {
        ChatModal = require('../Chat').default;
      }
      setShowModal('chatModal');
    },
  };
  const handleModalClose = () => {
    setShowModal(null);
  };
  const modals = {
    chatModal: <ChatModal onClose={handleModalClose} />,
    receiveLotteryModal: <ReceiveLotteryModal onClose={handleModalClose} />,
  };

  return (
    <Modal
      animationType="slide"
      onShow={onShow}
      onRequestClose={handleCloseModal}>
      {showModal && modals[showModal]}
      <SafeAreaView
        style={[sharedStyles.rootSafeAreaView, sharedStyles.container]}>
        <View style={sharedStyles.innerSafeAreaView}>
          <Toolbar
            style={{container: sharedStyles.toolbarContainer}}
            leftElement="arrow-back"
            centerElement={lotteryResultTexts.lotteryResult}
            onLeftElementPress={handleCloseModal}
          />
          {isLoading ? loadingPopup : null}
          {!isLoading ? (
            <>
              {lotteryUsersData && lotteryUsersData.length ? (
                <View style={sharedStyles.lotteryResultVirtualizedListTop}>
                  <VirtualizedList
                    initialNumToRender={5}
                    windowSize={1}
                    maxToRenderPerBatch={4}
                    updateCellsBatchingPeriod={0.0}
                    removeClippedSubviews={true}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={lotteryUsersData}
                    getItem={getItem}
                    getItemCount={getItemCount}
                    keyExtractor={getVirtualKey}
                    renderItem={renderLotteryUserItem}
                  />
                </View>
              ) : null}
              <ScrollView showsVerticalScrollIndicator={false}>
                <View
                  style={[
                    sharedStyles.lotteryDetailsContainer,
                    lotteryUsersData &&
                      lotteryUsersData.length &&
                      sharedStyles.lotteryResultDetailsContainer,
                  ]}>
                  {!winnerUserId ? (
                    <View style={sharedStyles.lotteryResultNoWinnerContainer}>
                      <Icon name="notifications-active" color="black" />
                      <Text style={sharedStyles.lotteryResultNoWinnerText}>
                        {lotteryDetailsTexts.winnerAccouncementSoon}
                      </Text>
                      <Text style={sharedStyles.lotteryResultNoWinnerText}>
                        {lotteryDetailsTexts.inProgress}
                      </Text>
                    </View>
                  ) : null}
                  {(isWinner || isLotteryPoster) && winnerUserId ? (
                    <View style={sharedStyles.congratulationsContainer}>
                      <Text style={sharedStyles.congratulationsText}>
                        {lotteryResultTexts.congratulations}
                      </Text>
                      <Text style={sharedStyles.congratulationsWinnerText}>
                        {isWinner
                          ? lotteryDetailsTexts.youAreTheWinner
                          : lotteryDetailsTexts.lotteryPosterWinner}
                      </Text>
                    </View>
                  ) : null}
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
                      {`${prefecture}, ${country}`}
                    </Text>
                  </View>
                  <View style={sharedStyles.userDetailsIconTextContainer}>
                    <Icon color="rgba(0,0,0,.55)" name="person" />
                    <Text style={sharedStyles.userDetailsText}>
                      {lotteryDetailsTexts.user}
                    </Text>
                  </View>
                  <View style={sharedStyles.aboutFirstSectionTextContainer}>
                    <LotteryDetailsUserListItem user={adPosterData} />
                  </View>
                </View>
              </ScrollView>
              {isLotteryPoster ||
                (isWinner && (
                  <View style={sharedStyles.lotteryDetailsBottomToolbar}>
                    {isLotteryPoster
                      ? lotteryResultTexts.lotteryPosterActions.map(action => (
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
                        ))
                      : isWinner
                      ? lotteryResultTexts.lotteryWinnerActions.map(action => (
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
                        ))
                      : null}
                  </View>
                ))}
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
};

const mapStateToProps = state => {
  return {
    lotteryResult: getLotteryResultSelector(state),
    user: getUserSelector(state),
    adPosterData: getAdPosterDataSelector(state),
    lotteryUsersData: getLotteryUsersDataSelector(state),
    winnerUserData: getWinnerUserDataSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showLotteryResult: payload => dispatch(showLotteryResult(payload)),
    handleFetchUsersData: payload => dispatch(handleFetchUsersData(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LotteryResult);
