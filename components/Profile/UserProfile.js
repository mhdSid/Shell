import React, {useState} from 'react';
import {CachedImage} from '../../lib/CachedImage/react-native-cached-image';
import sharedStyles from '../../assets/styles/sharedStyles';
import {View, Text, ActionSheetIOS} from 'react-native';
import {Button, Drawer, Avatar, Icon} from 'react-native-material-ui';
import {loadingPopup} from '../Loading';
import {profile, userProfileLogoutActions} from '../../Constants/Texts';
import PropTypes from 'prop-types';
import invoke from 'lodash/invoke';
import {connect} from 'react-redux';
import {logoutAction} from '../../redux/Auth/actions';
import {handleLogout} from '../../redux/Auth/Logout';
import {getUserSelector} from './Selectors';
import FastImage from 'react-native-fast-image';
import { handleDisconnectChatSocketCommunication } from '../../redux/Chat/actions';

let UserLikedLotteries = null;
let UserCreatedLotteries = null;
let About = null;
let PaymentInformation = null;
let Notifications = null;
let Settings = null;
let UpdateUser = null;
let UserReceivedLotteries = null;
let UserShippedLotteries = null;

const UserProfile = props => {
  const {user} = props;
  const [userProfileModal, setUserProfileModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const {gameStatus: userGameStatus, gamePoints: userGamePoints} = user;
  const {points} = profile;

  const afterLogoutCallback = () => {
    setLoading(false);
  };
  const handleLogoutPress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [
          userProfileLogoutActions.cancel,
          userProfileLogoutActions.logout,
        ],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
        userInterfaceStyle: 'dark',
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          setLoading(true);
          invoke('props', 'disconnectChatSocketCommunication');
          invoke(props, 'handleLogout', {
            onError: afterLogoutCallback,
            onSuccess: afterLogoutCallback,
          });
        }
      },
    );
  };
  const onModalClose = () => {
    setUserProfileModal(false);
  };
  const handleShowModal = type => {
    return () => {
      setUserProfileModal(type);
    };
  };
  const userProfileModals = {
    updateUser: () => {
      if (!UpdateUser) {
        UpdateUser = require('../UpdateUser').default;
      }
      return <UpdateUser onClose={onModalClose} />;
    },
    settings: () => {
      if (!Settings) {
        Settings = require('../Settings').default;
      }
      return <Settings onClose={onModalClose} />;
    },
    notifications: () => {
      if (!Notifications) {
        Notifications = require('../Notifications').default;
      }
      return <Notifications onClose={onModalClose} />;
    },
    about: () => {
      if (!About) {
        About = require('../About').default;
      }
      return <About onClose={onModalClose} />;
    },
    userCreatedLotteries: () => {
      if (!UserCreatedLotteries) {
        UserCreatedLotteries = require('../UserCreatedLotteries').default;
      }
      return <UserCreatedLotteries onClose={onModalClose} />;
    },
    userLikedLotteries: () => {
      if (!UserLikedLotteries) {
        UserLikedLotteries = require('../UserLikedLotteries').default;
      }
      return <UserLikedLotteries onClose={onModalClose} />;
    },
    userReceivedLotteries: () => {
      if (!UserReceivedLotteries) {
        UserReceivedLotteries = require('../ReceiveLottery').default;
      }
      return <UserReceivedLotteries onClose={onModalClose} />;
    },
    userShippedLotteries: () => {
      if (!UserShippedLotteries) {
        UserShippedLotteries = require('../ShipLotteries').default;
      }
      return <UserShippedLotteries onClose={onModalClose} />;
    },
    paymentInformation: () => {
      if (!PaymentInformation) {
        PaymentInformation = require('../PaymentInformation').default;
      }
      return <PaymentInformation onClose={onModalClose} />;
    },
  };

  return (
    <>
      {userProfileModal && userProfileModals[userProfileModal]()}
      <View style={sharedStyles.fullheightView}>
        {loading && loadingPopup}
        <View style={sharedStyles.loggedInContainer}>
          <Drawer>
            <Drawer.Header
              image={
                user.image && (
                  <CachedImage
                    blurRadius={250}
                    source={{uri: user.image}}
                    style={sharedStyles.profileBlurredImage}>
                    <View style={sharedStyles.profileBlur} />
                  </CachedImage>
                )
              }
              style={{
                contentContainer: sharedStyles.profileHeaderContentContainer,
              }}>
              <Drawer.Header.Account
                style={{
                  container: sharedStyles.profileHeaderContainer,
                  avatarsContainer: sharedStyles.profileAvatarContainer,
                }}
                avatar={
                  <Avatar
                    image={
                      user.image ? (
                        <FastImage
                          style={sharedStyles.profileImage}
                          source={{
                            uri: user.image,
                            priority: FastImage.priority.high,
                            cache: FastImage.cacheControl.immutable,
                          }}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                      ) : (
                        <Icon name="account-circle" />
                      )
                    }
                  />
                }
                footer={{
                  dense: true,
                  centerElement: {
                    primaryText: (
                      <Text style={sharedStyles.profileUserText}>
                        {`${user.email}`}
                      </Text>
                    ),
                    secondaryText: (
                      <Text style={sharedStyles.profileUserText}>
                        {`${userGameStatus} • ${userGamePoints} ${points}`}
                      </Text>
                    ),
                  },
                  rightElement: (
                    <Button
                      onPress={handleShowModal('updateUser')}
                      icon="edit"
                      text=""
                      primary
                    />
                  ),
                }}
              />
            </Drawer.Header>
            <Drawer.Section
              divider
              items={[
                {
                  icon: 'help',
                  value: profile.howToUseTheApp,
                  onPress: handleShowModal('about'),
                },
                {
                  icon: 'bookmark-border',
                  value: profile.notifications,
                  onPress: handleShowModal('notifications'),
                },
                {
                  icon: 'grade',
                  value: profile.myCreatedLotteries,
                  onPress: handleShowModal('userCreatedLotteries'),
                },
                {
                  icon: 'favorite',
                  value: profile.myLikedLotteries,
                  onPress: handleShowModal('userLikedLotteries'),
                },
                {
                  icon: 'markunread-mailbox',
                  value: profile.myReceivedLotteries,
                  onPress: handleShowModal('userReceivedLotteries'),
                },
                {
                  icon: 'local-shipping',
                  value: profile.myShippedLotteries,
                  onPress: handleShowModal('userShippedLotteries'),
                },
              ]}
            />
            <Drawer.Section
              title={profile.personal}
              items={[
                {
                  icon: 'credit-card',
                  value: profile.paymentInformation,
                  onPress: handleShowModal('paymentInformation'),
                },
                {
                  icon: 'settings',
                  value: profile.settings,
                  onPress: handleShowModal('settings'),
                },
                {
                  icon: 'exit-to-app',
                  value: profile.logout,
                  onPress: handleLogoutPress,
                },
              ]}
            />
          </Drawer>
        </View>
      </View>
    </>
  );
};

UserProfile.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    user: getUserSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: payload => dispatch(logoutAction(payload)),
    handleLogout: payload => dispatch(handleLogout(payload)),
    disconnectChatSocketCommunication: payload =>
      dispatch(handleDisconnectChatSocketCommunication(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserProfile);
