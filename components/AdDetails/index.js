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
import {getUsersData} from '../../services/Auth';
import {SimpleLoader} from '../Loading';
import formatDate from '../../lib/CachedImage/formatDate';
import AdDetailsUserListItem from './AdDetailsUserListItem.js';

const myActions = ['share', 'favorite', 'cancel', 'delete'];
const defaultActions = ['share', 'favorite', 'shop'];

const AdDetails = props => {
  const {item, user: authUser} = props;
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
  const [lotteryUsersData, setLotteryUsersData] = useState();
  const [adPosterData, setAdPosterData] = useState();
  const [winnerUserData, setWinnerUserData] = useState();
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
    // alert(value);
  };
  const handleEnterDraw = () => {};
  const handleError = error => {
    const message =
      (error && error.message) || 'A an error has occured. Please try again.';
    setUsersDataLoading(false);
    if (message) {
      Alert.alert(message);
    }
    return;
  };
  const onGetUsersDataSuccess = data => {
    let {error, users} = data;
    if (error) {
      return handleError(error);
    }
    users = users.filter(Boolean);
    if (Array.isArray(users) && users.length > 0) {
      let lotteryUsers = [];
      users.forEach(user => {
        if (user.id === winnerUserId) {
          setWinnerUserData(user);
        } else if (user.id === userId) {
          setAdPosterData(user);
        } else {
          lotteryUsers = [...lotteryUsers, user];
        }
      });
      setLotteryUsersData(lotteryUsers);
    }
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
      getUsersData({users}).then(onGetUsersDataSuccess, handleError);
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
                text="Enter Draw"
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
              <Text style={sharedStyles.userDetailsText}>Availabality</Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>
                {available
                  ? 'The Ad is currently available'
                  : 'The Ad is not available'}
              </Text>
            </View>
            <View style={sharedStyles.userDetailsIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="local-atm" />
              <Text style={sharedStyles.userDetailsText}>Total Price</Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text
                style={
                  sharedStyles.aboutFirstSectionText
                }>{`${currency} ${price}`}</Text>
            </View>
            <View style={sharedStyles.userDetailsIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="credit-card" />
              <Text style={sharedStyles.userDetailsText}>Collected Price</Text>
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
                Pay To Win The Item In The Lottery
              </Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text
                style={
                  sharedStyles.aboutFirstSectionText
                }>{`${currency} ${'1000'}`}</Text>
            </View>
            <View style={sharedStyles.userDetailsIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="group-add" />
              <Text style={sharedStyles.userDetailsText}>
                Current lottery users
              </Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              {usersDataLoading && SimpleLoader}
              {lotteryUsersData && (
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
              <Text style={sharedStyles.userDetailsText}>Winner</Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              {usersDataLoading && SimpleLoader}
              {
                <AdDetailsUserListItem
                  user={winnerUserData || {}}
                  onPress={winnerUserData && handleUserPress}
                />
              }
            </View>
            <View style={sharedStyles.userDetailsIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="dns" />
              <Text style={sharedStyles.userDetailsText}>Name</Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>{name}</Text>
            </View>
            <View style={sharedStyles.userDetailsIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="description" />
              <Text style={sharedStyles.userDetailsText}>Description</Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>
                {description}
              </Text>
            </View>
            <View style={sharedStyles.userDetailsIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="exposure" />
              <Text style={sharedStyles.userDetailsText}>Status</Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>{status}</Text>
            </View>
            <View style={sharedStyles.userDetailsIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="class" />
              <Text style={sharedStyles.userDetailsText}>Category</Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>{category}</Text>
            </View>
            <View style={sharedStyles.userDetailsIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="today" />
              <Text style={sharedStyles.userDetailsText}>Publish Date</Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>
                {formatDate(publishDate)}
              </Text>
            </View>
            <View style={sharedStyles.userDetailsIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="pin-drop" />
              <Text style={sharedStyles.userDetailsText}>Location</Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              <Text style={sharedStyles.aboutFirstSectionText}>
                {`${prefecture}, ${country}`}
              </Text>
            </View>
            <View style={sharedStyles.userDetailsIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="person" />
              <Text style={sharedStyles.userDetailsText}>User</Text>
            </View>
            <View style={sharedStyles.aboutFirstSectionTextContainer}>
              {usersDataLoading && SimpleLoader}
              {adPosterData && (
                <AdDetailsUserListItem
                  user={adPosterData}
                  onPress={handleUserPress}
                />
              )}
            </View>
            <View style={sharedStyles.userDetailsIconTextContainer}>
              <Icon color="rgba(0,0,0,.55)" name="fingerprint" />
              <Text style={sharedStyles.userDetailsText}>Ad ID</Text>
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

const mapStateToProps = ({lotteriesReducer, authReducer}) => {
  return {
    lotteries: lotteriesReducer.lotteries,
    user: authReducer.user,
  };
};

const mapDispatchToProps = () => {
  return {};
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(AdDetails);
