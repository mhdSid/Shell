import React, {useState} from 'react';
import UpdateUser from '../UpdateUser';
import Settings from '../Settings';
import {CachedImage} from '../../lib/CachedImage/react-native-cached-image';
import sharedStyles from '../../assets/styles/sharedStyles';
import {View, Text} from 'react-native';
import {Button, Drawer, Avatar, Icon} from 'react-native-material-ui';
import Notifications from '../Notifications';
import MyAds from '../MyAds';
import About from '../About';
import MyLotteries from '../MyLotteries';
import AppInfo from '../AppInfo';
import {loadingPopup} from '../Loading';
import {profile} from '../../Constants/Texts';
import PropTypes from 'prop-types';

const UserProfile = props => {
  const {loading, user, handleLogout, updateUserAction} = props;
  const [showUpdateUser, setShowUpdateUser] = useState(false);
  const [showAppInfo, setShowAppInfo] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showMyAds, setShowMyAds] = useState(false);
  const [showMyLotteries, setShowMyLotteries] = useState(false);
  const onUpdateUserClose = () => {
    setShowUpdateUser(false);
  };
  const onAppInfoClose = () => {
    setShowAppInfo(false);
  };
  const onSettingsClose = () => {
    setShowSettings(false);
  };
  const onNotificationsClose = () => {
    setShowNotifications(false);
  };
  const onMyAdsClose = () => {
    setShowMyAds(false);
  };
  const onAboutClose = () => {
    setShowAbout(false);
  };
  const onMyLotteriesClose = () => {
    setShowMyLotteries(false);
  };
  const handleShowAppInfo = () => {
    setShowAppInfo(true);
  };
  const handleShowSettings = () => {
    setShowSettings(true);
  };
  const handleShowUpdateUser = () => {
    setShowUpdateUser(true);
  };
  const handleShowNotifications = () => {
    setShowNotifications(true);
  };
  const handleShowAbout = () => {
    setShowAbout(true);
  };
  const handleShowMyAds = () => {
    setShowMyAds(true);
  };
  const handleShowMyLotteries = () => {
    setShowMyLotteries(true);
  };
  const getUserProfileText = () => {
    const {
      gameStatus: userGameStatus,
      gamePoints: userGamePoints,
      prefecture: userPrefecture,
      country: userCountry,
    } = user;
    return `${userGameStatus} • ${userGamePoints} ${profile.points} - ${userPrefecture}, ${userCountry}`;
  };

  return (
    <View style={sharedStyles.fullheightView}>
      {loading && loadingPopup}
      <View style={sharedStyles.loggedInContainer}>
        <Drawer>
          <Drawer.Header
            image={
              user.image && (
                <CachedImage
                  blurRadius={15}
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
                      <CachedImage
                        style={sharedStyles.profileImage}
                        source={{uri: user.image}}
                      />
                    ) : (
                      <Icon name="image" />
                    )
                  }
                />
              }
              footer={{
                dense: true,
                centerElement: {
                  primaryText: (
                    <Text style={sharedStyles.profileUserText}>
                      {`${user.firstName} ${user.lastName}`}
                    </Text>
                  ),
                  secondaryText: (
                    <Text style={sharedStyles.profileUserText}>
                      {getUserProfileText()}
                    </Text>
                  ),
                  tertiaryText: (
                    <Text style={sharedStyles.profileUserText}>{user.id}</Text>
                  ),
                },
                rightElement: (
                  <Button
                    onPress={handleShowUpdateUser}
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
                onPress: handleShowAbout,
              },
              {
                icon: 'bookmark-border',
                value: profile.notifications,
                onPress: handleShowNotifications,
              },
              {
                icon: 'people',
                value: profile.myAds,
                onPress: handleShowMyAds,
              },
              {
                icon: 'grade',
                value: profile.myLotteries,
                onPress: handleShowMyLotteries,
              },
            ]}
          />
          <Drawer.Section
            title={profile.personal}
            items={[
              {
                icon: 'settings',
                value: profile.settings,
                onPress: handleShowSettings,
              },
              {
                icon: 'exit-to-app',
                value: profile.logout,
                onPress: handleLogout,
              },
              {icon: 'info', value: profile.info, onPress: handleShowAppInfo},
            ]}
          />
        </Drawer>
        {showSettings && <Settings onClose={onSettingsClose} />}
        {showNotifications && <Notifications onClose={onNotificationsClose} />}
        {showMyAds && <MyAds onClose={onMyAdsClose} user={user} />}
        {showAbout && <About onClose={onAboutClose} />}
        {showMyLotteries && (
          <MyLotteries onClose={onMyLotteriesClose} user={user} />
        )}
        {showAppInfo && <AppInfo onClose={onAppInfoClose} />}
        {showUpdateUser && (
          <UpdateUser
            onClose={onUpdateUserClose}
            user={user}
            updateUserAction={updateUserAction}
          />
        )}
      </View>
    </View>
  );
};

UserProfile.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.object,
  handleLogout: PropTypes.func,
  updateUserAction: PropTypes.func,
};

export default UserProfile;
