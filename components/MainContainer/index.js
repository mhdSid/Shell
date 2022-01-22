import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {BottomNavigation, Icon} from 'react-native-material-ui';
import styles from './mainContainer.style';
import FastImage from 'react-native-fast-image';

export let navigate;
export let setUserBottomBarImage;

let HomeComponent = null;
let AuthComponent = null;
let Lotteries = null;
let ImportLottery = null;
let Chat = null;

const viewLoader = {
  lotteries: () => {
    if (!Lotteries) {
      Lotteries = require('../UserJoinedLotteries').default;
    }
    return <Lotteries />;
  },
  profile: () => {
    if (!AuthComponent) {
      AuthComponent = require('../Profile/UserProfile').default;
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
  chat: () => {
    if (!Chat) {
      Chat = require('../Chat/ChatList').default;
    }
    return <Chat />;
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
    <SafeAreaView style={styles.rootSafeAreaView}>
      <SafeAreaView style={styles.innerSafeAreaView}>
        {viewLoader[activeView]()}
      </SafeAreaView>
      <BottomNavigation
        active={activeView}
        style={{
          container: styles.bottomNavigationBarContainer,
        }}>
        <BottomNavigation.Action
          style={{
            container: styles.bottomNavigationBarRightActionContainer,
            icon: {
              color: activeView === 'home' ? 'white' : '#dacdfa',
            },
            label: {
              color: activeView === 'home' ? 'white' : '#dacdfa',
              display: 'none',
            },
          }}
          key="home"
          icon={<Icon name="home" size={27} />}
          active={activeView === 'home'}
          onPress={handleSetActiveView('home')}
        />
        <BottomNavigation.Action
          style={{
            container: styles.bottomNavigationBarRightActionContainer,
            icon: {
              color: activeView === 'importLottery' ? 'white' : '#dacdfa',
            },
            label: {
              color: activeView === 'importLottery' ? 'white' : '#dacdfa',
              display: 'none',
            },
          }}
          key="importLottery"
          icon={<Icon name="add-circle" size={27} />}
          active={activeView === 'importLottery'}
          onPress={handleSetActiveView('importLottery')}
        />
        <BottomNavigation.Action
          style={{
            container: styles.bottomNavigationBarRightActionContainer,
            icon: {
              color: activeView === 'lotteries' ? 'white' : '#dacdfa',
            },
            label: {
              color: activeView === 'lotteries' ? 'white' : '#dacdfa',
              display: 'none',
            },
          }}
          key="lotteries"
          icon={<Icon name="grade" size={27} />}
          active={activeView === 'lotteries'}
          onPress={handleSetActiveView('lotteries')}
        />
        <BottomNavigation.Action
          style={{
            container: styles.bottomNavigationBarRightActionContainer,
            icon: {
              color: activeView === 'chat' ? 'white' : '#dacdfa',
            },
            label: {
              color: activeView === 'chat' ? 'white' : '#dacdfa',
              display: 'none',
            },
          }}
          key="chat"
          icon={<Icon name="chat" size={27} />}
          active={activeView === 'chat'}
          onPress={handleSetActiveView('chat')}
        />
        <BottomNavigation.Action
          style={{
            container: styles.bottomNavigationBarRightActionContainer,
            icon: {
              color: activeView === 'profile' ? 'white' : '#dacdfa',
            },
            label: {
              color: activeView === 'profile' ? 'white' : '#dacdfa',
              display: 'none',
            },
          }}
          key="profile"
          icon={
            userImage ? (
              <>
                <FastImage
                  style={styles.bottomNavigationBarUserImage}
                  source={{
                    uri: userImage,
                    priority: FastImage.priority.high,
                    cache: FastImage.cacheControl.web,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </>
            ) : (
              <Icon name="account-circle" size={27} />
            )
          }
          active={activeView === 'profile'}
          onPress={handleSetActiveView('profile')}
        />
      </BottomNavigation>
    </SafeAreaView>
  );
};

export default MainContainer;
