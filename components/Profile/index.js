import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  loginAction,
  logoutAction,
  updateAction,
} from '../../redux/Auth/actions';
import isUndefined from 'lodash/isUndefined';
import {Loading} from '../Loading';
import {
  // AdMobBanner,
  AdMobInterstitial,
  // PublisherBanner,
  // AdMobRewarded,
} from 'react-native-admob';
import Login from './Login';
import UserProfile from './UserProfile';
import VerifyUser from './VerifyUser';
import SignUp from './SignUp';

const AuthComponent = props => {
  const {loggedIn, user, showSignup, verificationId} = props;
  const [adId] = useState(1);

  useEffect(() => {
    if (loggedIn && user && adId) {
      AdMobInterstitial.setAdUnitID('ca-app-pub-5703846930890914/6721660483');
      // AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
      AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
    }
  }, [adId]);

  if (isUndefined(loggedIn) && isUndefined(user)) {
    return Loading;
  }

  if (showSignup === true && verificationId) {
    return <SignUp />;
  }

  if (verificationId) {
    return <VerifyUser />;
  }

  if (loggedIn && user) {
    return <UserProfile />;
  }

  return <Login />;
};

AuthComponent.propTypes = {
  loggedIn: PropTypes.bool,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.any]),
  country: PropTypes.oneOfType([PropTypes.string]),
  logout: PropTypes.func,
  login: PropTypes.func,
  updateUserAction: PropTypes.func,
};

const mapStateToProps = ({authReducer}) => {
  return {
    loggedIn: authReducer.loggedIn,
    user: authReducer.user,
    country: authReducer.country,
    showSignup: authReducer.showSignup,
    verificationId: authReducer.verificationId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: payload => dispatch(loginAction(payload)),
    logout: payload => dispatch(logoutAction(payload)),
    updateUserAction: payload => dispatch(updateAction(payload)),
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(AuthComponent);
