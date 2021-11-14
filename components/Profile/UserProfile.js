import React, {useState} from 'react';
import {CachedImage} from '../../lib/CachedImage/react-native-cached-image';
import sharedStyles from '../../assets/styles/sharedStyles';
import {View, Text, ActionSheetIOS, Image} from 'react-native';
import {Button, Drawer, Avatar, Icon} from 'react-native-material-ui';
import {Loading, loadingPopup} from '../Loading';
import {profile, userProfileLogoutActions} from '../../Constants/Texts';
import PropTypes from 'prop-types';
import invoke from 'lodash/invoke';
import {connect} from 'react-redux';
import {logoutAction} from '../../redux/Auth/actions';
import {handleLogout} from '../../redux/Auth/Logout';
import {getLoggedInSelector, getUserSelector} from './Selectors';
import {handleDisconnectChatSocketCommunication} from '../../redux/Chat/actions';
import FastImage from 'react-native-fast-image';
import {getLangSelector} from '../Settings/Selectors';
import {isUndefined} from 'lodash';

let UserLikedLotteries = null;
let UserCreatedLotteries = null;
let About = null;
let PaymentInformation = null;
let Notifications = null;
let Settings = null;
let UpdateUser = null;
let UserReceivedLotteries = null;
let UserShippedLotteries = null;
let AuthenticateModal = null;

const UserProfile = props => {
  const {user, lang, loggedIn} = props;
  const isAuthenticated = user && loggedIn;
  const [userProfileModal, setUserProfileModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const {gameStatus: userGameStatus, gamePoints: userGamePoints} = user || {};

  const afterLogoutCallback = () => {
    setLoading(false);
  };
  const handleLogoutPress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [
          userProfileLogoutActions[lang].cancel,
          userProfileLogoutActions[lang].logout,
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
      return <Notifications lang={lang} onClose={onModalClose} />;
    },
    about: () => {
      if (!About) {
        About = require('../About').default;
      }
      return <About lang={lang} onClose={onModalClose} />;
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
    authenticate: () => {
      if (!AuthenticateModal) {
        AuthenticateModal = require('./index').default;
      }
      return <AuthenticateModal onClose={onModalClose} />;
    },
  };

  if (isUndefined(loggedIn) && isUndefined(user)) {
    return Loading;
  }

  return (
    <>
      {userProfileModal && userProfileModals[userProfileModal]()}
      <View style={sharedStyles.fullheightView}>
        {loading && loadingPopup}
        <View style={sharedStyles.loggedInContainer}>
          <Drawer>
            <Drawer.Header
              image={
                isAuthenticated &&
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
                      isAuthenticated && user.image ? (
                        <FastImage
                          style={sharedStyles.profileImage}
                          source={{
                            uri: user.image,
                            priority: FastImage.priority.high,
                            cache: FastImage.cacheControl.web,
                          }}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                      ) : (
                        <Icon name="account-circle" />
                      )
                    }
                  />
                }
                footer={
                  isAuthenticated
                    ? {
                        dense: true,
                        centerElement: {
                          primaryText: (
                            <Text style={sharedStyles.profileUserText}>
                              {`${user.email}`}
                            </Text>
                          ),
                          secondaryText: (
                            <Text style={sharedStyles.profileUserText}>
                              {`${userGameStatus} • ${userGamePoints} ${
                                profile[lang].points
                              }`}
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
                      }
                    : null
                }
              />
            </Drawer.Header>
            <Drawer.Section
              divider
              items={[
                {
                  icon: 'help',
                  value: profile[lang].howToUseTheApp,
                  onPress: handleShowModal('about'),
                },
                // {
                //   icon: 'bookmark-border',
                //   value: profile[lang].notifications,
                //   onPress: handleShowModal('notifications'),
                // },
                {
                  icon: 'grade',
                  value: profile[lang].myCreatedLotteries,
                  onPress: handleShowModal(
                    isAuthenticated ? 'userCreatedLotteries' : 'authenticate',
                  ),
                },
                {
                  icon: 'favorite',
                  value: profile[lang].myLikedLotteries,
                  onPress: handleShowModal(
                    isAuthenticated ? 'userLikedLotteries' : 'authenticate',
                  ),
                },
                {
                  icon: 'markunread-mailbox',
                  value: profile[lang].myReceivedLotteries,
                  onPress: handleShowModal(
                    isAuthenticated ? 'userReceivedLotteries' : 'authenticate',
                  ),
                },
                {
                  icon: 'local-shipping',
                  value: profile[lang].myShippedLotteries,
                  onPress: handleShowModal(
                    isAuthenticated ? 'userShippedLotteries' : 'authenticate',
                  ),
                },
              ]}
            />
            <Drawer.Section
              title={profile[lang].personal}
              items={[
                !isAuthenticated
                  ? {
                      icon: 'exit-to-app',
                      value: profile[lang].loginOrSignup,
                      onPress: handleShowModal('authenticate'),
                    }
                  : null,
                isAuthenticated
                  ? {
                      icon: 'credit-card',
                      value: profile[lang].paymentInformation,
                      onPress: handleShowModal('paymentInformation'),
                    }
                  : null,
                {
                  icon: 'settings',
                  value: profile[lang].settings,
                  onPress: handleShowModal('settings'),
                },
                isAuthenticated
                  ? {
                      icon: 'exit-to-app',
                      value: profile[lang].logout,
                      onPress: handleLogoutPress,
                    }
                  : null,
              ].filter(Boolean)}
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
  lang: PropTypes.string,
  loggedIn: PropTypes.bool,
};

const mapStateToProps = state => {
  return {
    user: getUserSelector(state),
    lang: getLangSelector(state),
    loggedIn: getLoggedInSelector(state),
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
