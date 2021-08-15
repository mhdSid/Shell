import React, {useState} from 'react';
import {Image, SafeAreaView} from 'react-native';
import {BottomNavigation, Icon} from 'react-native-material-ui';
import sharedStyles from '../../assets/styles/sharedStyles';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getLoggedInSelector, getUserSelector} from './Selectors';

export let navigate;
export let setUserBottomBarImage;

let HomeComponent = null;
let AuthComponent = null;
let Lotteries = null;
let ImportLottery = null;

const viewLoader = {
  lotteries: () => {
    if (!Lotteries) {
      Lotteries = require('../UserJoinedLotteries').default;
    }
    return <Lotteries />;
  },
  profile: () => {
    if (!AuthComponent) {
      AuthComponent = require('../Profile').default;
    }
    return <AuthComponent />;
  },
  home: () => {
    if (!HomeComponent) {
      HomeComponent = require('../Home').default;
    }
    return <HomeComponent />;
  },
  importLottery: () => {
    if (!ImportLottery) {
      ImportLottery = require('../ImportLottery').default;
    }
    return <ImportLottery />;
  },
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
    <SafeAreaView
      style={[sharedStyles.fullheightView, sharedStyles.rootSafeAreaView]}>
      <SafeAreaView
        style={[sharedStyles.innerSafeAreaView, sharedStyles.container]}>
        {viewLoader[activeView]()}
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
              color: activeView === 'home' ? 'white' : '#dacdfa',
            },
            label: {
              color: activeView === 'home' ? 'white' : '#dacdfa',
              display: 'none',
            },
          }}
          key="home"
          icon={<Icon name="home" size={30} />}
          active={activeView === 'home'}
          onPress={handleSetActiveView('home')}
        />
        {/* <BottomNavigation.Action
          style={{
            container: sharedStyles.bottomNavigationMiddleActionContainer,
            icon: {
              color: activeView === 'search' ? 'white' : '#dacdfa',
            },
            label: {
              color: activeView === 'search' ? 'white' : '#dacdfa',
            },
          }}
          key="search"
          icon={<Icon name="search" size={30} />}
          active={activeView === 'search'}
          onPress={handleSetActiveView('search')}
        /> */}
        <BottomNavigation.Action
          style={{
            container: sharedStyles.bottomNavigationMiddleActionContainer,
            icon: {
              color: activeView === 'importLottery' ? 'white' : '#dacdfa',
            },
            label: {
              color: activeView === 'importLottery' ? 'white' : '#dacdfa',
            },
          }}
          key="importLottery"
          icon={<Icon name="cloud-upload" size={30} />}
          active={activeView === 'importLottery'}
          onPress={handleSetActiveView('importLottery')}
        />
        <BottomNavigation.Action
          style={{
            container: sharedStyles.bottomNavigationMiddleActionContainer,
            icon: {
              color: activeView === 'lotteries' ? 'white' : '#dacdfa',
            },
            label: {
              color: activeView === 'lotteries' ? 'white' : '#dacdfa',
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
              color: activeView === 'profile' ? 'white' : '#dacdfa',
            },
            label: {
              color: activeView === 'profile' ? 'white' : '#dacdfa',
            },
          }}
          key="profile"
          icon={
            userImage ? (
              <>
                <Image
                  style={[
                    sharedStyles.bottomBarUserImage,
                    // activeView === 'profile' &&
                    //   sharedStyles.bottomBarUserImageSelected,
                  ]}
                  source={{
                    uri: userImage,
                    cache: 'default',
                  }}
                  resizeMode="cover"
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
