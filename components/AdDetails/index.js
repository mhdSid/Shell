import React, {useState} from 'react';
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
import {CachedImage} from '../../lib/CachedImage/react-native-cached-image';
import UserDetails from '../UserDetails';
import {SimpleLoader} from '../Loading';
import formatDate from '../../lib/CachedImage/formatDate';
import AdDetailsUserListItem from './AdDetailsUserListItem.js';
import {adDetails} from '../../Constants/Texts';
import {handleFetchUsersData} from '../../redux/AdDetails/FetchUsersData';

const myActions = ['share', 'favorite', 'cancel', 'delete'];
const defaultActions = ['share', 'favorite', 'shop'];

const AdDetails = props => {
  const {
    item,
    user: authUser,
    lotteryUsersData,
    adPosterData,
    winnerUserData,
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
  const [modalVisible, setModalVisible] = useState(true);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showUserDetails, setShowUserDetails] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [usersDataLoading, setUsersDataLoading] = useState(false);

  const onUserDetailsClose = () => {
    setShowUserDetails(false);
  };
  const handleMovePreviousPhoto = () => {
    let index = currentPhotoIndex;
    index = index <= 0 ? images.length - 1 : --index;
    setCurrentPhotoIndex(index);
  };
  const handleMoveNextPhoto = () => {
    let index = currentPhotoIndex;
    index = index >= images.length - 1 ? 0 : ++index;
    setCurrentPhotoIndex(index);
  };
  const onModalDissmiss = () => {
    invoke(props, 'onClose');
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };
  const handleActionPress = value => {
    Alert.alert(value);
  };
  const handleEnterDraw = () => {
    Alert.alert('handleEnterDraw');
  };
  const callback = () => {
    setUsersDataLoading(false);
  };
  const fetchUsersData = () => {
    const users = [
      userId,
      ...(lotteryUserIds || []),
      winnerUserId || false,
    ].filter(Boolean);
    if (users.length > 0) {
      setUsersDataLoading(true);
      invoke(props, 'handleFetchUsersData', {
        winnerUserId,
        userId,
        users,
        onError: callback,
        onSuccess: callback,
      });
    }
  };
  const onShow = () => {
    fetchUsersData();
  };
  const handleUserPress = user => {
    setShowUserDetails(true);
    setSelectedUser(user);
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onShow={onShow}
      onDismiss={onModalDissmiss}>
      <SafeAreaView style={sharedStyles.container}>
        <Toolbar
          style={{container: sharedStyles.toolbarContainer}}
          leftElement="arrow-back"
          onLeftElementPress={handleCloseModal}
          rightElement={
            item.userId !== authUser.id && (
              <Button
                onPress={handleEnterDraw}
                raised
                text={adDetails.enterDraw}
                icon="shop"
              />
            )
          }
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={sharedStyles.flexRow}>
            <CachedImage
              source={{
                uri: images[currentPhotoIndex],
              }}
              style={sharedStyles.adDetailsImage}
            />
            {images.length > 1 && (
              <>
                <Button
                  text=""
                  icon={
                    <Icon
                      size={50}
                      style={sharedStyles.adDetailsImageArrowIconLeft}
                      name="chevron-left"
                      color="white"
                    />
                  }
                  size={50}
                  onPress={handleMovePreviousPhoto}
                  style={{
                    container:
                      sharedStyles.adDetailsImageArrowIconLeftContainer,
                  }}
                />
                <Button
                  text=""
                  icon={
                    <Icon
                      size={50}
                      name="chevron-right"
                      color="white"
                      style={sharedStyles.adDetailsImageArrowIconRight}
                    />
                  }
                  onPress={handleMoveNextPhoto}
                  style={{
                    container:
                      sharedStyles.adDetailsImageArrowIconRightContainer,
                  }}
                />
              </>
            )}
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
              {!usersDataLoading && lotteryUsersData && (
                <VirtualizedList
                  horizontal={true}
                  showsVerticalScrollIndicator={false}
                  data={lotteryUsersData}
                  getItem={(data, index) => data[index]}
                  getItemCount={() => lotteryUsersData.length}
                  contentContainerStyle={
                    sharedStyles.adDetailsUsersListContainer
                  }
                  keyExtractor={_user => _user.id}
                  renderItem={({item: _user}) => (
                    <AdDetailsUserListItem
                      user={_user}
                      onPress={handleUserPress}
                    />
                  )}
                />
              )}
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
      {showUserDetails && (
        <UserDetails onClose={onUserDetailsClose} item={selectedUser} />
      )}
    </Modal>
  );
};

AdDetails.propTypes = {
  item: PropTypes.object,
  onClose: PropTypes.func,
};

const mapStateToProps = ({lotteriesReducer, authReducer, adDetailsReducer}) => {
  return {
    lotteries: lotteriesReducer.lotteries,
    user: authReducer.user,
    adPosterData: adDetailsReducer.adPosterData,
    lotteryUsersData: adDetailsReducer.lotteryUsersData,
    winnerUserData: adDetailsReducer.winnerUserData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleFetchUsersData: payload => dispatch(handleFetchUsersData(payload)),
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(AdDetails);
