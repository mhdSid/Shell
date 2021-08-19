import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  loginAction,
  logoutAction,
  updateAction,
} from '../../redux/Auth/actions';
import isUndefined from 'lodash/isUndefined';
import {Loading} from '../Loading';
// import {
//   //   // AdMobBanner,
//   AdMobInterstitial,
//   //   // PublisherBanner,
//   //   // AdMobRewarded,
// } from 'react-native-admob';
import {
  getLoggedInSelector,
  getUserSelector,
  getCountrySelector,
  getShowSignUpSelector,
  getVerificationIdSelector,
} from './Selectors';

let SignUp = null;
let VerifyUser = null;
let UserProfile = null;
let Login = null;

const AuthComponent = props => {
  const {loggedIn, user, showSignup, verificationId} = props;
  // useEffect(() => {
  //   if (loggedIn && user) {
  //     // AdMobInterstitial.setAdUnitID('ca-app-pub-5703846930890914/4925593277');
  //     // AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
  //     // AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
  //   }
  // }, []);
  if (isUndefined(loggedIn) && isUndefined(user)) {
    return Loading;
  }
  if (showSignup === true && verificationId) {
    if (!SignUp) {
      SignUp = require('./SignUp').default;
    }
    return <SignUp />;
  }
  if (verificationId) {
    if (!VerifyUser) {
      VerifyUser = require('./VerifyUser').default;
    }
    return <VerifyUser />;
  }
  if (loggedIn && user) {
    if (!UserProfile) {
      UserProfile = require('./UserProfile').default;
    }
    return <UserProfile />;
  }
  if (!Login) {
    Login = require('./Login').default;
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

const mapStateToProps = state => {
  return {
    loggedIn: getLoggedInSelector(state),
    user: getUserSelector(state),
    country: getCountrySelector(state),
    showSignup: getShowSignUpSelector(state),
    verificationId: getVerificationIdSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: payload => dispatch(loginAction(payload)),
    logout: payload => dispatch(logoutAction(payload)),
    updateUserAction: payload => dispatch(updateAction(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthComponent);
