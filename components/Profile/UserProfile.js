import React, {useState} from 'react';
import UpdateUser from '../UpdateUser';
import Settings from '../Settings';
import {CachedImage} from '../../lib/CachedImage/react-native-cached-image';
import sharedStyles from '../../assets/styles/sharedStyles';
import {View, Text, ActionSheetIOS} from 'react-native';
import {Button, Drawer, Avatar, Icon} from 'react-native-material-ui';
import Notifications from '../Notifications';
import PaymentInformation from '../PaymentInformation';
import About from '../About';
import {loadingPopup} from '../Loading';
import {profile} from '../../Constants/Texts';
import PropTypes from 'prop-types';
import invoke from 'lodash/invoke';
import {connect} from 'react-redux';
import {logoutAction} from '../../redux/Auth/actions';
import {handleLogout} from '../../redux/Auth/Logout';
import {getUserSelector} from './Selectors';
import FastImage from 'react-native-fast-image';
import UserCreatedLotteries from '../UserCreatedLotteries';

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
        options: ['Cancel', 'Logout'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
        userInterfaceStyle: 'dark',
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          setLoading(true);
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
    updateUser: <UpdateUser onClose={onModalClose} />,
    settings: <Settings onClose={onModalClose} />,
    notifications: <Notifications onClose={onModalClose} />,
    about: <About onClose={onModalClose} />,
    userCreatedLotteries: <UserCreatedLotteries onClose={onModalClose} />,
    paymentInformation: <PaymentInformation onClose={onModalClose} />,
  };

  return (
    <>
      {userProfileModal && userProfileModals[userProfileModal]}
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserProfile);
