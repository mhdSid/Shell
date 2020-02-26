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
import {getUsersData} from '../../services/auth';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import {SimpleLoader} from '../Loading';
import formatDate from '../../lib/CachedImage/formatDate';

// import {
//   // AdMobBanner,
//   AdMobInterstitial,
//   // PublisherBanner,
//   // AdMobRewarded,
// } from 'react-native-admob';

const AdDetailsUserListItem = props => {
  const {user} = props;
  const handlePress = () => {
    invoke(props, 'onPress', user);
  };

  return (
    <TouchableBounce
      style={sharedStyles.adDetailsUsersListItemContainer}
      onPress={handlePress}>
      {user.image ? (
        <CachedImage
          cache="force-cache"
          source={{
            uri: user.image,
            cache: 'force-cache',
            // headers: {
            //   Pragma: 'only-if-cached',
            //   'Cache-Control': 'only-if-cached',
            // },
          }}
          style={sharedStyles.adDetailsUsersListItemImage}
        />
      ) : (
        <Icon
          name="face"
          size={40}
          // style={[
          //   sharedStyles.adDetailsUsersListItemImage,
          //   sharedStyles.adDetailsEmptyUser,
          // ]}
        />
      )}
      {(user.firstName || user.lastName) && (
        <Text
          numberOfLines={1}
          ellipsizeMode={'tail'}
          style={sharedStyles.adDetailsUsersListItemText}>
          {`${user.firstName} ${user.lastName}`}
        </Text>
      )}
    </TouchableBounce>
  );
};

const AdDetails = props => {
  const {item, user: authUser} = props;
  console.log(
    'AdDetailsAdDetailsAdDetailsAdDetailsAdDetails: ',
    item,
    authUser,
  );
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

  const myActions = ['share', 'favorite', 'cancel', 'delete'];
  const defaultActions = ['share', 'favorite', 'shop'];

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
    // setUsersData(users);

    console.log(
      'onGetUsersDataSuccessonGetUsersDataSuccessonGetUsersDataSuccess: ',
      users,
    );
    users = users.filter(Boolean);

    if (Array.isArray(users) && users.length > 0) {
      let lotterUsers = [];

      users.forEach(user => {
        if (user.id === winnerUserId) {
          setWinnerUserData(user);
        } else if (user.id === userId) {
          setAdPosterData(user);
        } else {
          lotterUsers = [...lotterUsers, user];
        }
      });

      setLotteryUsersData(lotterUsers);
    }
    setUsersDataLoading(false);

    console.log(
      'onGetUsersDataSuccessonGetUsersDataSuccessonGetUsersDataSuccess: ',
      // lotterUsers,
    );
  };

  const fetchUsersData = () => {
    const users = [
      userId,
      ...(lotteryUserIds || []),
      winnerUserId || false,
    ].filter(Boolean);
    console.log(
      'fetchUsersDatafetchUsersDatafetchUsersDatafetchUsersData: ',
      users,
    );
    if (users.length > 0) {
      setUsersDataLoading(true);
      getUsersData({users}).then(onGetUsersDataSuccess, handleError);
    }
  };

  const onShow = () => {
    fetchUsersData();
  };

  const handleUserPress = user => {
    // return () => {
    setShowUserDetails(true);
    setSelectedUser(user);
    // };
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
                // disabled={loading || !adDataChanged}
                raised
                text="Enter Draw"
                icon="shop"
              />
            )
          }
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              // height: '45%',
              display: 'flex',
              flexDirection: 'row',
              // justifyContent: 'center',
              // alignItems: 'center',
              // position: 'absolute',
              // top: 0,
              // left: 0,
              // aspectRatio: 3 / 2,
              // height: 'auto',
            }}>
            <CachedImage
              cache="force-cache"
              source={{
                uri: images[currentPhotoIndex],
                cache: 'force-cache',
                // headers: {
                //   Pragma: 'only-if-cached',
                //   'Cache-Control': 'only-if-cached',
                // },
              }}
              style={sharedStyles.adDetailsImage}
            />
            {images.length > 1 && (
              <>
                <Button
                  text=""
                  // icon="white"
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
            {/* <Drawer
              style={{
                container: sharedStyles.drawerContainer,
              }}> */}
            {/* <Drawer.Section
                title="Total price"
                items={[
                  {
                    icon: 'local-atm',
                    value: `${currency} ${price}`,
                  },
                ]}
              /> */}
            {/* <Drawer.Section
                title="Collected price"
                items={[
                  {
                    icon: 'credit-card',
                    value: `${currency} ${currentCollectedPrice || 0}`,
                  },
                ]}
              /> */}
            {/* <Drawer.Section
                title="Pay to win ithe item in Lottery"
                items={[
                  {
                    icon: 'monetization-on',
                    value: `${currency} ${'1000'}`,
                  },
                ]}
              /> */}
            {/* </Drawer> */}

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
              {/* <Text style={sharedStyles.aboutFirstSectionText}> */}
              {usersDataLoading && SimpleLoader}

              {lotteryUsersData && (
                <VirtualizedList
                  // refreshing={usersDataLoading}
                  // onRefresh={fetchUsersData}
                  horizontal={true}
                  showsVerticalScrollIndicator={false}
                  data={lotteryUsersData}
                  getItem={(data, index) => data[index]}
                  getItemCount={() => lotteryUsersData.length}
                  contentContainerStyle={
                    sharedStyles.adDetailsUsersListContainer
                  }
                  // numColumns={3}
                  keyExtractor={_user => _user.id}
                  renderItem={({item: _user}) => (
                    <AdDetailsUserListItem
                      user={_user}
                      onPress={handleUserPress}
                    />
                  )}
                />
              )}
              {/* </Text> */}
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
              {/* <Text style={sharedStyles.aboutFirstSectionText}>{userId}</Text> */}
            </View>

            {/* <Drawer style={{container: sharedStyles.drawerContainer}}> */}
            {/* <Drawer.Section
                title="Name"
                items={[
                  {
                    icon: 'dns',
                    value: (
                      <Text style={sharedStyles.adDetailsText}>{name}</Text>
                    ),
                  },
                ]}
              /> */}
            {/* <Drawer.Section
                title="Description"
                items={[
                  {
                    icon: 'description',
                    value: (
                      <Text style={sharedStyles.adDetailsText}>
                        {description}
                      </Text>
                    ),
                    // description,
                  },
                ]}
              /> */}
            {/* </Drawer> */}

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
            {/* 
            <Drawer style={{container: sharedStyles.drawerContainer}}>
              <Drawer.Section
                title="Status"
                items={[
                  {
                    icon: 'exposure',
                    value: (
                      <Text style={sharedStyles.adDetailsText}>{status}</Text>
                    ),
                    // description,
                  },
                ]}
              />
              <Drawer.Section
                title="Category"
                items={[
                  {
                    icon: 'class',
                    value: (
                      <Text style={sharedStyles.adDetailsText}>{category}</Text>
                    ),
                    // description,
                  },
                ]}
              />
            </Drawer> */}

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

            {/* <Drawer style={{container: sharedStyles.drawerContainer}}>
              <Drawer.Section
                title="Publish date"
                items={[
                  {
                    icon: 'today',
                    value: (
                      <Text style={sharedStyles.adDetailsText}>
                        {publishDate}
                      </Text>
                    ),
                    // description,
                  },
                ]}
              />
              <Drawer.Section
                title="Location"
                items={[
                  {
                    icon: 'pin-drop',
                    value: (
                      <Text style={sharedStyles.adDetailsText}>
                        {`${prefecture}, ${country}`}
                      </Text>
                    ),
                    // description,
                  },
                ]}
              />
            </Drawer> */}

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

            {/* <Drawer style={{container: sharedStyles.drawerContainer}}>
              <Drawer.Section
                title="Current lottery users"
                items={[
                  {
                    icon: 'group-add',
                    value: (
                      <Text style={sharedStyles.adDetailsText}>
                        {lotteryUserIds}
                      </Text>
                    ),
                    // description,
                  },
                ]}
              />

              <Drawer.Section
                title="User"
                items={[
                  {
                    icon: 'person',
                    value: (
                      <Text style={sharedStyles.adDetailsText}>{userId}</Text>
                    ),
                    // description,
                  },
                ]}
              />
            </Drawer>

            <Drawer style={{container: sharedStyles.drawerContainer}}>
              <Drawer.Section
                title="Item ID"
                items={[
                  {
                    icon: 'fingerprint',
                    value: <Text style={sharedStyles.adDetailsText}>{id}</Text>,
                    // description,
                  },
                ]}
              />
            </Drawer> */}

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
              {/* <Text style={sharedStyles.aboutFirstSectionText}>{userId}</Text> */}
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
