import React, {useState, createRef} from 'react';
import {
  Text,
  View,
  Modal,
  SafeAreaView,
  ScrollView,
  Alert,
  VirtualizedList,
} from 'react-native';
import {connect} from 'react-redux';
import sharedStyles from '../../assets/styles/sharedStyles';
import {Button, Icon, ActionButton} from 'react-native-material-ui';
import {Toolbar} from 'react-native-material-ui';
import invoke from 'lodash/invoke';
import PropTypes from 'prop-types';
import UserDetails from '../UserDetails';
import {SimpleLoader} from '../Loading';
import formatDate from '../../lib/CachedImage/formatDate';
import AdDetailsUserListItem from './AdDetailsUserListItem.js';
import {adDetails} from '../../Constants/Texts';
import {handleFetchUsersData} from '../../redux/AdDetails/FetchUsersData';
import {
  getLotteriesSelector,
  getUsersSelector,
  getAdPosterDataSelector,
  getLotteryUsersDataSelector,
  getWinnerUserDataSelector,
  getUserAdsSelector,
} from './Selectors';
import {handleFetchUserAds} from '../../redux/AdDetails/FetchUserAds';
import CardListItem from '../Home/CardListItem';
import {showAdDetails} from '../../redux/AdDetails/actions';
import {CarouselComponent} from '../Carousel';
import ImagesViewer from '../ImageViewer';
import Payment from '../Payment';

const myActions = ['share', 'favorite', 'cancel', 'delete'];
const defaultActions = ['share', 'favorite', 'shop'];

const AdDetails = props => {
  const {
    item,
    user: authUser,
    lotteryUsersData,
    adPosterData,
    winnerUserData,
    userAds,
  } = props;
  const {
    name,
    description,
    id,
    category,
    currency,
    price,
    country,
    prefecture,
    publishDate,
    cancelDate,
    status,
    userId,
    cancelled,
    available,
    lotteryUserIds,
    winnerUserId,
    currentCollectedPrice,
    images,
  } = item;
  const [selectedUser, setSelectedUser] = useState();
  const [usersDataLoading, setUsersDataLoading] = useState(true);
  const [userAdsLoading, setUserAdsLoading] = useState(true);
  const [showImagesViewer, setShowImagesViewer] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [viewImageUri, setViewImageUri] = useState(images[0]);
  const scrollViewRef = createRef();
  console.log(`${userId}`, `${authUser.id}`);
  const onUserDetailsClose = () => {
    setSelectedUser(undefined);
  };
  const handleUserAdPress = ad => {
    return () => {
      scrollViewRef.current.scrollTo({x: 0, y: 0, animated: true});
      if (props.updateAdDetails) {
        invoke(props, 'updateAdDetails', ad);
      } else {
        invoke(props, 'showAdDetails', ad);
      }
    };
  };
  const handleCloseModal = () => {
    invoke(props, 'onClose');
  };
  const handleActionPress = value => {
    Alert.alert(value);
  };
  const handleEnterDraw = () => {
    setShowPayment(true);
  };
  const onPaymentClose = () => {
    setShowPayment(false);
  };
  const fetchUsersDataCallback = () => {
    setUsersDataLoading(false);
  };
  const fetchUsersAdsCallback = () => {
    setUserAdsLoading(false);
  };
  const fetchUsersData = () => {
    const users = [
      userId,
      ...(lotteryUserIds || []),
      winnerUserId || false,
    ].filter(Boolean);
    if (users.length > 0) {
      invoke(props, 'handleFetchUsersData', {
        winnerUserId,
        userId,
        users,
        onError: fetchUsersDataCallback,
        onSuccess: fetchUsersDataCallback,
      });
    }
  };
  const onShow = () => {
    fetchUsersData();
    invoke(props, 'handleFetchUserAds', {
      userId,
      onError: fetchUsersAdsCallback,
      onSuccess: fetchUsersAdsCallback,
    });
  };
  const handleUserPress = user => {
    setSelectedUser(user);
  };
  const empty = <Icon name="face" size={40} />;
  const getItem = (data, index) => data[index];
  const getUserAdsCount = () => userAds.length;
  const getLotteryUsersCount = () => lotteryUsersData.length;
  const getVirtualKey = _item => _item.id;
  const renderUserAdItem = ({item: ad}) => (
    <CardListItem
      item={ad}
      smallImage={true}
      horizontal={true}
      onItemPress={handleUserAdPress(ad)}
    />
  );
  const renderLotteryUserItem = ({item: _user}) => (
    <AdDetailsUserListItem user={_user} onPress={handleUserPress} />
  );
  const handleShowImagesViewer = url => {
    setViewImageUri(url);
    setShowImagesViewer(true);
  };
  const onImagesViewerClose = () => {
    setShowImagesViewer(false);
  };
  return (
    <Modal animationType="slide" onShow={onShow}>
      {selectedUser && (
        <UserDetails onClose={onUserDetailsClose} item={selectedUser} />
      )}
      {showImagesViewer && (
        <ImagesViewer uri={viewImageUri} onClose={onImagesViewerClose} />
      )}
      {showPayment && <Payment onClose={onPaymentClose} />}
      <SafeAreaView style={sharedStyles.container}>
        <Toolbar
          style={{container: sharedStyles.adDetailsToolbarContainer}}
          leftElement="arrow-back"
          onLeftElementPress={handleCloseModal}
          centerElement={name}
          rightElement={
            `${userId}` !== `${authUser.id}` && (
              <Button
                onPress={handleEnterDraw}
                raised
                text={adDetails.enterDraw}
                icon="shop"
              />
            )
          }
        />
        <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
          <View style={sharedStyles.flexRow}>
            <CarouselComponent
              onItemPress={handleShowImagesViewer}
              items={images}
              imageOnly={true}
            />
          </View>
          <View style={sharedStyles.adDetailsContainer}>
            <View style={sharedStyles.userDetailsIconTextContainer}>
              <Icon
                color={available ? 'green' : 'red'}
                name={available ? 'verified-user' : 'close'}
              />
              <Text style={sharedStyles.userDetailsText}>
                {adDetails.availability}
              </Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>
                {available ? adDetails.adAvailable : adDetails.adNotAvailable}
              </Text>
            </View>
            <View style={sharedStyles.userDetailsIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="dns" />
              <Text style={sharedStyles.userDetailsText}>{adDetails.name}</Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>{name}</Text>
            </View>
            <View style={sharedStyles.userDetailsIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="description" />
              <Text style={sharedStyles.userDetailsText}>
                {adDetails.description}
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
                {adDetails.status}
              </Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>{status}</Text>
            </View>
            <View style={sharedStyles.userDetailsIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="class" />
              <Text style={sharedStyles.userDetailsText}>
                {adDetails.category}
              </Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>{category}</Text>
            </View>
            <View style={sharedStyles.userDetailsIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="local-atm" />
              <Text style={sharedStyles.userDetailsText}>
                {adDetails.totalPrice}
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
                {adDetails.collectedPrice}
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
                {adDetails.payToWin}
              </Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text
                style={
                  sharedStyles.aboutFirstSectionText
                }>{`${currency} ${'555'}`}</Text>
            </View>
            <View style={sharedStyles.userDetailsIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="group-add" />
              <Text style={sharedStyles.userDetailsText}>
                {adDetails.currentLotteryUsers}
              </Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              {usersDataLoading && SimpleLoader}
              {!usersDataLoading &&
                lotteryUsersData &&
                lotteryUsersData.length > 0 && (
                  <VirtualizedList
                    initialNumToRender={2}
                    windowSize={2}
                    horizontal={true}
                    showsVerticalScrollIndicator={false}
                    data={lotteryUsersData}
                    getItem={getItem}
                    getItemCount={getLotteryUsersCount}
                    contentContainerStyle={
                      sharedStyles.adDetailsUsersListContainer
                    }
                    keyExtractor={getVirtualKey}
                    renderItem={renderLotteryUserItem}
                  />
                )}
              {!usersDataLoading &&
                (!lotteryUsersData || lotteryUsersData.length === 0) &&
                empty}
            </View>
            <View style={sharedStyles.userDetailsIconTextContainer}>
              <Icon color="green" name="star" />
              <Text style={sharedStyles.userDetailsText}>
                {adDetails.winner}
              </Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              {usersDataLoading && SimpleLoader}
              {!usersDataLoading && winnerUserData && (
                <AdDetailsUserListItem
                  user={winnerUserData}
                  onPress={winnerUserData && handleUserPress}
                />
              )}
              {!usersDataLoading && !winnerUserData && empty}
            </View>

            <View style={sharedStyles.userDetailsIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="today" />
              <Text style={sharedStyles.userDetailsText}>
                {adDetails.publishDate}
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
                {adDetails.location}
              </Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>
                {`${prefecture}, ${country}`}
              </Text>
            </View>
            <View style={sharedStyles.userDetailsIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="person" />
              <Text style={sharedStyles.userDetailsText}>{adDetails.user}</Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              {usersDataLoading && SimpleLoader}
              {!usersDataLoading && adPosterData && (
                <AdDetailsUserListItem
                  user={adPosterData}
                  onPress={handleUserPress}
                />
              )}
              {!usersDataLoading && !adPosterData && empty}
            </View>
            <View style={sharedStyles.userDetailsIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="collections" />
              <Text style={sharedStyles.userDetailsText}>
                {adDetails.userAds}
              </Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainerNoFlex}>
              {userAdsLoading && SimpleLoader}
              {!userAdsLoading && userAds && (
                <VirtualizedList
                  initialNumToRender={2}
                  windowSize={2}
                  horizontal={true}
                  removeClippedSubviews={true}
                  showsHorizontalScrollIndicator={false}
                  data={userAds}
                  getItem={getItem}
                  getItemCount={getUserAdsCount}
                  keyExtractor={getVirtualKey}
                  renderItem={renderUserAdItem}
                />
              )}
              {!userAdsLoading && !userAds && (
                <Text style={sharedStyles.userDetailsText}>
                  {adDetails.emptyUserAds}
                </Text>
              )}
            </View>
            <View style={sharedStyles.userDetailsIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="fingerprint" />
              <Text style={sharedStyles.userDetailsText}>{adDetails.adId}</Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>{id}</Text>
            </View>
            <Text>{cancelled}</Text>
            <Text>{cancelDate}</Text>
            {/* <Text>{lotteryUserIds}</Text> */}
            {/* <Text>{winnerUserId}</Text> */}
            {/* <ActionButton icon="done" /> */}
          </View>
        </ScrollView>
        <ActionButton
          style={{
            container: {
              shadowRadius: 1,
            },
          }}
          onPress={handleActionPress}
          actions={item.userId === authUser.id ? myActions : defaultActions}
          icon="more-vert"
          transition="speedDial"
        />
      </SafeAreaView>
    </Modal>
  );
};

AdDetails.propTypes = {
  item: PropTypes.object,
  onClose: PropTypes.func,
  updateAdDetails: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    lotteries: getLotteriesSelector(state),
    user: getUsersSelector(state),
    adPosterData: getAdPosterDataSelector(state),
    lotteryUsersData: getLotteryUsersDataSelector(state),
    winnerUserData: getWinnerUserDataSelector(state),
    userAds: getUserAdsSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleFetchUsersData: payload => dispatch(handleFetchUsersData(payload)),
    handleFetchUserAds: payload => dispatch(handleFetchUserAds(payload)),
    showAdDetails: payload => dispatch(showAdDetails(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdDetails);
