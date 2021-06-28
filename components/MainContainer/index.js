import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {BottomNavigation, Icon} from 'react-native-material-ui';
import AuthComponent from '../Profile';
import sharedStyles from '../../assets/styles/sharedStyles';
import ImportAd from '../ImportAd';
import SearchComponent from '../Search';
import HomeComponent from '../Home';
import Lotteries from '../Lotteries';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getLoggedInSelector, getUserSelector} from './Selectors';
import FastImage from 'react-native-fast-image';

export let navigate;
export let setUserBottomBarImage;

const viewLoader = {
  lotteries: <Lotteries />,
  profile: <AuthComponent />,
  home: <HomeComponent />,
  search: <SearchComponent />,
  importAd: <ImportAd />,
};

const MainContainer = () => {
  const [activeView, setActiveView] = useState('home');
  const [userImage, setUserImage] = useState(null);

  const handleSetActiveView = type => {
    return () => {
      setActiveView(type);
    };
  };

  navigate = handleSetActiveView;
  setUserBottomBarImage = setUserImage;
  return (
    <SafeAreaView style={sharedStyles.fullheightView}>
      <SafeAreaView style={sharedStyles.container}>
        {viewLoader[activeView]}
      </SafeAreaView>
      <BottomNavigation
        active={activeView}
        style={{
          container: sharedStyles.bottomNavigationContainer,
        }}>
        <BottomNavigation.Action
          style={{
            container: sharedStyles.bottomNavigationLeftActionContainer,
            icon: {
              color: activeView === 'home' ? '#b69cf6' : '#d8d8d8',
            },
            label: {
              color: activeView === 'home' ? '#b69cf6' : '#d8d8d8',
              display: 'none',
            },
          }}
          key="home"
          icon={<Icon name="home" size={30} />}
          active={activeView === 'home'}
          onPress={handleSetActiveView('home')}
        />
        <BottomNavigation.Action
          style={{
            container: sharedStyles.bottomNavigationLeftActionContainer,
            icon: {
              color: activeView === 'search' ? '#b69cf6' : '#d8d8d8',
            },
            label: {
              color: activeView === 'search' ? '#b69cf6' : '#d8d8d8',
            },
          }}
          key="search"
          icon={<Icon name="search" size={30} />}
          active={activeView === 'search'}
          onPress={handleSetActiveView('search')}
        />
        <BottomNavigation.Action
          style={{
            container: sharedStyles.bottomNavigationMiddleActionContainer,
            icon: {
              color: activeView === 'importAd' ? '#b69cf6' : '#d8d8d8',
            },
            label: {
              color: activeView === 'importAd' ? '#b69cf6' : '#d8d8d8',
            },
          }}
          key="importAd"
          icon={<Icon name="cloud-upload" size={40} />}
          active={activeView === 'importAd'}
          onPress={handleSetActiveView('importAd')}
        />
        <BottomNavigation.Action
          style={{
            container: sharedStyles.bottomNavigationLeftActionContainer,
            icon: {
              color: activeView === 'lotteries' ? '#b69cf6' : '#d8d8d8',
            },
            label: {
              color: activeView === 'lotteries' ? '#b69cf6' : '#d8d8d8',
            },
          }}
          key="lotteries"
          icon={<Icon name="grade" size={30} />}
          active={activeView === 'lotteries'}
          onPress={handleSetActiveView('lotteries')}
        />
        <BottomNavigation.Action
          style={{
            container: sharedStyles.bottomNavigationRightActionContainer,
            icon: {
              color: activeView === 'profile' ? '#b69cf6' : '#d8d8d8',
            },
            label: {
              color: activeView === 'profile' ? '#b69cf6' : '#d8d8d8',
            },
          }}
          key="profile"
          icon={
            userImage ? (
              <>
                <FastImage
                  style={[
                    sharedStyles.bottomBarUserImage,
                    activeView === 'profile' &&
                      sharedStyles.bottomBarUserImageSelected,
                  ]}
                  source={{
                    uri: userImage,
                    priority: FastImage.priority.high,
                    cache: FastImage.cacheControl.immutable,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </>
            ) : (
              <Icon name="account-circle" size={30} />
            )
          }
          active={activeView === 'profile'}
          onPress={handleSetActiveView('profile')}
        />
      </BottomNavigation>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    loggedIn: getLoggedInSelector(state),
    user: getUserSelector(state),
  };
};

MainContainer.propTypes = {
  loggedIn: PropTypes.bool,
  user: PropTypes.object,
};

export default connect(mapStateToProps)(MainContainer);
