import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {BottomNavigation, Icon, Badge} from 'react-native-material-ui';
import AuthComponent from '../Profile';
import sharedStyles from '../../assets/styles/sharedStyles';
import ImportAd from '../ImportAd';
import SearchComponent from '../Search';
import HomeComponent from '../Home';
import Lotteries from '../Lotteries';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

export let navigate;

const viewLoader = {
  grade: <Lotteries />,
  profile: () => <AuthComponent />,
  home: () => <HomeComponent />,
  search: () => <SearchComponent />,
  'add-circle-outline': props => <ImportAd {...props} />,
};

const MainContainer = props => {
  const {user, loggedIn} = props;

  const [activeView, setActiveView] = useState('home');

  const handlePress = type => {
    return () => {
      setActiveView(type);
    };
  };

  navigate = handlePress;

  return (
    <View style={sharedStyles.fullheightView}>
      <SafeAreaView style={sharedStyles.container}>
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
              color: activeView === 'home' ? '#b69cf6' : '#d8d8d8',
            },
            label: {
              color: activeView === 'home' ? '#b69cf6' : '#d8d8d8',
              display: 'none',
            },
          }}
          // key="home"
          icon={<Icon name="home" size={30} />}
          active={activeView === 'home'}
          //   label="Home"
          onPress={handlePress('home')}
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
          //   label="Home"
          onPress={handlePress('search')}
        />
        <BottomNavigation.Action
          style={{
            container: sharedStyles.bottomNavigationMiddleActionContainer,
            icon: {
              color:
                activeView === 'add-circle-outline' ? '#b69cf6' : '#d8d8d8',
            },
            label: {
              color:
                activeView === 'add-circle-outline' ? '#b69cf6' : '#d8d8d8',
            },
          }}
          key="add-circle-outline"
          icon={<Icon name="add-circle-outline" size={40} />}
          active={activeView === 'add-circle-outline'}
          //   label="Add"
          onPress={handlePress('add-circle-outline')}
        />
        <BottomNavigation.Action
          style={{
            container: sharedStyles.bottomNavigationLeftActionContainer,
            icon: {
              color: activeView === 'grade' ? '#b69cf6' : '#d8d8d8',
            },
            label: {
              color: activeView === 'grade' ? '#b69cf6' : '#d8d8d8',
            },
          }}
          key="grade"
          icon={
            loggedIn === true && user ? (
              <>
                <Icon name="grade" size={30} />
                <Badge text="3" />
              </>
            ) : (
              <Icon name="grade" size={30} />
            )
          }
          active={activeView === 'grade'}
          //   label="Lotteries"
          onPress={handlePress('grade')}
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
            loggedIn === true && user ? (
              <>
                <Icon name="account-circle" size={30} />
                <Badge text="3" />
              </>
            ) : (
              <Icon name="account-circle" size={30} />
            )
          }
          active={activeView === 'profile'}
          //   label="Settings"
          onPress={handlePress('profile')}
        />
      </BottomNavigation>
    </View>
  );
};

const mapStateToProps = ({authReducer}) => {
  return {
    loggedIn: authReducer.loggedIn,
    user: authReducer.user,
  };
};

const mapDispatchToProps = () => {
  return {};
};

MainContainer.propTypes = {
  loggedIn: PropTypes.bool,
  user: PropTypes.object,
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
