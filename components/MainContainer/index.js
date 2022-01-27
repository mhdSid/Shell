import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {BottomNavigation, Icon} from 'react-native-material-ui';
import styles from './mainContainer.style';
import FastImage from 'react-native-fast-image';

export let navigate;
export let setUserBottomBarImage;

let HomeComponent = null;
let AuthComponent = null;
let UserJoinedLotteries = null;
let ImportLottery = null;
let Chat = null;
const viewLoader = {
  userJoinedLotteries: event => {
    if (!UserJoinedLotteries) {
      UserJoinedLotteries = require('../UserJoinedLotteries').default;
    }
    return <UserJoinedLotteries captureEvent={event} />;
  },
  profile: event => {
    if (!AuthComponent) {
      AuthComponent = require('../Profile/UserProfile').default;
    }
    return <AuthComponent captureEvent={event} />;
  },
  home: event => {
    if (!HomeComponent) {
      HomeComponent = require('../Home').default;
    }
    return <HomeComponent captureEvent={event} />;
  },
  importLottery: event => {
    if (!ImportLottery) {
      ImportLottery = require('../ImportLottery').default;
    }
    return <ImportLottery captureEvent={event} />;
  },
  chat: event => {
    if (!Chat) {
      Chat = require('../Chat/ChatList').default;
    }
    return <Chat captureEvent={event} />;
  },
};

const MainContainer = React.memo(() => {
  const [activeView, setActiveView] = useState('home');
  const [userImage, setUserImage] = useState(null);
  const [clickEventCount, setClickEventCount] = useState(0);

  const handleSetActiveView = type => {
    return () => {
      setClickEventCount(clickEventCount + 1);
      setActiveView(type);
    };
  };

  navigate = handleSetActiveView;
  setUserBottomBarImage = setUserImage;
  return (
    <SafeAreaView style={styles.rootSafeAreaView}>
      <SafeAreaView style={styles.innerSafeAreaView}>
        {viewLoader[activeView](clickEventCount)}
      </SafeAreaView>
      <BottomNavigation
        active={activeView}
        style={{
          container: styles.bottomNavigationBarContainer,
        }}>
        <BottomNavigation.Action
          style={{
            container: [styles.actionContainer, styles.actionMarginLeft],
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
            container: styles.actionContainer,
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
            container: styles.actionContainer,
            icon: {
              color: activeView === 'userJoinedLotteries' ? 'white' : '#dacdfa',
            },
            label: {
              color: activeView === 'userJoinedLotteries' ? 'white' : '#dacdfa',
              display: 'none',
            },
          }}
          key="userJoinedLotteries"
          icon={<Icon name="grade" size={27} />}
          active={activeView === 'userJoinedLotteries'}
          onPress={handleSetActiveView('userJoinedLotteries')}
        />
        <BottomNavigation.Action
          style={{
            container: styles.actionContainer,
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
            container: [styles.actionContainer, styles.actionMarginRight],
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
});

export default MainContainer;
